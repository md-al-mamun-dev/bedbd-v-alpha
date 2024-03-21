import conf from "@/conf/config";
import { Client, Account, Databases, Storage } from 'appwrite'
import { Database } from "lucide-react";


export const appwriteClient = new Client()
      appwriteClient
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            .setLocale('en')

export const databases = new Databases(appwriteClient)
export const account = new Account(appwriteClient)
export default appwriteClient

// export class AppwriteClientClass {
//       client;
//       account;
//       database;
//       teams;
//       locale;

//     constructor(){
//       this.client = new Client()
//                         .setEndpoint(conf.appwriteUrl)
//                         .setProject(conf.appwriteProjectId)
//                         .setLocale('en')

//         this.account = new Account(this.client)
//         this.database = new Databases(this.client)
//         this.teams = new Teams(this.client)
//         this.locale = new Locale(this.client);
//     }
// }
// export const accountClientObject = new AppwriteClientClass()
