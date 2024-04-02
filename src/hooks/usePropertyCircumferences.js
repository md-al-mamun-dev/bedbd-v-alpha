import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
// import veri from "@/service/DatabaseService";
// import userVerificationService from "@/service/UserVerificationService";


export default function usePropertyCircumferences(){
    const [isLoading, setisLoading] = useState(false)
    const [popertyCircumferences, setPopertyCircumferences] = useState([])
    const dispatch = usePropertyDispatch()
    useEffect(()=>{
        let ignore = false
        async function getPropertyCircumferences(){
            if(!ignore){
                setisLoading( ()=> true)
                try {
                    const data =  await propertyService.getPropertyCircumferences()
                    if(data){
                        setPopertyCircumferences( ()=> data)
                        dispatch({ type:'property/circumferences', data:data })
                            setisLoading( ()=> false )
                    }
                } catch (error) {
                    setisLoading( ()=> false )
                }                
            }
        }
        getPropertyCircumferences()
    return ()=> ignore = true
    }, [])
    return {isLoading, popertyCircumferencess};
}