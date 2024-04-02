"use client"
import { useEffect, useState } from 'react';
import styles from './index.module.css'
import Month from './Month';
import debounce from '@/components/Utility/debounce';
import nextDay from '@/components/Utility/nextDay';
import previousDay from '@/components/Utility/previousDay';



const Calender = ({ data, dispatch, reducerType, showCalender, calenderRef}) => {
const date = new Date()
const currYear = date.getFullYear()
const nextYear = currYear + 1
const currMonth = date.getMonth()
const nextMonth = (currMonth + 1) % 12
const today = date.getDate()

const SelectDateHandlar = debounce((clickedDate)=>{
  if(data.length === 0){
    dispatch({type: reducerType, data:[clickedDate]})
  }
  else if( data.length === 1){
    if(data[0]===clickedDate){
      dispatch({type: reducerType, data:[]})
    }else if(data[0]<clickedDate){
      dispatch({type: reducerType, data:[data[0], clickedDate]})
    }else if(data[0]>clickedDate){
      dispatch({type: reducerType, data:[clickedDate, data[0]]})
    }
  }
  else if( data.length === 2){
    if(data[0] === clickedDate){
      const nextDayIntValue = nextDay(data[0])
      if(nextDayIntValue === data[1]){

        dispatch({type: reducerType, data:[data[1]]})
      }else if(nextDayIntValue < data[1]) {
        dispatch({type: reducerType, data:[nextDayIntValue, data[1]]})
      }
    }
    else if(data[1] === clickedDate){
      const previousDayIntValue = previousDay(data[1])
      if(previousDayIntValue === data[0]){

        dispatch({type: reducerType, data:[data[0]]})
      }else if( data[0] < previousDayIntValue) {

        dispatch({type: reducerType, data:[data[0], previousDayIntValue]})
      }
    }
    else if(clickedDate < data[0] 
        || data[1] < clickedDate){

      dispatch({type: reducerType, data:[clickedDate]})

    }
    else if(data[0] < clickedDate 
        &&  clickedDate < data[1]){
       if((clickedDate - data[0]) < (data[1] - clickedDate)){
        dispatch({type: reducerType, data: data[1]})
       }
       else{

        dispatch({type: reducerType, data: [data[0], clickedDate]})
       }

    }
  }
}) 


  return (
    <div ref={calenderRef} className={`${styles.calender} z-index-12 bg-neutral-000 ${showCalender ? 'display-block' : 'display-none'}`}>
        <div className={`${styles.calender_container} `}>
            <div className={`${styles.calender_title} `}>
                <h2 >Select Date</h2>
            </div>

            <div className={`${styles.months}`}>
              <Month 
                SelectDate = {SelectDateHandlar}
                data = {data}
                today = {today}
                month = {currMonth}
                year = {currYear} />

              <Month 
                SelectDate = {SelectDateHandlar}
                data = {data}
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
