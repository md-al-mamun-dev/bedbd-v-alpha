import conf from "@/conf/config";
import { Client, Account, Databases, Storage } from 'appwrite'


export const appwriteClient = new Client()
      appwriteClient
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            .setLocale('en')

export const databases = new Databases(appwriteClient)
export default appwriteClient