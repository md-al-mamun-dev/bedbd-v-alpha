'use client'
import styles from './page.module.css'
import Image from 'next/image'
import ListingType from './ListingType'
import Scope from './SelectBookingType'
import SelectBookingType from './SelectBookingType'
import ViewBasicInfo from './ViewBasicInfo'
import DescriptionInput from './DescriptionInput'
import LocationConfirmation from './LocationConfirmation'
import ImageUpload from './ImageUpload'
import SetRent from './SetRent'
import PropertyProvider from '@/context/property/propertyContext'
import { useState } from 'react'
// import useProperty from '@/context/property/useProperty'
import PropertyDetails from './PropertyDetails'
import PropertyLocation from './PropertyLocation'
import AccommodationDetails from './AccommodationDetails'
import HomeRules from './HomeRules'
import Availability from './Availability'
import Approving from './Approving'
import TermsConditions from './TermsConditions'
import Congrats from './Congrats'
import useProperty from '@/context/property/useProperty'
import Amenities from './Amenities'
import useAccount from '@/context/account/useAccount'
import useAuthCheck from '@/hooks/useAuthCheck'




const AddListing = () => {
const [pageState, setPageState] = useState('select-property-type')

const { isLoading } = useAuthCheck()

const property = useProperty()
const userData = useAccount()
// import useAccount from '@/context/account/useAccount'
// const useAccount = useAccount()

  return (
    
    <>
      <div className={` w-100 min-h-100vh relative`}>
      <div className=' w-100 relative-center max-width-1280'>

        { pageState === 'select-property-type' 
                      &&  <ListingType 
                            nextPage={()=>setPageState('property-type-confirmation')} />}

        { pageState === 'property-type-confirmation' 
                      && <ViewBasicInfo 
                            data = {property}
                            previousPage={()=>setPageState('select-property-type')}  
                            nextPage={()=>setPageState('select-booking-type')}/>}

        { pageState === 'select-booking-type' 
                      && <SelectBookingType 
                            data = {property}
                            previousPage={()=>setPageState('property-type-confirmation')} 
                            nextPage={()=>setPageState('property-details')} />}

        { pageState === 'property-details'
                      && <PropertyDetails
                            data = {property}
                            nextPage={()=>setPageState('property-location')} 
                            previousPage={()=>setPageState('select-booking-type')} />
        }
                {/* property-location */}

        { pageState === 'property-location'
                      && <PropertyLocation
                          data={property}
                          nextPage={()=>setPageState('location-confirmation')} 
                          previousPage={()=>setPageState('property-details')} />
        }
        { pageState === 'location-confirmation'
                      && <LocationConfirmation 
                          data={property}
                          nextPage={()=>setPageState('accommodation-details')} 
                          previousPage={()=>setPageState('property-location')}/>
        }
        { pageState === 'accommodation-details'
                      && <AccommodationDetails 
                          nextPage={()=>setPageState('amenities')} 
                          previousPage={()=>setPageState('location-confirmation')}/>
        }   
        { pageState === 'amenities'
                      && <Amenities 
                          data={property} 
                          nextPage={()=>setPageState('home-rules')} 
                          previousPage={()=>setPageState('accommodation-details')} />
        }     

        { pageState === 'home-rules'
                      &&  <HomeRules 
                            data={property} 
                            nextPage={()=>setPageState('upload-image')} 
                            previousPage={()=>setPageState('amenities')}/>}

        {
          pageState === 'upload-image'
                      && <ImageUpload 
                          data={property}
                          nextPage={()=>setPageState('set-rent')} 
                          previousPage={()=>setPageState('home-rules')}/>

        }
        {
          pageState === 'set-rent'
                      && <SetRent 
                          data={property}
                          nextPage={()=>setPageState('availability')} 
                          previousPage={()=>setPageState('upload-image')}/>

        }
        {
          pageState === 'availability'
                      && <Availability 
                          data={property}
                          nextPage={()=>setPageState('approving')} 
                          previousPage={()=>setPageState('set-rent')}/>

        }
        { pageState === 'approving' 
                      && <Approving 
                          data={property}
                          nextPage={()=>setPageState('terms-conditions')} 
                          previousPage={()=>setPageState('availability')}/>
        }
        {
          pageState === 'terms-conditions'
                      && <TermsConditions 
                          data={property}
                          userId={userData['$id']}
                          nextPage={()=>setPageState('congrats')} 
                          previousPage={()=>setPageState('approving')}/>

        }
          {
            pageState === 'congrats'
                      && <Congrats data={property}/> 
          }

      </div>        
    </div>
    </>    
  )
}

export default AddListing