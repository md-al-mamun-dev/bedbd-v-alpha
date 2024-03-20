 import { NextResponse } from "next/server";
 import { Readable } from "stream";
 import { Client, Account,  Databases, Storage, Role, Permission, ID, InputFile  } from "node-appwrite";
 import generateFileName from "@/components/Utility/generateFileName";
 import { numberToWords } from "@/components/Utility/numberToWords";


 const client = new Client()
                    .setEndpoint(process.env.APPWRITE_URL)
                    .setProject(process.env.APPWRITE_PROJECT_ID)
                    .setKey(process.env.APPWRITE_BACKEND_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);


function createReadableStream(file) {
  const result = {
    stream: new Readable(),
    fileName: null,
    size:null,
  };


  if (file instanceof File) {
      result.fileName = file.name;
      result.size = file.size;
      const reader = file.stream().getReader();
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

  return result;
}

export async function POST(request, response) {

  const propertyData = await request.formData();

let propertyType = '';
let bookingTypes = [];
let features = []
let amenities = []
let address = '';
let cityName = '';
let countryName = '';
let thanaName = '';
let zipCode='';
let isDataValidDeclaration = false;
let readTermsCondition = false;
let roomCount = []
let bedCount =[]
let guestCount =[]
let currency = ''
let serviceFee = 0
let tax = 1
let rent = 21
let whenCheckIn = ''
let allowMonthExtendStay = false
let allowBookingAfterTimeFrame = false


// const allBookingTypes = propertyData.getAll('bookingTypes').map(i=>JSON.parse(i)['title'])
// console.log(allBookingTypes)




// console.log(bedCount)
try {
  const propertyObj = Object.values(JSON.parse(propertyData.get('propertyType')))
  propertyType = ('name' in propertyObj) ? propertyObj['name']: ''
} catch (error) {}


try {
  bookingTypes = propertyData.getAll('bookingTypes').map(i=>JSON.parse(i)['title'])
} catch (error) {}


try {
  features = propertyData.getAll('features').map(i=>JSON.parse(i)['title'])
} catch (error) {}


try {
  amenities = propertyData.getAll('amenities').map(i=>JSON.parse(i)['title'])
} catch (error) {}


try {
  address = Object.values(JSON.parse(propertyData.get('address'))).map(i=>i).join(', ')
} catch (error) {}


try {
  const countryObj = JSON.parse(propertyData.get('country'))
  cityName = ('name' in cityObj) ? cityObj['name']: ''
} catch (error) {}


try {
  const cityObj = JSON.parse(propertyData.get('city'))
  countryName = ('name' in countryObj) ? countryObj['name']: ''
} catch (error) {}


try {
  const thanaObj = JSON.parse(propertyData.get('thana'))
  thanaName = ('name' in thanaObj) ? thanaObj['name']: ''
} catch (error) {}


try {
  zipCode = JSON.parse(propertyData.get('zipCode'))
} catch (error) {}


try {
  isDataValidDeclaration = JSON.parse(propertyData.get('ownersDataValidDeclaration'))
} catch (error) {}

try {
  readTermsCondition = JSON.parse(propertyData.get('readTermsCondition'))
} catch (error) {}

try {
  roomCount = propertyData.getAll('roomCount').map(i=>{
    const itemObj = JSON.parse(i)
    return numberToWords(itemObj['count']) + ' ' + itemObj['name']
  })
} catch (error) {}


try {
  bedCount = propertyData.getAll('bedCount').map(i=>{
    const itemObj = JSON.parse(i)
    return numberToWords(itemObj['count']) + ' ' + itemObj['name']
  })


} catch (error) {}
try {
  guestCount = propertyData.getAll('guestCount').map(i=>{
    const itemObj = JSON.parse(i)
    return itemObj['type'] + ' ' + numberToWords(itemObj['count'])+' person'
  })
} catch (error) {}


try {
  const rentInfo = JSON.parse(propertyData.get('rent'))
  currency = rentInfo['currency']
  serviceFee = rentInfo['serviceFee']
  tax = rentInfo['tax']
  rent = rentInfo['rent']
} catch (error) {}
try {
  const availability = JSON.parse(propertyData.get('availability'))  
  whenCheckIn = availability['checkIn']
  allowMonthExtendStay = availability['monthExtendStay'] === 'yes'
  allowBookingAfterTimeFrame = availability['rebookAfterTimeFrame']
} catch (error) {}




// console.log(JSON.parse(propertyData.get('rent')))

// JSON.parse(propertyData.get('zipCode'))
// console.log(zipCode)

// const timeZone = JSON.parse(propertyData.get('timeZone'))
// console.log(timeZone)




// const cityName = ('name' in cityObj) ? cityObj['name']: ''
// const countryName = ('name' in countryObj) ? countryObj['name']: ''
// const thanaName = ('name' in thanaObj) ? thanaObj['name']: ''
// console.log(address)
// console.log(address['aptFloor'])
// console.log(address['streetAddress'])
// console.log(address['addressOne'])
// console.log(address['addressTwo'])



  const property = {
    propertyUID:'SAMPLE_UUID',
    propertyType:propertyType,
    tilte: propertyData.get('propertyTitle'),
    description: propertyData.get('description'),
    address:address,
    city: cityName,
    country:countryName,
    thana:thanaName,
    timezone:JSON.parse(propertyData.get('timezone')),
    zipCode:zipCode,
    bookingTypes:bookingTypes,
    features:features,
    amenities:amenities,
    isDataValidDeclaration:isDataValidDeclaration,
    readTermsCondition:readTermsCondition,
    roomCount:roomCount,
    bedCount:bedCount, 
    guestCount: guestCount,
    currency:currency,
    serviceFee:serviceFee,
    tax:tax,
    rent:rent,
    whenCheckIn:whenCheckIn,
    allowMonthExtendStay:allowMonthExtendStay,
    allowBookingAfterTimeFrame:allowBookingAfterTimeFrame
    // address: `${address['aptFloor']+address['streetAddress']+address['addressOne']+address['addressTwo']}`
  }


  // Image upload Code ...
  // ***************************
  // const imageUploadPromises = []
  // for (const [key, value] of propertyData.entries()) {
  //   if(key==='image'){
  //     const { stream: propertyImageStream, fileName: propertyImageFileName,  size: fileSize  } = createReadableStream(value);
  //     const imageFile = new InputFile(propertyImageStream, generateFileName(propertyImageFileName), fileSize);
  //     const imageUploadPromise = await storage.createFile(
  //                                           process.env.APPWRITE_PROPERTY_IMAGE_FILE_BUCKET_ID,
  //                                           ID.unique(),
  //                                           imageFile);
  //     imageUploadPromises.push(imageUploadPromise);
  //   }
  // }

  // try {
  //   const imageUploadResults = await Promise.all(imageUploadPromises);
  //   console.log(imageUploadResults)
  // } catch (error) {
    
  // }
  

  
//   for (const [key, value] of formData.entries()) {
//     if (key === 'image'){
//       const result = {
//         stream: new Readable(),
//         fileName: null,
//         size:null,
//       };
//       if(value instanceof File){
//         result.fileName = value.name;
//         result.size = value.size;
//         const reader = value.stream().getReader();
//         const read = async () => {
//           const { done, value: chunk } = await reader.read();
//           if (done) {
//             result.stream.push(null);
//           } else {
//             result.stream.push(chunk);
//             read();
//           }
//         };
//         read();
//     }else{
//       result.stream.push(null)
//     }
//     return result;
//   }
// }


  // const images = propertyData.get('images')

  // for (const [key, value] of propertyData.entries()) {
  //     if (value instanceof File) {
  //       console.log(true)
  //     }
  //     else{
  //       console.log(typeof value)
  //       console.log(value)
  //     }
  // }
  // console.log(images instanceof File)
  // const imageArray =  propertyData.getAll('images')
  // imageArray.forEach((imageData, index) => {
  //   // Image data is a File object
  //   const file = imageData[0];

  //   // Your image processing logic goes here
  //   console.log(`Processing image ${index + 1}:`, file.name);
  // });
  // console.log(imageArray)
  // const token = request.headers.get('Authorization').split(' ')[1];
  // const userClient = new Client()
  //                         .setEndpoint(process.env.APPWRITE_URL)
  //                         .setProject(process.env.APPWRITE_PROJECT_ID)
  //                         .setJWT(token);
  // const userAccount = new Account(userClient);
  // const userInformation = await userAccount.get();

  // const userName = propertyData.get('name')
  // if(userName.length > 0 && userInformation['name'] !==  userName ){
  //   const userNameUpdate = await userAccount.updateName(userName)
  // }
  // const userEmail = propertyData.get('email')
  // if(userEmail.length > 0 && userInformation['email'] !==  userEmail ){
  //   const userEmailUpdate = await userAccount.updateEmail()
  // }
  // const userPhone = propertyData.get('phone')
  // if(userPhone.length > 0 && userInformation['phone'] !==  userPhone ){
  //   const userPhoneUpdate = await userAccount.updatePhone()
  // }

  



  // const userPrefUpdate = await userAccount.updatePrefs(prefsData)

  // if (userInformation && propertyData) {
    // const selectedPropertyType        = propertyData.get('selectedPropertyType')
    // const selectedBookingTypes        = propertyData.get('selectedBookingTypes')
    // const selectedfeatures    = propertyData.get('selectedfeatures')
    // const selectedAmenities           = propertyData.get('selectedAmenities')
    // const propertyTitle               = propertyData.get('propertyTitle')
    // const propertyDescription         = propertyData.get('propertyDescription')
    // const address                     = propertyData.get('address')
    // const city                        = propertyData.get('city')
    // const country                     = propertyData.get('country')
    // const thana                       = propertyData.get('thana')
    // const timeZone                    = propertyData.get('timeZone')
    // const zipCode                     = propertyData.get('zipCode')
    // const location                    = propertyData.get('location')
    // const ownersDataValidDeclaration  = propertyData.get('ownersDataValidDeclaration')
    // const readTermsCondition          = propertyData.get('readTermsCondition')
    // const roomCount                   = propertyData.get('roomCount')
    // const bedCount                    = propertyData.get('bedCount')
    // const guestCount                  = propertyData.get('guestCount')
    // const images                      = propertyData.get('images')
    // const currency                    = propertyData.get('currency')
    // const rent                        = propertyData.get('rent')
    // const serviceFee                  = propertyData.get('serviceFee')
    // const tax                         = propertyData.get('tax')
    // const checkIn                     = propertyData.get('roomCcheckInount')
    // const monthExtendStay             = propertyData.get('monthExtendStay')
    // const rebookAfterTimeFrame        = propertyData.get('rebookAfterTimeFrame')
    // const approvingMethod             = propertyData.get('approvingMethod')
    // const genderPref                  = propertyData.get('genderPref')


      const readableStreamFilesArray = createReadableStream(propertyData, 'images');

      // for (let index = 0; index < readableStreamFilesArray.length; index++) {
        // const element = array[index];
      //   const propertyImgFile = new InputFile(
      //                                 readableStreamFilesArray[index]['stream'], 
      //                                 generateFileName(readableStreamFilesArray[index]['fileName']), 
      //                                 readableStreamFilesArray[index]['size']);

      // const imageFileUpload = await storage.createFile(
      //                                   '65d1bbff9bb5fa92bc6f',
      //                                   ID.unique(),
      //                                   propertyImgFile);
      //       console.log(imageFileUpload)
        
      // }

      
      // const profileImgUpload = await storage.createFile(
      //                                         process.env.APPWRITE_USER_PROFILE_IMAGE_BUCKET_ID,
      //                                         ID.unique(),
      //                                         profileImgFile,
      //                                         [Permission.read(Role.user(userInformation['$id']+'/verified'))]);
      






    // const { stream: varificationPhotoReadableStream, fileName: varificationPhotoFrontFileName, size: varificationPhotoFrontFilesize } = createReadableStream(propertyData, 'verificationDocFront');
    // const verificationImgFileFront = new InputFile(varificationPhotoReadableStream, generateFileName(varificationPhotoFrontFileName), varificationPhotoReadableStream.readableLength);
    // const verificationImgFileFrontUpload = await storage.createFile(
    //                                         process.env.APPWRITE_USER_VERFIFICATION_FILE_BUCKET_ID,
    //                                         ID.unique(),
    //                                         verificationImgFileFront,
    //                                         [Permission.read(Role.user(userInformation['$id']+'/verified'))]);

    // const { stream: varificationPhotoBackReadableStream, fileName: varificationPhotoBackFileName, size: varificationPhotoBackFilesize } = createReadableStream(propertyData, 'verificationDocBack');
    // const verificationDocFileBack = new InputFile(varificationPhotoBackReadableStream, generateFileName(varificationPhotoBackFileName), varificationPhotoReadableStream.readableLength);
    // const verificationImgFileBackUpload = await storage.createFile(
    //                                         process.env.APPWRITE_USER_VERFIFICATION_FILE_BUCKET_ID,
    //                                         ID.unique(),
    //                                         verificationDocFileBack,
    //                                         [Permission.read(Role.user(userInformation['$id']+'/verified'))]);

    // if (profileImgUpload && verificationImgFileFrontUpload && verificationImgFileBackUpload){

    //   console.log(profileImgUpload);
    //   console.log(verificationImgFileFrontUpload);
    //   console.log(verificationImgFileBackUpload);


    //   const verificationDocInfo = {
    //             userId: userInformation['$id'],
    //             filesIdRefs: [verificationImgFileFrontUpload['$id'], verificationImgFileBackUpload['$id'],],
    //             verificationDocType: propertyData.get('verificationDocType')
    //          }
    //   const verificationInfoResult =  await databases.createDocument
    //                                 (
    //                                     process.env.APPWRITE_DB_BEDBD_ID,
    //                                     process.env.APPWRITE_USER_VERFIFICATION_INFO_COLLECTION_ID,
    //                                     ID.unique(),
    //                                     verificationDocInfo,
    //                                     [Permission.read(Role.user(userInformation['$id']+'/verified'))]
    //                                 )

    // const profilePhotoInfo = {  userId: userInformation['$id'],
    //                             profilePhotoID: profileImgUpload['$id']}

    // const profilePhotoInfoResult =  await databases.createDocument
    //                                 (
    //                                     process.env.APPWRITE_DB_BEDBD_ID,
    //                                     process.env.APPWRITE_USER_PROFILE_INFO_COLLECTION_ID,
    //                                     ID.unique(),
    //                                     profilePhotoInfo,
    //                                     [Permission.read(Role.user(userInformation['$id']+'/verified'))]
    //                                 )
    // }



  // }

  return NextResponse.json({ id: 'uuid' });
}