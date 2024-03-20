import { useContext } from "react"
import { RegistrationDispatchContext } from "./registrationContext"

export default function useRegistrationDispatch(){
    return useContext(RegistrationDispatchContext)
}