import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
// import veri from "@/service/DatabaseService";
// import userVerificationService from "@/service/UserVerificationService";


export default function useHomeRules(){
    const [isLoading, setIsLoading] = useState(false)
    const [homeRules, setHomeRules] = useState([])

    const dispatch = usePropertyDispatch()
    useEffect(()=>{
        let ignore = false
        async function getHomeRules(){
            if(!ignore){
                setIsLoading( ()=> true)
                try {
                    const data =  await propertyService.getHomeRules()
                    if(data){
                        setHomeRules( ()=> data)
                        console.log(data)
                        dispatch({ type:'property/homeRules', data:data })
                            setIsLoading( ()=> false )
                    }
                } catch (error) {
                    setIsLoading( ()=> false )
                }                
            }
        }
        getHomeRules()
    return ()=> ignore = true
    }, [])
    return {isLoading, homeRules};
}