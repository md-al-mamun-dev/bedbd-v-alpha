import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
// import veri from "@/service/DatabaseService";
// import userVerificationService from "@/service/UserVerificationService";


export default function usePropertyBookingType(){
    const [isLoading, setisLoading] = useState(false)
    const [propertyBookingTypes, setPropertyBookingTypes] = useState([])
    const dispatch = usePropertyDispatch()
    useEffect(()=>{
        let ignore = false
        async function getPropertyBookingTypes(){
            if(!ignore){
                setisLoading( ()=> true)
                try {
                    const data =  await propertyService.getPropertyBookingTypes()
                    if(data){
                        setPropertyBookingTypes( ()=> data)
                        dispatch({ type:'property/bookingTypes', data:data })
                            setisLoading( ()=> false )
                    }
                } catch (error) {
                    setisLoading( ()=> false )
                }                
            }
        }
        getPropertyBookingTypes()
    return ()=> ignore = true
    }, [])
    return {isLoading, propertyBookingTypes};
}