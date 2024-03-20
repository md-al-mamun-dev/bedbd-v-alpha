import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
// import veri from "@/service/DatabaseService";
// import userVerificationService from "@/service/UserVerificationService";


export default function usePropertyFeatures(){
    const [isLoading, setisLoading] = useState(false)
    const [propertyFeatures, setPropertyFeatures] = useState([])
    const dispatch = usePropertyDispatch()
    useEffect(()=>{
        let ignore = false
        async function getPropertyFeatures(){
            if(!ignore){
                setisLoading( ()=> true)
                try {
                    const data =  await propertyService.getPropertyFeatures()
                    if(data){
                        setPropertyFeatures( ()=> data)
                        dispatch({ type:'property/features', data:data })
                            setisLoading( ()=> false )
                    }
                } catch (error) {
                    setisLoading( ()=> false )
                }                
            }
        }
        getPropertyFeatures()
    return ()=> ignore = true
    }, [])
    return {isLoading, propertyFeatures};
}