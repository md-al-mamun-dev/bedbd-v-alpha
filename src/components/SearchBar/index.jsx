'use client'
import filterIcon from '../../../public/icons/filter.svg'
import leftArrow from '../../../public/icons/arrow-left.svg'
import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import usePropertyTypes from '@/hooks/usePropertyTypes'
import usePropertyBookingType from '@/hooks/usePropertyBookingTypes'
import usePropertyFeatures from '@/hooks/usePropertyFeatures'
import useAmenities from '@/hooks/useAmenities'
import LucidIcon from '../LucidIcon'
// import LucidIcon from './LucidIcon'
import starIcon from '../../../public/icons/star_clr_primary.svg'
import Calender from './Calender'
import { AddressAutofill } from '@mapbox/search-js-react'
import { SearchBox } from '@mapbox/search-js-react'
import useSearchDispatch from '@/context/search/useSearchDispatch'
import useSearch from '@/context/search/useSearch'


export default function SearchBar(params) {

    const [showGuestCounter, setShowGuestCounter] = useState(false)
    // const [bookingDate, setBookingDate] = useState([])
    const [selectedDate, setSelectedDate] = useState([])
    const [showCalender, setShowCalender] =  useState(false)
    const calenderRef = useRef(null);

    const dispatch = useSearchDispatch()
    const searchData = useSearch()
 
    // const autoFill = useMapboxAutofill()

    const {isLoading:isPropertyTypeLoading, propertyTypes} = usePropertyTypes()
    const {isLoading:isPropertyBookingTypeLoading, propertyBookingTypes} = usePropertyBookingType()
    const {isLoading:isPropertyFeaturesLoading, propertyFeatures} = usePropertyFeatures()

    const {isLoading:isAmenitiesLoading, amenities } = useAmenities()

    const [areaRange , setAreaRange] = useState(3);
    const [priceRange, setPriceRange] = useState(20);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (calenderRef.current && !calenderRef.current.contains(event.target)) {
            setShowCalender(false);
          }
          
        };
    
        const handleEscapeKey = (event) => {
          if (event.key === 'Escape' ) {
            if(showCalender)
                setShowCalender(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('keydown', handleEscapeKey);
        };
      }, [showCalender]);

    console.log(amenities)
    // console.log(propertyTypes)
    // console.log(propertyBookingTypes)
    // console.log(propertyFeatures)

    const [location, setLocation] = useState('')
    const [checkInOut, setChekInOut] = useState('12/11/23 - 01/01/24')
    const [guestCout, setGuestCount] = useState(2)

    const [propertyType, setPropertyType] = useState('65dd765494d32d279b9e')
    const [propertyView, setPropertyView] = useState('65f52c372ae6ee0f109d')

    const [propertyCondition, setPropertyCondition] = useState('65e32ed028797e0cb01a')

    const [selectedAmenities, setSelectedAmenities] = useState([])
    

    function formateDate(dataArray) {
        if(dataArray.length < 1){
            return 'select date'
        }else if(dataArray.length < 2){
            const date = new Date(dataArray[0] * 1000)
            const year = String(date.getFullYear());
            const month = date.toLocaleString('en-US', { month: 'long' });
            const day = String(date.getDate()).padStart(2, '0');
            return `${day} ${month}, ${year}`
        } else{
            const checkInDate = new Date(dataArray[0] * 1000)
            const checkInYear = String(checkInDate.getFullYear());
            const checkInMonth = checkInDate.toLocaleString('en-US', { month: 'long' });
            const checkInDay = String(checkInDate.getDate()).padStart(2, '0');
    
            const checkOutDate = new Date(dataArray[1] * 1000)
            const checkOutYear = String(checkOutDate.getFullYear());
            const checkOutMonth = checkOutDate.toLocaleString('en-US', { month: 'long' });
            const checkOutDay = String(checkOutDate.getDate()).padStart(2, '0');
    
            if(checkInYear === checkOutYear)
                return `${checkInDay} ${checkInMonth} - ${checkOutDay} ${checkOutMonth}, ${checkInYear}`
            else
                return `${checkInDay} ${checkInMonth}, ${checkInYear} - ${checkOutDay} ${checkOutMonth}, ${checkOutDate}`
        }       

    }

    function onAmenitiesItemClick(id) {
        console.log(id)
        if(!selectedAmenities.includes(id)){
            setSelectedAmenities([...selectedAmenities, id])
        }else{
            setSelectedAmenities(selectedAmenities.filter(item=> item != id))
        }
    }
    function handleRetrieve(e) {
        if(e['features'][0]['properties']['coordinates']){
            console.log('locaiton changed')
            dispatch({
                type: 'search/location', 
                data: e['features'][0]['properties']['coordinates']} )
        }else
            console.log(e['features'][0]['properties']['coordinates'])

    }

    function onGuestCountChange(e) {
        console.log(e.target.value);
        const guestCount  = e.target.value.trim() === ''
                                ? 0 
                                : isNaN(e.target.value)
                                    ? 0
                                    : parseInt(e.target.value)
        dispatch({
            type: 'search/guestCount', 
            data: guestCount})
    }

    return (
        <div className='bg-secondary-050 box-shadow-gray min-w-314px width-320px min-h-100vh p-32px-24px'>
          <div className="w-100 h-100">

            <div className='flex space-between'>
                <div className='flex gap-10px p-12px-24px border-primary-1 clr-primary align-center fs-200 fw-semi-bold radius-40px no-background '> <Image height={24} width={24}  src={filterIcon}/> Advance Search </div>
                <button className='bg-primary-400_a_0_12 p-12px round no-border cursor-pointer'>
                    <Image src={leftArrow}/>
                </button>
            </div>
            <form className='grid gap-24px mr-top-32px'>

                <div className='flex flex-col gap-8px'>
                    <label className='fs-500 fw-semi-bold clr-neutral-500'>Location</label>
                        <SearchBox 
                            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                            onRetrieve={handleRetrieve}
                            placeholder='enter your location'
                            value={location}

                        />
                            {/* <input 
                                className='bg-secondary-050 w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400' 
                                value={location}
                                placeholder='Enter your location'
                                autoComplete='place'
                                onChange={e => setLocation(e.target.value)}
                                /> */}
                        {/* </SearchBox> */}
                </div>

                <div className='flex flex-col gap-8px'>
                    <label className='fs-500 fw-semi-bold clr-neutral-500'>Check In - Out</label>
                    <div className='position-relative'>
                        <input className='bg-secondary-050 w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400' value={formateDate(searchData['dateRange'])}/>
                        <div onClick={ e => { setShowCalender(!showCalender)}} className='no-border no-background position-absolute top-50 translateY-50 right-8px opacity-0_70 cursor-pointer'>
                            <LucidIcon name='calendar-days' size={24}/>
                        </div>
                        <Calender
                            data = {searchData['dateRange']}
                            reducerType='search/dateRange'
                            dispatch={dispatch}   
                            showCalender={showCalender}  
                            calenderRef={calenderRef} />
                    </div>
                </div>

                <div className='flex flex-col gap-8px'>
                    <label className='fs-500 fw-semi-bold clr-neutral-500'>Guest</label>
                    <div className='position-relative text-select-none'>
                        <div
                            onClick={()=>{dispatch({type:'search/decrementGuest', data: 1})}} 
                            className='top-50 translateY-50 cursor-pointer left-50-56px position-absolute no-border bg-neutral-000 p-4px round'><LucidIcon name='minus'/> </div>
                        <input 
                            onChange={onGuestCountChange}
                            className='bg-secondary-050 w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400 txt-align-center' 
                            value={searchData['guestCount']['totalGuestCount']}
                            />  

                        <div 
                            onClick={()=>{dispatch({type:'search/incrementGuest', data: 1})}} 
                            className='top-50 translateY-50 cursor-pointer right-50-56px position-absolute no-border bg-neutral-000 p-4px round'><LucidIcon name='plus'/> </div>
                    </div>
                </div>

                <div className='flex flex-col gap-8px'>
                    <label className='fs-500 fw-semi-bold clr-neutral-500'>Property Type</label>
                    <select className='bg-secondary-050 w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400' value={propertyType} >
                        {
                            propertyTypes.map(item => <option value={item['id']}>{item['typeName']}</option>)
                        }                    
                    </select>
                </div>

                <div className='flex flex-col gap-8px'>
                    <label className='fs-500 fw-semi-bold clr-neutral-500'>Property View</label>
                    <select className='bg-secondary-050 w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400' value={propertyView}>
                        {
                            propertyBookingTypes.map(item => <option value={item['id']}>{item['title']}</option>)
                        }                    
                    </select>
                </div>

                <div className='flex flex-col gap-8px'>
                    <label className='fs-500 fw-semi-bold clr-neutral-500'>Property Condition</label>
                    <select className='bg-secondary-050  w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400 fs-regular clr-neutral-400' value={propertyCondition}>
                        {
                            propertyFeatures.map(item => <option value={item['id']}>{item['title']}</option>)
                        }
                    </select>
                </div>

                <div className='flex flex-col gap-8px'>
                    <label className='flex space-between fs-500 fw-semi-bold clr-neutral-500'>Area Range <span>{(areaRange > 1000 ? (areaRange/1000).toFixed(2)+'km' : areaRange+'m' )}</span> </label>
                    <input
                        className='bg-secondary-050 min-w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400'
                        onChange={e=>setAreaRange(e.target.value)}
                        type='range' min='500' max='10000' value={areaRange} id='area_range' />
                </div>

                <div className='flex flex-col gap-8px'>
                    <label className='flex space-between fs-500 fw-semi-bold clr-neutral-500' >Price Range <span>{'$ '+priceRange}</span></label>
                    <input
                        className='bg-secondary-050 min-w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400'
                        onChange={e=>setPriceRange(e.target.value)}
                        type='range' min='10' max='500' value={priceRange} id='price_range' />
                </div>

                <div className='flex flex-col gap-8px'>
                    <label className='flex space-between fs-500 fw-semi-bold clr-neutral-500'>Gender </label>
                    <select className='bg-secondary-050 min-w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400'>
                        <option value=''>any</option>
                        <option value='male'>male</option>
                        <option value='female'>female</option>
                    </select>
                </div>

                <div className='flex flex-col gap-8px'>
                    <label className='flex space-between fs-500 fw-semi-bold clr-neutral-500'>Rating </label>
                    <div>
                        <ul className='flex w-100 border-neutral-100 radius-4 fs-200'>
                            <li className=' bg-green-100 p-8px-14px flex align-center position-relative border-left-100'>
                                <LucidIcon name='check' size={24}/>
                                Any</li>
                            <li className=' cursor-pointer p-8px-14px flex align-center position-relative border-left-100'>
                                3.5
                                <Image src={starIcon} height={24} width={24} />
                            </li>
                            <li className='cursor-pointer p-8px-14px flex align-center position-relative border-left-100'>4.0<Image src={starIcon} height={24} width={24} /></li>
                            {/* <li className='p-8px-14px flex align-center'>4.5<Image src={starIcon} height={24} width={24} /></li> */}
                            <li className='cursor-pointer p-8px-14px flex align-center position-relative border-left-100'>4.5<Image src={starIcon} height={24} width={24} /></li>
                            {/* <li className='p-8px-14px flex align-center position-relative border-left-100'>5.0<Image src={starIcon} height={24} width={24} /></li> */}

                        </ul>
                    </div>
                </div>

                <div className='grid gap-16px'>
                    <label className='flex space-between fs-500 fw-semi-bold clr-neutral-500'>Amenities </label>
                    {
                        amenities
                            .map(item=>(
                                <div className='cursor-pointer flex gap-10 clr-neutral-600 fs-regular fw-regular-dark' onClick={()=>onAmenitiesItemClick(item['id'])}>
                                    <div className='min-w-24px min-h-24px'>
                                        {
                                            selectedAmenities.includes(item['id'])
                                                ?   <LucidIcon className='opacity-0_70' name='check-square' size={24}/>
                                                :   <LucidIcon className='opacity-0_70' name='square' size={24}/>
                                        }
                                    </div>
                        
                                    <input                                        
                                        type='radio'
                                        onClick={()=>onAmenitiesItemClick(item['id'])}
                                        checked={selectedAmenities.includes(item['id'])}/> {item['title']}
                                </div>))
                    }
                    {/* <input type='radio'/> Food Court */}

                </div>
            </form>


            
            

          </div>
        </div>
    )
}