import { useContext } from "react"
import { PropertyDispatchContext } from "./propertyContext"

export default function usePropertyDispatch(){
    return useContext(PropertyDispatchContext)
}