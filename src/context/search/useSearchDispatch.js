import { useContext } from "react"
import { SearchDispatchContext } from "./searchContext"

export default function useSearchDispatch(){
    return useContext(SearchDispatchContext)
}