import { useEffect, useState } from "react"
import termsAndConditionService from "@/service/TermsAndConditionService";
import { usePathname } from "next/navigation";



export default function useTermsConditions(){
    const [termsConditions, setTermsConditions] =useState([])
    const path = usePathname()
    useEffect(()=>{
        let ignore = false

        async function getHostTermsCondition() {
            if(!ignore){
                const data =  await termsAndConditionService.getHostTermsConditions()
                setTermsConditions(data)
                console.log(data)
                // if(data){
                //     dispatch({ type:'login', data:userData })
                // }
                // setAuthChecked(true)
            }
        }
        async function getClientTermsCondition() {
            if(!ignore){
                const data =  await termsAndConditionService.getClientTermsConditions()
                setTermsConditions(data)
                console.log(data)
                // if(data){
                //     dispatch({ type:'login', data:userData })
                // }
                // setAuthChecked(true)
            }
        }
        async function getAllTermsCondition() {
            if(!ignore){
                const data =  await termsAndConditionService.getAllTermsConditions()
                setTermsConditions(data)
                console.log(data)
                // if(data){
                //     dispatch({ type:'login', data:userData })
                // }
                // setAuthChecked(true)
            }
        }
        if(path==='/host/register')
            getHostTermsCondition()
        else if(path==='/client/register')
            getClientTermsCondition
        else
            getAllTermsCondition
        return ()=> ignore = true
    }, [path])
    // return authCheck;

    return termsConditions;
}