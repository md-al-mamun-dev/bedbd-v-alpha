import AddListing from "./AddListing"
import PropertyProvider from "@/context/property/propertyContext"
import AccountProvider from "@/context/account/accountContext"

export default function page() {
  return (
    <PropertyProvider>
      <AccountProvider>
        <AddListing/>
      </AccountProvider>
    </PropertyProvider>
  )
}
