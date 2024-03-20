import { useContext } from "react"
import { AccountDispatchContext } from "./accountContext"

export default function useAccountDispatch(){
    return useContext(AccountDispatchContext)
}