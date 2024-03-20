import { ID, Storage, Permission, Role, Databases, Query } from "appwrite";
import conf from "@/conf/config";
import appwriteClient from "./config";


export class UserVerificationService{
    databases;
    bedbdDbId;
    verificationDocumentTypeCollection
    // termsConditionCollectionId
    constructor(){
        this.databases                  = new Databases(appwriteClient)
        this.bedbdDbId                  = conf.appwriteBedbdDatabaseId
        this.userVerificationInfoCollection = conf.appwriteUserVerificationInfoCollectionId
        this.verificationDocumentType = conf.verificationDocumentTypeCollectionId

        // this.termsConditionCollectionId = conf.appwriteTermsConditionCollectionId
    }
    async getVerificationDocumentTypes(){
        // console.log('user verifiaction doc type get')
        // console.log(this.bedbdDbId)
        // console.log(this.verificationDocumentType)
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.verificationDocumentType)

            if(data){
                console.log(data)
                return data['documents']
                        .map(i=> ({
                                             id: i['$id'],
                                          title: i['title'],
                                    description: i['description'] }))
            }
                
        } catch (err) {
            return false
        }
    }
    async createVerificationInfo(info){
        console.log(this.bedbdDbId)
        try {
            const data =  await this.databases.createDocument
                                    (
                                        '65bcf0d97baa70988285',
                                        '65d718850c256a93b500',
                                        ID.unique(),
                                        info
                                    )
            if(data){
                console.log(data)
                return data
            }
            // ['documents']
            //         .map(i=> ({
            //                              id: i['$id'],
            //                           title: i['title'],
            //                     description: i['description'] }))
        } catch (err) {
            return false
        }
    }

    // async getHostTermsConditions(){
    //     try {
    //         const data =  await this.databases
    //                                 .listDocuments(
    //                                     this.bedbdDbId,
    //                                     this.termsConditionCollectionId,
    //                                     [Query.equal('conditionForWhom', ['host', 'host-and-client'])] )
    //         return data
    //     } catch (err) {
    //         return false
    //     }
    // }

    // async getClientTermsConditions(){
    //     try {
    //         const data =  await this.databases
    //                                 .listDocuments(
    //                                     this.bedbdDbId,
    //                                     this.termsConditionCollectionId,
    //                                     [Query.equal('conditionForWhom', ['client', 'host-and-client'])] )
    //         return data
    //     } catch (err) {
    //         return false
    //     }
    // }

    // async getAllTermsConditions(){
    //     try {
    //         const data =  await this.databases
    //                                 .listDocuments(
    //                                     this.bedbdDbId,
    //                                     this.termsConditionCollectionId )
    //         return data
    //     } catch (err) {
    //         return false
    //     }
    // }

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

const userVerificationService = new UserVerificationService()
export default userVerificationService