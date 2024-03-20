import { ID, Account, Teams, Locale } from "appwrite";
import appwriteClient from "./config";



export class LocalService{
    locale;
    constructor(){
        this.locale = new Locale(appwriteClient);
    }

    async getUsersLocalInformation(){
        try {
            return await this.locale.get()
        } catch (err) {
            console.log('logout Error: ' + err)
        }
    }

    async getCountries(){
        try {
            return await this.locale.listCountries()
        } catch (err) {
            console.log('logout Error: ' + err)
        }
    }

}

const localService = new LocalService()
export default localService