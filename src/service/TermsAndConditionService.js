import { Databases, Query } from "appwrite";
import conf from "@/conf/config";
import appwriteClient from "./config";


export class TermsAndConditionService{
    databases;
    bedbdDbId;
    termsConditionCollectionId
    constructor(){
        this.databases                  = new Databases(appwriteClient)
        this.bedbdDbId                  = conf.appwriteBedbdDatabaseId
        this.termsConditionCollection = conf.appwriteTermsConditionCollectionId
    }

    async getHostTermsConditions(){
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.termsConditionCollection,
                                        [Query.equal('conditionForWhom', ['host', 'host-and-client'])] )
            
            return data['documents']
                        .map(i=> ({
                                             id: i['$id'], 
                                          title: i['title'], 
                                    description: i['t_nd_c_description'] }))

        } catch (err) {
            return false
        }
    }

    async getClientTermsConditions(){
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.termsConditionCollectionId,
                                        [Query.equal('conditionForWhom', ['client', 'host-and-client'])] )
            return data['documents']
                        .map(i=> ({
                                             id: i['$id'], 
                                          title: i['title'], 
                                    description: i['t_nd_c_description'] }))
        } catch (err) {
            return false
        }
    }

    async getAllTermsConditions(){
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.termsConditionCollectionId )
            return data['documents']
                        .map(i=> ({
                                             id: i['$id'], 
                                          title: i['title'], 
                                    description: i['t_nd_c_description'] }))
        } catch (err) {
            return false
        }
    }

    // async uploadIdentificationImage(file, userId){
    //     const fileName = generateFileName(file.name)
    //     const fileData = new window.File([file], fileName, {type: file.type})
    //     try {
    //         return await this.storage.createFile(
    //             conf.appwriteUserVerificationFileBucket,
    //             ID.unique(),
    //             fileData,
    //             [ Permission.read(Role.user(userId+'/verified')) ]
    //         )
    //     } catch (error) {
    //         console.log('Appwrite service :: uploadFile :: error', error);
    //         return false; 
    //     }
    // }



}

const termsAndConditionService = new TermsAndConditionService()
export default termsAndConditionService