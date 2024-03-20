import { useContext } from "react"
import { RegistrationContext } from "./registrationContext"

export default function useRegistration(){
    return useContext(RegistrationContext)
}