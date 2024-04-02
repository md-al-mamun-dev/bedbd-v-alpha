'use client'
import { createContext, useContext, useReducer } from "react";
import searchReducers from "@/reducers/searchReducers";
import { store } from "../store";


export const SearchContext = createContext(null);
export const SearchDispatchContext = createContext(null)

export default function LocationProvider({ children }){
    const [search, dispatchSearch] = useReducer(searchReducers, store['search']);

    return (
        <SearchContext.Provider value={search}>
            <SearchDispatchContext.Provider value={dispatchSearch}>
                {children}
            </SearchDispatchContext.Provider>
        </SearchContext.Provider>
    )
}
