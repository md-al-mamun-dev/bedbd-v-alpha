
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { Client, Account,  Databases, Storage, Role, Permission, ID, InputFile  } from "node-appwrite";
import { Query } from "node-appwrite";
import generateFileName from "@/components/Utility/generateFileName";

const client = new Client()
                   .setEndpoint(process.env.APPWRITE_URL)
                   .setProject(process.env.APPWRITE_PROJECT_ID)
                   .setKey(process.env.APPWRITE_BACKEND_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);



//   return Response.json({ data:'ok' })
//   }
  export async function GET(request, response) {

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    console.log(id)
    if(id!==null){
      const propertyDataPromise = await databases.listDocuments(
        process.env.APPWRITE_DB_BEDBD_ID, 
        process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID, 
        Query.equal("$id", ['65f2cdec3a9a93fcae98'])
      );
        const property =  propertyDataPromise['documents']

    }

    const propertyDataPromise = await databases.listDocuments(
                                  process.env.APPWRITE_DB_BEDBD_ID, 
                                  process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID);

      const property =  propertyDataPromise['documents']
      return Response.json({ data: property})
      
    // console.log(process.env.APPWRITE_DB_BEDBD_ID)
    // console.log(process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID)
    // const result = await Promise.resolve(propertyDataPromise)
    // console.log(result)
    // if(result)
    //   return result.json()



    // const ipAddress  = params.get('ip')
    // const ipToLocalKey = process.env.IPTO_LOCATION_KEY;
    // const requestUrl = `https://api.ip2location.io/?key=${ipToLocalKey}&ip=${ipAddress}&format=json`;
    // const propertyData = await request.formData();
    // const token = request.headers.get('Authorization').split(' ')[1];
    // const userClient = new Client()
    //                         .setEndpoint(process.env.APPWRITE_URL)
    //                         .setProject(process.env.APPWRITE_PROJECT_ID)
    //                         .setJWT(token);
    // const userAccount = new Account(userClient);
    // const userInformation = await userAccount.get();
  
  
  
    return Response.json({ data: property})
    }

