import { NextResponse } from "next/server";
import { Readable } from "stream";
import { Client, Account,  Databases, Storage, Role, Permission, ID, InputFile, Query  } from "node-appwrite";
import generateFileName from "@/components/Utility/generateFileName";
// import { numberToWords } from "@/components/Utility/numberToWords";  



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


//  Errors
const imagesArr = propertyData.getAll('image')
if(imagesArr.length < 5 && imagesArr.length > 25 ){
  return NextResponse.json(
    { message: "Invalid image number" },
    { status: 406 }
  );
}



let userId = '';
let hostId = '';
let propertyType = '';
let bookingTypes = [];
let customBookingTypesTitle =[]
let customBookingTypesDescription = []
let propertyFeatures = []
let customFeaturesTitle =[]
let customFeaturesDescription = []
let amenities = []
let homeRules = []
let customHomeRulesTitle = []
let customHomeRulesDescription = []
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
let images = []
let currency = ''
let serviceFee = 0
let tax = 1
let rent = 21
let whenCheckIn = ''
let allowMonthExtendStay = false
let allowBookingAfterTimeFrame = false
let checkInStartTime = 0
let checkInEndTime = 0
let checkOutStartTime = 0
let checkOutEndTime = 0
let location = {lat:0, lng:0}


// const allBookingTypes = propertyData.getAll('bookingTypes').map(i=>JSON.parse(i)['title'])
// console.log(allBookingTypes)
// console.log(bedCount)
try {
  userId = propertyData.get('userId')
  const hostInfo = await databases.listDocuments(
                    process.env.APPWRITE_DB_BEDBD_ID, 
                    process.env.APPWRITE_HOST_COLLECTION_ID, 
                    [Query.equal("userId", userId)]
                    )

  console.log(hostInfo)
  hostId = hostInfo.documents[0]['$id']

 } catch (error) {}

try {
//  const propertyObj = JSON.parse(propertyData.get('propertyType'))
//  propertyType = ('typeName' in propertyObj) ? propertyObj['typeName']: ''

//  const propertyObj = JSON.parse()
 propertyType = propertyData.get('propertyType')
} catch (error) {}


try {
 bookingTypes = propertyData.getAll('bookingTypes')
} catch (error) {}

try {
  propertyFeatures = propertyData.getAll('propertyFeatures')
 } catch (error) {}
try {
  const customBookingTypesObj = propertyData.getAll('customBookingTypes').map(i=>JSON.parse(i))
  customBookingTypesObj.forEach((item, idx) =>{
    if(item.hasOwnProperty('title') && item.hasOwnProperty('description')){
      customBookingTypesTitle.push(idx+'_'+item['title'])
      customBookingTypesDescription.push(idx+'_'+item['description'])
    }
  })
} catch (error) {
  
}




try {
  const customFeaturesObj = propertyData.getAll('customFeatures').map(i=>JSON.parse(i))
  customFeaturesObj.forEach((item, idx )=>{
    if(item.hasOwnProperty('title') && item.hasOwnProperty('description')){
      customFeaturesTitle.push(idx+'_'+item['title'])
      customFeaturesDescription.push(idx+'_'+item['description'])
    }
  })
} catch (error) {
  
}

try {
  homeRules = propertyData.getAll('homeRules')
 } catch (error) {}
 try {
  const customHomeRules = propertyData.getAll('customHomeRules').map(i=>JSON.parse(i))
  customHomeRules.forEach((item, idx )=>{
    if(item.hasOwnProperty('title') && item.hasOwnProperty('description')){
      customHomeRulesTitle.push(idx+'_'+item['title'])
      customHomeRulesDescription.push(idx+'_'+item['description'])
    }
  })
} catch (error) {
  
}

// const newFeatures = allFeatureObj.map(async i=>{
//   if(i['id'].startsWith("new_feature_")){
//     const newFeatureResult = await databases.createDocument(
//       process.env.APPWRITE_DB_BEDBD_ID, 
//       process.env.APPWRITE_PROPERTY_FEATURES_COLLECTION_ID, 
//       ID.unique(),
//       {title:i['title'], description:i['description']})
//       if(result)
//         return result 
//   }
//   else{
//     return i
//   }
// })




try {
 amenities = propertyData.getAll('amenities').map(i=>i)
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
   return itemObj['count'] + ' ' + itemObj['name']
 })
} catch (error) {}


