'use client'
import { useState } from 'react'
import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'
import SwitchBtn from '../SwitchBtn'
import BookingType from './BookingType'
import AddBookingType from './AddBookingType'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import usePropertyBookingType from '@/hooks/usePropertyBookingTypes'
import Heading from '../Heading'

export default function SelectBookingType({data, previousPage, nextPage}) {
    const [addBookingTypModalOpen, setAddBookingTypModalOpen] = useState(false)
    const dispatch = usePropertyDispatch()
    const { isLoading } = usePropertyBookingType()
    const { bookingTypes, selectedBookingType } = data


    // const [bookingTypes, setBookingTypes] = useState([{ id:0,
    //                                                     title:'Entire place',
    //                                                     description:'Guests have access to the entire place and don’t have to share it with the host or other guests.'
    //                                                 },{ id:1,
    //                                                     title:'A private room',
    //                                                     description:'Guests can book a room within the property. There are common areas that are shared with either the host or other guests.' }])
                                                        
    // const [selectedTypes, setSelectedTypes] = useState([])                                                        

    // function addBookingType(title, description) {
    //     const maxId = Math.max(...bookingTypes.map(item => item.id));
    //     setSelectedTypes([...selectedTypes, title])
    //     setBookingTypes([...bookingTypes, {id:(maxId+1), title, description}])
    // }
    
    function toggleSelectedBookingType(id) {
        selectedBookingType.includes(id)
            ? dispatch({type:'property/removeSelectedBookingType', data: id})
            : dispatch({type:'property/addSelectedBookingType', data: id})
    }

    function onContinueBtnClick() {
        nextPage()
    }


  return (
    <>
        <div className='w-100 absolute-center max-width-1280 '>
            <Heading txt='Booking Type'/>
            
            {/* <h3 className={`${styles.heading}`}>Booking Type</h3> */}

            <div className={`${styles.scope_input} mr-l-auto mr-r-auto`}>
                <h3 className={`${styles.scope_info_question}`}>What can guests book?</h3>

                <div className={`${styles.socps}`}>
                    {
                        bookingTypes.map(i=><BookingType data={i} isChecked={selectedBookingType.includes(i['id'])} toggleSelection={()=>toggleSelectedBookingType(i['id'])}/>)
                    }
                </div>

                <button className={`clr-neutral-500 flex flex-align-center border-btm-500 bg-transparent cursor-pointer gap-8px fs-400 fw-regular mr-top-14px mr-btm-40px position-relative`} onClick={()=>setAddBookingTypModalOpen(true)}> 
                    <LucidIcon name={'plus'} className={` opacity-0_70 `} size={24} />
                    {/* left-16px position-absolute top-50 translateY-50 */}
                    Add more option
                </button>

                <SwitchBtn previousPage={previousPage} nextPage={onContinueBtnClick}/>
            </div>
        </div>

        { addBookingTypModalOpen && <AddBookingType data={bookingTypes} closeModal={()=>setAddBookingTypModalOpen(false)} />}
    </>    
  )
}

