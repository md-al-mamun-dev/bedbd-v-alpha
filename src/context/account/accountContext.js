'use client'
import { createContext, useContext, useReducer } from "react";
import accountReducers from "../../reducers/accountReducers";
import { store } from "../store";




export const AccountContext = createContext(null);
export const AccountDispatchContext = createContext(null)

export default function AccountProvider({ children }){
    const [account, dispatchAccount] = useReducer(accountReducers, store['account']);

    return (
        <AccountContext.Provider value={account}>
            <AccountDispatchContext.Provider value={dispatchAccount}>
                {children}
            </AccountDispatchContext.Provider>
        </AccountContext.Provider>
    )
}
