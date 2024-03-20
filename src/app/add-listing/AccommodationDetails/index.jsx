import React, { useEffect, useState } from 'react'
import PropertyFeature from './PropertyFeature'
import SwitchBtn from '../SwitchBtn'
import LucidIcon from '@/components/LucidIcon'
import copyToClipboard from '@/components/Utility/copyToClipboard'
import useCountriesList from '@/hooks/useCountriesList'
import { City } from 'country-state-city'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import Heading from '../Heading'


export default function AccommodationDetails({nextPage, previousPage}) {
    const dispatch = usePropertyDispatch()
    const [roomCount, setRoomCount] = useState([
                                                    {
                                                        id:0,
                                                        name:'Bedroom',
                                                        count:0,
                                                    },
                                                    {
                                                        id:1,
                                                        name:'Dining Room',
                                                        count:0,
                                                    },
                                                    {
                                                        id:2,
                                                        name:'Washroom',
                                                        count:0,
                                                    },
                                                    {
                                                        id:3,
                                                        name:'Others',
                                                        count:0,
                                                    },
                                                ])
    const [bedCount, setBedCount] = useState([
                                                    {
                                                        id: 0,
                                                        name:'Single bed',
                                                        count:0,
                                                    },
                                                    {
                                                        id: 1,
                                                        name:'Double bed',
                                                        count:0,
                                                    },
                                                    {
                                                        id: 2,
                                                        name:'Extra bed (Request)',
                                                        count:0,
                                                    },
                                                ])
    const [guestCount, setGuestCount] = useState([
                                                    {
                                                        id: 0,
                                                        type:'Adult',
                                                        count:0,
                                                    },
                                                    {
                                                        id: 1,
                                                        type:'under 14',
                                                        count:0,
                                                    },
                                                ])                                                

    function onContinueBtnClick() {
        dispatch({type:'property/roomCount', data: roomCount.filter(i=>i['count']>0)})
        dispatch({type:'property/bedCount', data: bedCount.filter(i=>i['count']>0)})
        dispatch({type:'property/guestCount', data: guestCount.filter(i=>i['count']>0)})        
        nextPage()
    }

    function onRoomCountIncrement(roomName){
        const othersRooms = roomCount.filter(i=> i['name'] !== roomName)
        const room = roomCount.find(i=>i['name']===roomName)
        setRoomCount([...othersRooms, {...room, count: room['count'] + 1}])
    }
    function onRoomCountDecrement(roomName){
        const othersRooms = roomCount.filter(i=> i['name'] !== roomName)
        const room = roomCount.find(i=>i['name']===roomName)
        if(room['count']>0)
            setRoomCount([...othersRooms, {...room, count: room['count'] - 1}])
    }
    function onBedCountIncrement(bedName){
        const othersBeds = bedCount.filter(i=> i['name'] !== bedName)
        const bed = bedCount.find(i=>i['name']===bedName)
        setBedCount([...othersBeds, {...bed, count: bed['count'] + 1}])
    }
    function onBedCountDecrement(bedName){
        const othersBeds = bedCount.filter(i=> i['name'] !== bedName)
        const bed = bedCount.find(i=>i['name']===bedName)
        if(bed['count']>0)
            setBedCount([...othersBeds, {...bed, count: bed['count'] - 1}])
    }

    function onGuestCountIncrement(guestType){
        const othersGuests = guestCount.filter(i=> i['type'] !== guestType)
        const guest = guestCount.find(i=>i['type']===guestType)
        setGuestCount([...othersGuests, {...guest, count: guest['count'] + 1}])
    }
    function onGuestCountDecrement(guestType){
        const othersGuests = guestCount.filter(i=> i['type'] !== guestType)
        const guest = guestCount.find(i=>i['type']===guestType)
        if(guest['count']>0)
            setGuestCount([...othersGuests, {...guest, count: guest['count'] - 1}])
    }
    

  return (
    <div className='w-100 h-max-content absolute-h-center top-0 max-width-1280'>
        <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px'>
            <div className=''>
                <Heading txt='Accommodation Details'/>
                <div className='w-100 '>
                    <div>
                        <h2 className='clr-neutral-600 fs-600 radius-8 fs-600 fw-regular-dark'>Total Room</h2>
                        <div className='box-shadow-300 mr-top-16px p-top-8px p-btm-8px'>
                            {
                                roomCount
                                    .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                                    .map(i=>(
                                        <div key={i['id']} className='flex align-center space-between p-10px-24px position-relative item-underline'>
                                            <div>{i['name']}</div>
                                            <div className='flex'>
                                                <button onClick={ ()=> onRoomCountDecrement(i['name'])} className='no-border no-background cursor-pointer'>
                                                    <LucidIcon name='minus' size={24} />
                                                </button>
                                                <div className='fs-650 w-84px txt-align-center'>{i['count']}</div>
                                                <button onClick={ ()=> onRoomCountIncrement(i['name'])} className='no-border no-background cursor-pointer'>
                                                    <LucidIcon name='plus' size={24}/>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                            }
                            
                        </div>
                        {/* <button className='flex gap-8px flex-align-center mr-top-16px no-background no-outline border-btm-500'>
                            <LucidIcon className='opacity-0_70' name='plus' size={24}/>  
                                add more option
                        </button> */}
                    </div>
                    <div className='mr-top-40px'>
                        <h2 className='clr-neutral-600 fs-600 radius-8 fs-600 fw-regular-dark'>Total Bed</h2>
                        <div className='box-shadow-300 mr-top-16px p-top-8px p-btm-8px'>
                            {
                                bedCount
                                .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                                .map(i=>(
                                    <div key={i['id']} className='flex align-center space-between p-10px-24px position-relative item-underline'>
                                        <div>{i['name']}</div>
                                        <div className='flex'>
                                            <button onClick={()=>onBedCountDecrement(i['name'])} className='no-border no-background cursor-pointer'>
                                                <LucidIcon name='minus' size={24}/>
                                            </button>
                                            <div className='fs-650 w-84px txt-align-center'>{i['count']}</div>
                                            <button onClick={()=>onBedCountIncrement(i['name'])} className='no-border no-background cursor-pointer'>
                                                <LucidIcon name='plus' size={24}/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }                            
                        </div>
                        {/* <button className='flex gap-8px flex-align-center mr-top-16px no-background border-btm-500'> 
                            <LucidIcon name='plus' size={24}/> 
                            add more option
                        </button> */}
                    </div>

                    <div className='mr-top-40px'>
                        <h2 className='clr-neutral-600 fs-600 radius-8 fs-600 fw-regular-dark'>Total Guest</h2>
                        <div className='box-shadow-300 mr-top-16px p-top-8px p-btm-8px'>
                            {
                                guestCount
                                    .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                                    .map(i=>(
                                    <div key={i['id']} className='flex align-center space-between p-10px-24px position-relative item-underline'>
                                        <div>{i['type']}</div>
                                        <div className='flex'>
                                            <button onClick={()=>onGuestCountDecrement(i['type'])} className='no-border no-background cursor-pointer'>
                                                <LucidIcon name='minus' size={24}/>
                                            </button>
                                            <div className='fs-650 w-84px txt-align-center'>{i['count']}</div>
                                            <button onClick={()=>onGuestCountIncrement(i['type'])} className='no-border no-background cursor-pointer'>
                                                <LucidIcon className='opacity-0_70' name='plus' size={24}/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }                            
                        </div>
                    </div>
                </div>


            </div>
            
            <SwitchBtn nextPage={onContinueBtnClick} previousPage={previousPage}/>
        </div>
    </div>
  )
}
