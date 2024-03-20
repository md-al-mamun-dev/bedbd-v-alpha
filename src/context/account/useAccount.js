import { useContext } from "react"
import { AccountContext } from "./accountContext"

export default function useAccount(){
    return useContext(AccountContext)
}