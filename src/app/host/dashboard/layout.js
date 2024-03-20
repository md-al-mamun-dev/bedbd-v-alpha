import Header from "./Header"
export const metadata = {
  title: 'Bedbd.com',
  description: 'Find your sweet place',
}

export default function RootLayout({ children }) {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}
