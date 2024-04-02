import Image from 'next/image'
import styles from './page.module.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import SearchFilter from '@/components/SearchFilter'
import ListingGallery from '@/components/ListingGallery'
import UserEntrance from '@/components/UIElements/UserEntrance/PhoneInput'
import AccountProvider from '../context/account/accountContext'
import LocationProvider from '@/context/search/searchContext'
import Hero from '@/components/Hero'
// import Hero from '@/components/Hero'
import { Client, Databases, Account, Query, Storage, Users } from 'node-appwrite'
import removeAppwriteSecreatProperties from '@/components/Utility/removeAppwriteSecreatProperties'
import SearchGallery from '@/components/SearchGallery'
import SearchBar from '@/components/SearchBar'
import SearchMap from '@/components/SearchMap'
import MapboxMap from '@/components/MapboxMap'


// async function getRatingReviews(propertyId) {
//   const           APPWRITE_URL = process.env.APPWRITE_URL
//   const             PROJECT_ID = process.env.APPWRITE_PROJECT_ID
//   const                API_KEY = process.env.APPWRITE_BACKEND_API_KEY
//   const                  DB_ID = process.env.APPWRITE_DB_BEDBD_ID
//   const PROPERTY_RATING_REVIEW = process.env.APPWRITE_DB_COLLECTION_RATING_REVIEW_ID
  
//   const client = new Client();
//       client
//           .setEndpoint(APPWRITE_URL)
//           .setProject(PROJECT_ID)
//           .setKey(API_KEY);
//   const databases = new Databases(client);
//   const data = await  databases.listDocuments(  
//                                     DB_ID, 
//                                     PROPERTY_RATING_REVIEW, 
//                                     [Query.equal("propertyId", [propertyId])])
//   return data.documents
// }


async function getProperties() {  
  const           APPWRITE_URL = process.env.APPWRITE_URL
  const             PROJECT_ID = process.env.APPWRITE_PROJECT_ID
  const                API_KEY = process.env.APPWRITE_BACKEND_API_KEY
  const                  DB_ID = process.env.APPWRITE_DB_BEDBD_ID
  const    PROPERTY_COLLECTION = process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID
  const PROPERTY_RATING_REVIEW = process.env.APPWRITE_DB_COLLECTION_RATING_REVIEW_ID

  
  const client = new Client();
      client
          .setEndpoint(APPWRITE_URL)
          .setProject(PROJECT_ID)
          .setKey(API_KEY);
  const databases = new Databases(client);

  const data =  await databases.listDocuments(  DB_ID, PROPERTY_COLLECTION)
  const _data = await Promise.all(data['documents'].map(async item=>{
    if(item['propertyRatingReview'].length < 1){
      const result =  await databases.listDocuments(  
                                    DB_ID, 
                                    PROPERTY_RATING_REVIEW, 
                                    [Query.equal("propertyId", [item['$id']])])
                                    
      const ratingReview = result['documents'].map(item =>
                              (Object.entries(item)
                                      .reduce((acc, [key, value]) => {
                                          if (key.endsWith('Rating')) {
                                              const ratingKey = key.replace('Rating', ''); // Remove 'Rating' from the key
                                              acc.ratings = acc.ratings || {}; // Create ratings object if it doesn't exist
                                              acc.ratings[ratingKey] = value; // Assign the rating value to the ratings object
                                          }else if(key=== 'author'){
                                              acc[key] = {
                                                                      name: value['name'], 
                                                              description: value['description'],
                                                              profilePhoto: value['profilePhoto']
                                                                              .reduce((latest, current) => {
                                                                                      const latestTime = new Date(latest['$updatedAt']).getTime();
                                                                                      const currentTime = new Date(current['$updatedAt']).getTime();
                                                                                      return currentTime > latestTime ? current : latest;
                                                                                  })['profilePhotoID'],
                                                                    badges: value['badges']
                                                                              .map(i=>({ badgeName: i['badgeName'],
                                                                                              icon: {
                                                                                                      type: i['iconType'],
                                                                                                      name: i['iconName'],
                                                                                                      url:  i['iconUrl']
                                                                                                  }
                                                                                          }))
                                                          }
                                          }else{
                                              acc[key] = value;
                                          }
                                    
                                          return acc;
                                      }, {})) )
      return {  ...item, propertyRatingReview: ratingReview }
    }else{
      return item
    }
  }))

  // console.log('from data retrive')
  // // console.log(propertyRatingReview)

    return _data.map(item => removeAppwriteSecreatProperties(item))
}

export default async function Home() {
  const data = await getProperties()
  // console.log(data)
  return (
    <>
      <AccountProvider>
        <Header/>
      </AccountProvider>
      {/* <Hero/> */}

      <div className='w-100 flex container'>
        <LocationProvider>
          <SearchBar/>
          <div className='w-100'>
            {/* <MapboxMap/> */}
              <SearchMap />            
            {/* <Hero/> */}
            {/* <SearchFilter /> */}
            <SearchGallery data={data}/>
            <ListingGallery data={data}/>
        </div>
        </LocationProvider>
        
      </div>
      
      <Footer/>
    </>
    
  )
}
