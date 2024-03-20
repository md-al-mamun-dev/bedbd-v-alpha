import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
// import veri from "@/service/DatabaseService";
// import userVerificationService from "@/service/UserVerificationService";


export default function useAmenities(){
    const [isLoading, setIsLoading] = useState(false)
    const [amenities, setAmenities] = useState([])
    const dispatch = usePropertyDispatch()
    useEffect(()=>{
        let ignore = false
        async function getAmenities(){
            if(!ignore){
                setIsLoading( ()=> true)
                try {
                    const data =  await propertyService.getAmenities()
                    if(data){
                        setAmenities( ()=> data)
                        dispatch({ type:'property/amenities', data:data })
                            setIsLoading( ()=> false )
                    }
                } catch (error) {
                    setIsLoading( ()=> false )
                }                
            }
        }
        getAmenities()
    return ()=> ignore = true
    }, [])
    return {isLoading, amenities};
}