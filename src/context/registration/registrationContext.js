'use client'
import { createContext, useContext, useReducer } from "react";
import accountReducers from "../../reducers/accountReducers";
import registrationReducers from "@/reducers/registrationReducers";
import { store } from "../store";


export const RegistrationContext = createContext(null);
export const RegistrationDispatchContext = createContext(null)

export default function RegistrationProvider({ children }){
    const [registration, dispatchRegistration] = useReducer(registrationReducers, store['registration']);

    return (
        <RegistrationContext.Provider value={registration}>
            <RegistrationDispatchContext.Provider value={dispatchRegistration}>
                {children}
            </RegistrationDispatchContext.Provider>
        </RegistrationContext.Provider>
    )
}
