import ListingType from './ListingType'
import PropertyProvider from '@/context/property/propertyContext'

const AddListing = () => {
  return (
    <PropertyProvider>
        <div className={` w-100 min-h-100vh relative`}>
            <div className=' w-100 relative-center max-width-1280'>
                <ListingType/>
            </div>
        </div>
    </PropertyProvider>
  )
}

export default AddListing