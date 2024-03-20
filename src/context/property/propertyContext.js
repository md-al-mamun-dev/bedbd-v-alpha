'use client'
import { createContext, useContext, useReducer } from "react";
import propertyReducers from "@/reducers/propertyReducers";
import { store } from "../store";




export const PropertyContext = createContext(null);
export const PropertyDispatchContext = createContext(null)

export default function PropertyProvider({ children }){
    const [property, dispatchProperty] = useReducer(propertyReducers, store['property']);

    return (
        <PropertyContext.Provider value={property}>
            <PropertyDispatchContext.Provider value={dispatchProperty}>
                {children}
            </PropertyDispatchContext.Provider>
        </PropertyContext.Provider>
    )
}