try {
 bedCount = propertyData.getAll('bedCount').map(i=>{
   const itemObj = JSON.parse(i)
   return itemObj['count'] + ' ' + itemObj['name']
 })


} catch (error) {}
try {
  guestCount = propertyData.getAll('guestCount').map(i=>{
    const itemObj = JSON.parse(i)
    return  itemObj['count']+ ' ' + 'person' +' '+ itemObj['type']
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
 allowBookingAfterTimeFrame = availability['rebookAfterTimeFrame'] === 'yes'
} catch (error) {}




try {
  const checkInTime = JSON.parse(propertyData.get('checkInTime'))
  checkInStartTime = checkInTime[0]
  checkInEndTime = checkInTime[0]
 } catch (error) {}


 try {
  const checkOutTime = JSON.parse(propertyData.get('checkOutTime'))
  checkOutStartTime = checkOutTime[0]
  checkOutEndTime = checkOutTime[1]
 } catch (error) {}


 const locationPromise = []


 
    
  
 let locationPromiseResult 
//  try {
  // locationPromiseResult = await Promise.resolve(locationPromise)

  // console.log(locationPromiseResult)
//  } catch (error) { }



 // Image upload Code ...
 // ***************************
 const imageUploadPromises = []
 for (const [key, value] of propertyData.entries()) {
   if(key==='image'){
     const { stream: propertyImageStream, fileName: propertyImageFileName,  size: fileSize  } = createReadableStream(value);
     const imageFile = new InputFile(propertyImageStream, generateFileName(propertyImageFileName), fileSize);
     const imageUploadPromise =  storage.createFile(
                                  process.env.APPWRITE_PROPERTY_IMAGE_FILE_BUCKET_ID,
                                  ID.unique(),
                                  imageFile);
     imageUploadPromises.push(imageUploadPromise);
   }
 }

 
 try {
   const imageUploadResults = await Promise.all(imageUploadPromises);


   images = imageUploadResults.map(image => image['$id'])
   const property = {        
      ownerId: userId, 
      hosts:[hostId],
      propertyUID:'SAMPLE_UUID',
      propertyType:propertyType,
      title: propertyData.get('propertyTitle'),
      description: propertyData.get('description'),
      address:address,
      city: cityName,
      country: countryName,
      thana:thanaName,
      timezone: JSON.parse(propertyData.get('timezone')),
      zipCode:zipCode,

      propertyBookingTypes:bookingTypes,
      customBookingTypesTitle,
      customBookingTypesDescription,

      propertyFeatures,
      customFeaturesTitle,
      customFeaturesDescription,

      amenities:amenities,

      homeRules:homeRules,
      customHomeRulesTitle,
      customHomeRulesDescription,

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
      allowBookingAfterTimeFrame:allowBookingAfterTimeFrame,
      approvingMethod: propertyData.get('approvingMethod'),
      genderPreference: propertyData.get('genderPref'),
      checkInStartTime:checkInStartTime,
      checkInEndTime:checkInEndTime,
      checkOutStartTime:checkOutStartTime,
      checkOutEndTime:checkOutEndTime,
      images
      // propertyLocation:locationResult['$id']

    }
   
     console.log(property)
     const promise = databases.createDocument(
                       process.env.APPWRITE_DB_BEDBD_ID, 
                       process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID, 
                       ID.unique(),
                       property)
        





  //  console.log(imageUploadResults)
    
   try {
      const result  = await Promise.resolve(promise)

          if(imageUploadResults.length>0 && result['$id']){
            const locationData = JSON.parse(propertyData.get('location'))
            const location  =  databases.createDocument(
                                process.env.APPWRITE_DB_BEDBD_ID, 
                                process.env.APPWRITE_DB_COLLECTION_LOCATION_ID, 
                                ID.unique(),
                                {...locationData, propertyId:result['$id'] })
                        
            try {
              const locationResult = await Promise.resolve(location)              
              if(locationResult['$id']){
                const authTxt = userId + '_' + result['$id'] + '_w' 
                const locationAuthPromise = databases.createDocument(
                  process.env.APPWRITE_DB_BEDBD_ID, 
                  process.env.APPWRITE_DB_COLLECTION_LOCATION_AUTHORIZATION_ID, 
                  ID.unique(),
                  {authTxt})
                try {
                  const atuhStoreResult  = await Promise.resolve(locationAuthPromise)
                  console.log(atuhStoreResult)
                  return NextResponse.json({id:result['$id']})
                } catch (error) {}  
              }                         
            } catch (error) {}

           }
   } catch (error) {
      console.log(error)
   }

   
 } catch (error) {
 }
    
 return NextResponse.json({ id: 'uuid' });
}