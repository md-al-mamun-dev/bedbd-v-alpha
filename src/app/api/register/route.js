 import { NextResponse } from "next/server";
 import { Readable } from "stream";
 import { Client, Account,  Databases, Storage, Role, Permission, ID, InputFile, Users  } from "node-appwrite";
 import generateFileName from "@/components/Utility/generateFileName";

 const client = new Client()
                    .setEndpoint(process.env.APPWRITE_URL)
                    .setProject(process.env.APPWRITE_PROJECT_ID)
                    .setKey(process.env.APPWRITE_BACKEND_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);


function createReadableStream(formData, fieldName) {
  const result = {
    stream: new Readable(),
    fileName: null,
    size:null,
  };

  for (const [key, value] of formData.entries()) {
    if (key === fieldName) {
      if (value instanceof File) {
        result.fileName = value.name;
        result.size = value.size;
        const reader = value.stream().getReader();
        const read = async () => {
          const { done, value: chunk } = await reader.read();
          if (done) {
            result.stream.push(null);
          } else {
            result.stream.push(chunk);
            read();
          }
        };
        read();
      } else {
        result.stream.push(null);
      }
    }
  }
  return result;
}


export async function POST(request, response) {
  const registrationData = await request.formData();


  // Code need to implement letter 
  // const token = request.headers.get('Authorization').split(' ')[1];
  // const userClient = new Client()
  //                         .setEndpoint(process.env.APPWRITE_URL)
  //                         .setProject(process.env.APPWRITE_PROJECT_ID)
  //                         .setJWT(token);
  // const userAccount = new Account(userClient);
  // const userInformation = await userAccount.get();
  const userId = registrationData.get('userId')
  const userInformation = await users.get(userId);



  const userName = registrationData.get('name')
  if(userName.length > 0 && userInformation['name'] !==  userName ){
    // const userNameUpdate = await userAccount.updateName(userName)
    const userNameUpdate = await users.updateName( userInformation['$id'], userName)

  }
  // const userEmail = registrationData.get('email')
  // if(userEmail.length > 0 && userInformation['email'] !==  userEmail ){
  //   const userEmailUpdate = await userAccount.updateEmail()
  // }
  // const userPhone = registrationData.get('phone')
  // if(userPhone.length > 0 && userInformation['phone'] !==  userPhone ){
  //   const userPhoneUpdate = await userAccount.updatePhone()
  // }

  let prefsData={};
  const userFathersName = registrationData.get('fathersName')
  const userMothersName = registrationData.get('mothersName')
  const userPresentAddress = registrationData.get('presentAddress')
  const userPermanenetAddress = registrationData.get('permanenetAddress')
  // const idNumber = registrationData.get('idNumber')


  if(userFathersName.length > 0)
    prefsData={ fathersName: userFathersName }
  if(userMothersName.length > 0)
    prefsData={...prefsData, mothersName: userMothersName }
  if(userPresentAddress.length > 0)
    prefsData={...prefsData, presentAddress: userPresentAddress }
  if(userPermanenetAddress.length > 0)
    prefsData={...prefsData, permanenetAddress: userPermanenetAddress }
  // if(idNumber.length > 0)
  //   prefsData={...prefsData, idNumber: idNumber }

  // const userPrefUpdate = await userAccount.updatePrefs(prefsData)
  
  const userPrefUpdate = await users.updatePrefs(userInformation['$id'], prefsData)


  if (userInformation && registrationData) {
    const { stream: userPhotoReadableStream, fileName: userProfilePhotoFileName,  size: userProfilePhotoFilesize  } = createReadableStream(registrationData, 'userPhoto');
    const profileImgFile = new InputFile(userPhotoReadableStream, generateFileName(userProfilePhotoFileName), userPhotoReadableStream.readableLength);
    const profileImgUpload = await storage.createFile(
                                            process.env.APPWRITE_USER_PROFILE_IMAGE_BUCKET_ID,
                                            ID.unique(),
                                            profileImgFile,
                                            [Permission.read(Role.user(userInformation['$id']+'/verified'))]);

    const { stream: varificationPhotoReadableStream, fileName: varificationPhotoFrontFileName, size: varificationPhotoFrontFilesize } = createReadableStream(registrationData, 'verificationDocFront');
    const verificationImgFileFront = new InputFile(varificationPhotoReadableStream, generateFileName(varificationPhotoFrontFileName), varificationPhotoReadableStream.readableLength);
    const verificationImgFileFrontUpload = await storage.createFile(
                                            process.env.APPWRITE_USER_VERFIFICATION_FILE_BUCKET_ID,
                                            ID.unique(),
                                            verificationImgFileFront,
                                            [Permission.read(Role.user(userInformation['$id']+'/verified'))]);

    const { stream: varificationPhotoBackReadableStream, fileName: varificationPhotoBackFileName, size: varificationPhotoBackFilesize } = createReadableStream(registrationData, 'verificationDocBack');
    const verificationDocFileBack = new InputFile(varificationPhotoBackReadableStream, generateFileName(varificationPhotoBackFileName), varificationPhotoReadableStream.readableLength);
    const verificationImgFileBackUpload = await storage.createFile(
                                            process.env.APPWRITE_USER_VERFIFICATION_FILE_BUCKET_ID,
                                            ID.unique(),
                                            verificationDocFileBack,
                                            [Permission.read(Role.user(userInformation['$id']+'/verified'))]);

    if (profileImgUpload && verificationImgFileFrontUpload && verificationImgFileBackUpload){

      const verificationDocInfo = {
                userId: userInformation['$id'],
                filesIdRefs: [verificationImgFileFrontUpload['$id'], verificationImgFileBackUpload['$id'],],
                verificationDocumentType: registrationData.get('verificationDocType'),
                verificationIdNumber: registrationData.get('idNumber')
             }
      const verificationInfoResult =  await databases.createDocument(
                                        process.env.APPWRITE_DB_BEDBD_ID,
                                        process.env.APPWRITE_USER_VERFIFICATION_INFO_COLLECTION_ID,
                                        ID.unique(),
                                        verificationDocInfo,
                                        [Permission.read(Role.user(userInformation['$id']+'/verified'))]
                                    )

    const profilePhotoInfo = {  userId: userInformation['$id'],
                                profilePhotoID: profileImgUpload['$id']}

    const profilePhotoInfoResult =  await databases.createDocument(
                                        process.env.APPWRITE_DB_BEDBD_ID,
                                        process.env.APPWRITE_USER_PROFILE_INFO_COLLECTION_ID,
                                        ID.unique(),
                                        profilePhotoInfo,
                                        [Permission.read(Role.user(userInformation['$id']+'/verified'))]
                                    )
    
    const hostInfo = {
      userId: userInformation['$id'],
      name: userName,
      profilePhoto: [profilePhotoInfoResult['$id']],
      userVerificationInfo: [verificationInfoResult['$id']],
      presentAddress: userPresentAddress,
      permanentAddress: userPermanenetAddress,
      }
    const hostInfoResult =  await databases.createDocument(
                                    process.env.APPWRITE_DB_BEDBD_ID,
                                    process.env.APPWRITE_HOST_COLLECTION_ID,
                                    ID.unique(),
                                    hostInfo,
                                    [Permission.read(Role.user(userInformation['$id']+'/verified'))]
                                )
    console.log(hostInfoResult)

    }
  }

  return NextResponse.json({ id: 'uuid' });
}