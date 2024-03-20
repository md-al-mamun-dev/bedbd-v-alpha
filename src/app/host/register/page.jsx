import Register from "@/components/Register"
import AccountProvider from "@/context/account/accountContext"
import RegistrationProvider from "@/context/registration/registrationContext"

export default function register() {
  return  <AccountProvider>
            <RegistrationProvider>
              <Register/>
            </RegistrationProvider>
          </AccountProvider> 
}
