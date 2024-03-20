// const appwrite = require('appwrite')
const sdk = require("node-appwrite");

export async function GET(request, response) {

  
  const        APPWRITE_URL = process.env.APPWRITE_URL
  const          PROJECT_ID = process.env.APPWRITE_PROJECT_ID
  const             API_KEY = process.env.APPWRITE_API_KEY
  const               DB_ID = process.env.APPWRITE_DB_BEDBD_ID
  const PROPERTY_COLLECTION = process.env.APPWRITE_COLLECTION_PROPERTY_ID
  
  const client = new sdk.Client();
        client
          .setEndpoint(APPWRITE_URL)
             .setProject(PROJECT_ID)
                    .setKey(API_KEY);
  
  const databases = new sdk.Databases(client);
  const account = new sdk.Account(client);


  const data = await databases.listDocuments(DB_ID, PROPERTY_COLLECTION)

    console.log(request)
    return Response.json(data.documents)
  // ff6312641fcfc3d461a9d72ebcf33e2cc0a0c9c84d9ad7fd9c940ba7a2a94ad2644cbeba34c386ccbc2eedda520289e6705bea305d5014bb20fe4c372086dd8cc866d82012a41713ab7cc6c9f72ffcf41b54162bbfc91718a9edd7cebd60218aa6496c665335f87b5fa4ec1167d6777463f522596822b55f0cfd66f87c79c408
   
    return Response.json({ data:'data' })
  }
