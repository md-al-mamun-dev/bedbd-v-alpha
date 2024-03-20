import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
// import veri from "@/service/DatabaseService";
// import userVerificationService from "@/service/UserVerificationService";
import localService from "@/service/LocalService"


export default function useCountriesList(){
    const [isLoading, setIsLoading] = useState(false)
    const [countries, setCountries] = useState([])
    const dispatch = usePropertyDispatch()
    useEffect(()=>{
        let ignore = false
        async function getCountryList(){
            if(!ignore){
                setIsLoading( ()=> true)
                try {
                    const data =  await localService.getCountries()
                    if(data){
                        setCountries( ()=> data)
                        dispatch({ type:'property/addCountryList', data:data })
                        setIsLoading( ()=> false )
                    }
                } catch (error) {
                    setIsLoading( ()=> false )
                }                
            }
        }
        getCountryList()
    return ()=> ignore = true
    }, [])
    return {isLoading, countries};
}