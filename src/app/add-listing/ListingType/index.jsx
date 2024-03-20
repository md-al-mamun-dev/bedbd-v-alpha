'use client'
import styles from './index.module.css'
import Image from 'next/image'
import usePropertyTypes from '@/hooks/usePropertyTypes'

import propertyService from '@/service/PropertyService'
import { useEffect, useState } from 'react'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import useProperty from '@/context/property/useProperty'
import Heading from '../Heading'

const ListingType = ({ data, nextPage}) => {
    // const [apartmentTypes, setApartmentTypes] = useState([])

    const [selectedTypeId, setSelectedTypeId] = useState('')
    const { propertyTypes, isLoading } = usePropertyTypes()

    const propertyData = useProperty()
    const { selectedPropertyType } = propertyData

    const dispatch = usePropertyDispatch()

    function onPropertyTypeClickHandlar(propertyTypeId) {
        setSelectedTypeId(propertyTypeId)
        dispatch({type:'property/select', data: propertyTypeId})
    }

    // const apartmentTypes = [
    //     {
    //         id:0,
    //         name:"Apartment",
    //         icon:"icon_apartment.svg"
    //     },
    //     {
    //         id: 1,
    //         name:"House",
    //         icon:"icon_house.svg"
    //     },
    //     {
    //         id:2,
    //         name:"Shard Room",
    //         icon:"icon_shared_room.svg"
    //     },
    //     {
    //         id: 3,
    //         name:"Condons",
    //         icon:"icon_condos.svg"
    //     },
    //     {
    //         id: 4,
    //         name:"Villa",
    //         icon:"icon_villa.svg"
    //     },
    //     {
    //         id: 5,
    //         name:"Farmhouse",
    //         icon:"icon_farmhouse.svg"
    //     }
    // ]

// useEffect(()=>{ 
//     let ignore = false
    
//     getPropertyTypes()
//     return ()=> ignore = true
// }, [])

function onContinueBtnClickHandlar() {
    nextPage()
}

  return (
    <div className=' w-100 absolute-center max-width-1280 p-l-r-127px'>
        <Heading txt='Basic Information'/>
        {/* <h3 className=' clr-primary-400 txt-align-center fw-regular-dark fs-875'>Basic Information</h3> */}
        <p className={`${styles.sub_heading} mr-btm-64px clr-neutral-500`}>List your property on bedbd.com and welcoming guests in a matter of moments!</p>

        <div className={`${styles.listing_type} clr-neutral-600`}>
            <p className={`${styles.instruction_info} `}>To begin, choose the type of property you'd like to list on bedbd.com</p>
            <div className={`${styles.listing_type_items}`}>
                {
                    isLoading 
                        ? <div>Loading...</div>
                        :  propertyTypes.map(type=>(
                                            <div key={type['id']} className={`${styles.listing_type_item}  ${selectedPropertyType===type['id'] ? 'outline-secondary-400 border-transparent-1px scale-0003': 'outline-transparent-2px border-neutral-100'  } `} onClick={()=> onPropertyTypeClickHandlar(type['id'])}>                                                    
                                                <div className={`${styles.item_icon_wrapper}`}>
                                                    <Image src={`/icons/${type.icon}`} fill />
                                                </div>
                                                <h4 className={`${styles.listing_type_name}`}>{type['typeName']}</h4>
                                            </div>))
                }
            </div>
            <button onClick={onContinueBtnClickHandlar} className={` ${ selectedPropertyType.length === 0 ? 'btn-disable': 'btn-primary'}  w-100 max-w-386 relative-horizontal-center`}>Continue</button>                
        </div>

        </div>
  )
}

export default ListingType