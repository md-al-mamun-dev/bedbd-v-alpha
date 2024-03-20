import { useContext } from "react"
import { PropertyContext } from "./propertyContext"
// import { AccountContext } from "./propertyContext"

export default function useProperty(){
    return useContext(PropertyContext)
}