import { useEffect, useState } from "react"
// import veri from "@/service/DatabaseService";
import userVerificationService from "@/service/UserVerificationService";


export default function useVerificationDocumentType(){
    const [verificationDocumentTypes, setVerificationDocumentTypes] = useState([]);
    useEffect(()=>{
        let ignore = false
        async function getVerificationDocumentType() {
            console.log('get verification doc type log')
            if(!ignore){
                const data =  await userVerificationService.getVerificationDocumentTypes()
                if(data){
                    console.log(data)
                    return setVerificationDocumentTypes(data)
                }
            }
        }
        getVerificationDocumentType()
        return ()=> ignore = true
    }, [])
    return verificationDocumentTypes;
}