import { ID, Storage, Permission, Role, Databases, Query } from "appwrite";
import conf from "@/conf/config";
import appwriteClient from "./config";

export class PropertyService{
    databases;
    bedbdDbId;
    propertyTypesCollection;
    propertyAmenitiesCollection
    homeRulesCollection
    // termsConditionCollectionId
    constructor(){
        this.databases                     = new Databases(appwriteClient)
        this.bedbdDbId                     = conf.appwriteBedbdDatabaseId
        this.propertyCollection           = conf.propertyCollectionId

        this.propertyTypesCollection       = conf.propertyTypeCollectionId
        this.propertyFeaturesCollection    = conf.propertyFeaturesCollectionId
        this.amenitiesCollection           = conf.amenitiesCollectionId
        this.homeRulesCollection           = conf.homeRulesCollectionId

        this.propertyBookingTypes           = conf.propertyBookingTypesId
    }

    async getLocationData(id){
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        process.env.APPWRITE_DB_COLLECTION_LOCATION_ID,
                                        [Query.equal('$id', id)]
                                        )
            console.log(data)

            return data['documents']
                        .map(i=> ({                      id: i['$id'],
                                                        lat: i['lng'],
                                                        lng: i['lat'],
                                
                                }))
            // return data   
        } catch (err) {
            return false
        }
    }
    async getPropertyData(id){
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.propertyCollection,
                                        [Query.equal('$id', id)]
                                        )
            console.log(data)

            return data['documents']
                        .map(i=> ({                      id: i['$id'],
                                                        uid: i['features'],
                                                   location: i['propertyLocation'],
                                                isPublished: i['isPublished'],
                                                isAvailable: i['isAvailable'],
                                       availabilitySchedule: i['availabilitySchedule'],
                                         termsAndConditions: i['termsAndConditions'],
                                                ownerHostId: i['ownerHostId'],                                
                                                      tilte: i['tilte'],
                                                description: i['description'],
                                                    address: i['address'],
                                                       city: i['city'],
                                                      thana: i['thana'],
                                                   timezone: i['timezone'],                                
                                                    zipCode: i['zipCode'],
                                               propertyType: i['propertyType'],
                                               bookingTypes: i['bookingTypes'],
                                                  amenities: i['amenities'],
                                     isDataValidDeclaration: i['isDataValidDeclaration'],
                                         readTermsCondition: i['readTermsCondition'],
                                                  roomCount: i['roomCount'],                                
                                                   bedCount: i['bedCount'],
                                                   currency: i['currency'],
                                                       rent: i['rent'],
                                                        tax: i['tax'],
                                                 serviceFee: i['serviceFee'],
                                                whenCheckIn: i['whenCheckIn'],
                                       allowMonthExtendStay: i['allowMonthExtendStay'],
                                 allowBookingAfterTimeFrame: i['allowBookingAfterTimeFrame'],
                                            approvingMethod: i['approvingMethod'],
                                           genderPreference: i['genderPreference'],
                                           checkInStartTime: i['checkInStartTime'],
                                             checkInEndTime: i['checkInEndTime'],                                
                                          checkOutStartTime: i['checkOutStartTime'],
                                            checkOutEndTime: i['checkOutEndTime'],
                                                  homeRules: i['homeRules'],
                                                    country: i['country'],
                                                 guestCount: i['guestCount'],
                                                     images: i['images'],
                                
                                }))
            // return data   
        } catch (err) {
            return false
        }
    }
    
    async getPropertyTypes(){
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.propertyTypesCollection)

            return data['documents']
                        .map(i=> ({           id: i['$id'],
                                        typeName: i['typeName'],
                                 typeDescription: i['typeDescription'],
                                            icon: i['icon'],
                                        iconType: i['iconType']      }))
            // return data   
        } catch (err) {
            return false
        }
    }
    async getPropertyBookingTypes(){
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.propertyBookingTypes)
            console.log(data)

            return data['documents']
                        .map(i=> ({           id: i['$id'],
                                           title: i['title'],                                  
                                     description: i['description']}))
        } catch (err) {
            return false
        }
    }
    async getPropertyFeatures(){
        // console.log('get-property-feature')
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.propertyFeaturesCollection)

            return data['documents']
                        .map(i=> ({           id: i['$id'],
                                           title: i['title'],                                  
                                     description: i['description'],
                                  apartmentTypes: i['apartmentTypes']}))
            // return data   
        } catch (err) {
            return false
        }
    }
    async getAmenities(){
        // console.log('get-property-feature')
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.amenitiesCollection)

            return data['documents']
                        .map(i=> ({           id: i['$id'],
                                           title: i['title'],                                  
                                     description: i['description'],
                                            icon: i['icon'],
                                        category: i['category']}))
            // return data   
        } catch (err) {
            return false
        }
    }
    async getHomeRules(){
        // console.log('get-property-feature')
        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.homeRulesCollection)

            return data['documents']
                        .map(i=> ({           id: i['$id'],
                                           title: i['title'],                                  
                                     description: i['description']}))
        } catch (err) {
            return false
        }
    }

    // async getCountryLis(){
    //     // console.log('get-property-feature')
    //     try {
    //         const data =  await this.databases
    //                                 .listDocuments(
    //                                     this.bedbdDbId,
    //                                     this.propertyFeaturesCollection)

    //         return data['documents']
    //                     .map(i=> ({           id: i['$id'],
    //                                     typeName: i['title'],                                  
    //                              typeDescription: i['description'],
    //                               apartmentTypes: i['apartmentTypes']}))
    //         // return data   
    //     } catch (err) {
    //         return false
    //     }
    // }
}

const propertyService = new PropertyService()
export default propertyService