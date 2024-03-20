
import styles from './index.module.css'
import { Square, CheckSquare, Plus, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import SwitchBtn from '../SwitchBtn'
import useProperty from '@/context/property/useProperty'
import Heading from '../Heading'


export default function ViewBasicInfo({previousPage, nextPage}) {
  const icon = 'icon_house.svg'
  const scopes = [ 'Entire place', 'A private room' ]
  const brifingText = `An entire home where guests can book the entire place or a single room.`

  const data = useProperty()
  const { propertyTypes, selectedPropertyType} = data

  const selectedProperty = propertyTypes.find(i=>i['id']===selectedPropertyType)
  
  return (
    <div className=' w-100 absolute-center max-width-1280'>
      <Heading txt={`You're Listing`} />
        {/* <h3 className={`${styles.heading}`}>You're Listing</h3> */}
        

        <div className={`${styles.icon_wrapper}`}>          
          <Image src={`icons/${selectedProperty['icon']}`} fill/>
        </div>


        <p className={`fs-regular fw-regular-dark clr-neutral-400 line-height-24px max-w-540 mr-l-auto mr-r-auto mr-t-b-32px txt-align-center`}>
          {
            selectedProperty['typeDescription']
              ? selectedProperty['typeDescription']
              : selectedProperty['typeName']
          }
        </p>
        <h4 className='fs-600 fw-semi-bold clr-neutral-600 w-fit-content mr-l-auto mr-r-auto mr-btm-24px mr-t-24px' >Sounds good?</h4>
        <SwitchBtn previousPage={previousPage} nextPage={nextPage}/>
    </div>
  )
}

// const ViewBasicInfo = ({previousPage, nextPage}) => {


//   const icon = 'icon_house.svg'

//   const scopes = [ 'Entire place', 'A private room' ]
//   const brifingText = `An entire home where guests can book the entire place or a single room.`

//   const imgSrc = await import(`@/../public${data['imageUrl']}`)


  
// }

// export default ViewBasicInfo