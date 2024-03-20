
// import Header from "@/components/Header"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import AccountProvider from "@/context/account/accountContext"


export const metadata = {
  title: 'Bedbd.com',
  description: 'Find your sweet place',
}

export default function RootLayout({ children }) {
  return (
    <>
      <AccountProvider>
        <Header/>
      </AccountProvider>        
      {children}
      <Footer/>
    </>


  )
}
