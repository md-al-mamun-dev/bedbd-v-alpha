"use client"
import { useEffect, useState } from 'react';
import styles from './index.module.css'
import Month from './Month';
import debounce from '@/components/Utility/debounce';
import nextDay from '@/components/Utility/nextDay';
import previousDay from '@/components/Utility/previousDay';



const Calender = ({bookingDate,  setBookingDate, showCalender, calenderRef}) => {
// const [showCalender, setShowCalender] = useState(false)
const date = new Date()
const currYear = date.getFullYear()
const nextYear = currYear + 1
const currMonth = date.getMonth()
const nextMonth = (currMonth + 1) % 12
const today = date.getDate()

const SelectDateHandlar = debounce((clickedDate)=>{
  if(bookingDate.length === 0){
    setBookingDate([clickedDate])
  }
  else if( bookingDate.length === 1){
    if(bookingDate[0]===clickedDate){
      setBookingDate([])
    }else if(bookingDate[0]<clickedDate){
      setBookingDate([bookingDate[0], clickedDate])
    }else if(bookingDate[0]>clickedDate){
      setBookingDate([clickedDate, bookingDate[0]])
    }
  }
  else if( bookingDate.length === 2){
    if(bookingDate[0] === clickedDate){
      const nextDayIntValue = nextDay(bookingDate[0])
      if(nextDayIntValue === bookingDate[1]){
        setBookingDate([bookingDate[1]])
      }else if(nextDayIntValue < bookingDate[1]) {
        setBookingDate([nextDayIntValue, bookingDate[1]])
      }
    }
    else if(bookingDate[1] === clickedDate){
      const previousDayIntValue = previousDay(bookingDate[1])
      if(previousDayIntValue === bookingDate[0]){
        setBookingDate([bookingDate[0]])
      }else if( bookingDate[0] < previousDayIntValue) {
        setBookingDate([bookingDate[0], previousDayIntValue])
      }
    }
    else if(clickedDate < bookingDate[0] 
        || bookingDate[1] < clickedDate){
      setBookingDate([clickedDate])
    }
    else if(bookingDate[0] < clickedDate 
        &&  clickedDate < bookingDate[1]){
       if((clickedDate - bookingDate[0]) < (bookingDate[1] - clickedDate)){
        setBookingDate([clickedDate, bookingDate[1]])
       }
       else{
        setBookingDate([bookingDate[0], clickedDate])
       }

    }
  }
}) 


  return (
    <div ref={calenderRef} className={`${styles.calender} z-index-5 ${showCalender ? 'display-block' : 'display-none'}`}>
        <div className={`${styles.calender_container} `}>
            <div className={`${styles.calender_title} `}>
                <h2 >Select Date</h2>
            </div>

            <div className={`${styles.months}`}>
              <Month 
                SelectDate = {SelectDateHandlar}
                bookingDate = {bookingDate}
                today = {today}
                month = {currMonth}
                year = {currYear} />

              <Month 
                SelectDate = {SelectDateHandlar}
                bookingDate = {bookingDate}
                month = {nextMonth}
                year = {(currMonth === 11)
                          ? nextYear
                          : currYear } />
            </div>

            <div >

            </div>
        </div>
    </div>
  )
}

export default Calender
