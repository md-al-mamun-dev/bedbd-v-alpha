import Image from 'next/image'
import styles from './page.module.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import SearchFilter from '@/components/SearchFilter'
import ListingGallery from '@/components/ListingGallery'
import UserEntrance from '@/components/UIElements/UserEntrance/PhoneInput'
import AccountProvider from '../context/account/accountContext'
import { Client, Databases, Account, Query, Storage, Users } from 'node-appwrite'


function removeUnnesseryProperties(object) {

    const returnObject = {}
    Object.entries(object).map(([key, value])=>{
      if(!(key === '$permissions' || key ===  '$databaseId' || key ===  '$collectionId') ){
        if(value instanceof Object)
          returnObject[key] = removeUnnesseryProperties(value)
        else if (value instanceof Array)
        returnObject[key] = value.map(item => {
          if(item instanceof Object){
            return removeUnnesseryProperties(item)
          } else {
            return item
          }
        })
        returnObject[key] = value
      }
      
    })
  return returnObject
}

async function getProperties() {  
  const        APPWRITE_URL = process.env.APPWRITE_URL
  const          PROJECT_ID = process.env.APPWRITE_PROJECT_ID
  const             API_KEY = process.env.APPWRITE_BACKEND_API_KEY
  const               DB_ID = process.env.APPWRITE_DB_BEDBD_ID
  const PROPERTY_COLLECTION = process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID

  
  const client = new Client();
      client
          .setEndpoint(APPWRITE_URL)
          .setProject(PROJECT_ID)
          .setKey(API_KEY);
  const databases = new Databases(client);
  const   storage = new Storage(client);
  const   users = new Users(client);

  const data =  await databases.listDocuments(  DB_ID, PROPERTY_COLLECTION)

    return data.documents.map(item => {
      const returnObject = {}
      Object.entries(item).map(([key, value])=>{
        if(!(key === '$permissions' || key ===  '$databaseId' || key ===  '$collectionId') ){
          returnObject[key] = value
        }
        
      })
    return returnObject
    })
}

export default async function Home() {
  const data = await getProperties()
  console.log(data)
  return (
    <>
      <AccountProvider>
        <Header/>
      </AccountProvider>
      <div className={`w-100 z-index-1 `}>
          <SearchFilter />
          <ListingGallery data={data}/>
      </div>
      <Footer/>
    </>
    
  )
}
