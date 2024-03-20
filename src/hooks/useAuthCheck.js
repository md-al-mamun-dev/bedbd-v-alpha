import { useEffect, useState } from "react"
import { Jwt } from "jsonwebtoken";
import { account } from "@/service/config";
import useAccount from "@/context/account/useAccount";

import useAccountDispatch from "@/context/account/useAccountDispatch";
// import { useAccountDispatch } from "@/context/account/accountContext";
// import { useDispatch } from "react-redux";
// import { userLoggedIn } from "../features/auth/authSlice";

import accountService from "@/service/AccountService";


export default function useAuthCheck(){
    // const [user, setUser] =useState({})
    const userData = useAccount()
    // console.log('auth check log')
    // console.log(userData)    
    const [authCheck, setAuthChecked] = useState(false);
    const dispatch = useAccountDispatch()
    
    useEffect(()=> {        
        let ignore = false
        // const cookies = document.cookie;
        // console.log('Cookies:', cookies);
        async function getUserAccount() {
            const userData =  await accountService.getCurrentUser()
            if(userData)
                dispatch({ type:'login', data:userData })
            setAuthChecked(true)
        }
        if(!ignore){
            if(Object.keys(userData).length > 0 ){
                setAuthChecked(true)
            }else{
                getUserAccount()
            }
        }
        return ()=> ignore = true
    }, [])
    return authCheck;
}