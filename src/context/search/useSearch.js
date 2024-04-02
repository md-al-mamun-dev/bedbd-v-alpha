import { useContext } from "react"
import { SearchContext } from "./searchContext"

export default function useSearch(){
    return useContext(SearchContext)
}