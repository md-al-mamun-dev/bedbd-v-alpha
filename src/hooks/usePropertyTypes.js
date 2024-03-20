import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
// import veri from "@/service/DatabaseService";
// import userVerificationService from "@/service/UserVerificationService";


export default function usePropertyTypes(){
    const [isLoading, setisLoading] = useState(false)
    const [propertyTypes, setPropertyTypes] = useState([])
    const dispatch = usePropertyDispatch()
    useEffect(()=>{
        let ignore = false
        async function getPropertyTypes(){
            if(!ignore){
                setisLoading( ()=> true)
                try {
                    const data =  await propertyService.getPropertyTypes()
                    if(data){
                        setPropertyTypes( ()=> data)
                        dispatch({ type:'property/addTypes', data:data })
                            setisLoading( ()=> false )
                    }
                } catch (error) {
                    setisLoading( ()=> false )
                }                
            }
        }
        getPropertyTypes()
    return ()=> ignore = true
    }, [])
    return {isLoading, propertyTypes};
}