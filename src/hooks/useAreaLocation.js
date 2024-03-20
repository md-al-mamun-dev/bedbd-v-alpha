import { useEffect, useState } from "react"
// import termsAndConditionService from "@/service/TermsAndConditionService";
// import { usePathname } from "next/navigation";
import accountService from "@/service/AccountService";
import localService from "@/service/LocalService";


export default function useAreaLocation(){
    const [localData, setLocalData] =useState({})
    const [location, setLocation] =useState({})
    console.log(localData)
    console.log(location)
    // const ipToLocalKey = process.env.NEXT_PUBLIC_IPTO_LOCATION_KEY
    useEffect(()=>{
        let ignore = false

        if(!ignore){
            async function getUserLocalData(){
                const data = await localService.getUsersLocalInformation()
                if(data){
                    // console.log(data)
                    setLocalData(data)
                }
            }
            getUserLocalData()
        }
        return ()=> ignore = true
    }, [])

    useEffect(()=>{
        let ignore = false

        if(!ignore ){
            
            async function getLocationFromIp(){
                // const tokenResult = await accountService.getToken()
                if(Object.keys(localData).length>0 ){
                    // const token = tokenResult['jwt']                    
                    let result = await fetch(`/api/location?ip=${localData['ip']}`, 
                    { 
                        method: 'GET',
                        // headers: { Authorization: `Bearer ${token}` }
                    });
                if(result){
                    const data = await result.json()
                    if(data)
                        setLocation(data)
                    }
                }
            }
            console.log(localData['ip'])
            getLocationFromIp()
        }
        return ()=> ignore = true
    }, [localData])


    return {localInfo:localData, location:location};
}