import React, { useEffect, useState } from 'react'
import useAmenities from '@/hooks/useAmenities'
import Heading from '../Heading'
import SwitchBtn from '../SwitchBtn'
import LucidIcon from '@/components/LucidIcon'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import conventionToNormalText from '@/components/Utility/conventionToNormalText'

export default function Amenities({data, nextPage, previousPage}) {
  const { isLoading } = useAmenities()
  const [amenities, setAmenities] =useState({})
  const {amenities:amenitiesData} = data  
  const dispatch = usePropertyDispatch()

useEffect(()=>{
  let ignore = false;
  if(!isLoading && !ignore){      
    setAmenities(()=>amenitiesData.reduce((result, item) => {
        const { category, ...rest } = item;
        result[category] = result[category] || [];
        result[category].push(rest);
        return result;
    }, {}))
  }  
}, [amenitiesData])



  function toggleAmenitiesSelection(id) {
    data['selectedAmenities'].includes(id)
      ? dispatch({type:'property/removeSelectedAmenities', data: id})
      : dispatch({type:'property/addSelectedAmenities', data: id})      
  }

  return (
    <div className='w-100 h-max-content absolute-h-center top-0 max-width-1280'>
        <div className='max-w-814px mr-l-auto mr-r-auto p-btm-80px'>
        <Heading txt='Amenities'/>
            <div className='w-100 grid grid-temp-col-2 gap-40px '>
              {

                isLoading
                  ? <div>Loading...</div>
                  : Object.keys(amenities).map( itemKey =>{
                      const catagory = conventionToNormalText(itemKey)
                      return (<div className=' w-fit-content '>
                      <h3 className='clr-neutral-600 fs-600 fw-regular-dark'>{catagory}</h3>
                      <div className='grid gap-16px mr-top-12px'>
                        {
                          amenities[itemKey].map(item => {
                              const isSelected  = data['selectedAmenities'].includes(item['id'])
                                return (<button 
                                          onClick={()=>toggleAmenitiesSelection(item['id'])}
                                          className='no-border bg-transparent no-outline flex flex-align-center gap-8px cursor-pointer'>
                                          <div className='min-w-24px'>
                                            <LucidIcon className='opacity-0_70 ' name={isSelected ? 'check-square' : 'square'} size={24}/>
                                          </div>
                                          {item['title']}
                                        </button>)})
                        }                    
                      </div>
                    </div>)
                    } )
              }

            </div>            
            <SwitchBtn nextPage={nextPage} previousPage={previousPage}/>
        </div>
    </div>
  )
}
