import { NextResponse } from "next/server";
import { Client, Account  } from "node-appwrite";


export async function GET(request, response) {
  // const token = request.headers.get('Authorization').split(' ')[1];
  // const userClient = new Client()
  //                         .setEndpoint(process.env.APPWRITE_URL)
  //                         .setProject(process.env.APPWRITE_PROJECT_ID)
  //                         .setJWT(token);
  // const userAccount = new Account(userClient);
  // const userInformation = await userAccount.get();
  // if(userInformation){
    const params  = request.nextUrl.searchParams
    const ipAddress  = params.get('ip')
    const ipToLocalKey = process.env.IPTO_LOCATION_KEY;
    const requestUrl = `https://api.ip2location.io/?key=${ipToLocalKey}&ip=${ipAddress}&format=json`;

    try {
      const result = await fetch(requestUrl, { method: 'GET' });

      if (!result.ok) {
        throw new Error(`Request failed with status ${result.status}`);
      }

      const data = await result.json();
      if(data)
        console.log(data)
      return NextResponse.json({ ...data});
      // return JSON.stringify(data)
        // return Response.json({ data:data })
    } catch (error) {
      // console.error('Error:', error);
      // return response.status(500).json({ error: 'Internal Server Error' });
    }
  // }  
}
