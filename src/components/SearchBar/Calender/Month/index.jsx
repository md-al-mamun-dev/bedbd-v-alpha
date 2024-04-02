"use client"
import styles from './index.module.css'
import dateToInteger from '@/components/Utility/dateToInteger';

const Month = ({month, year, today, SelectDate, data }) => {
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



const generateDateStateClass = (dayIntVal)=>{
const selectedLastDateIndex = (data.length-1)

  if(data.length > 0){
    if(data.indexOf(dayIntVal) === 0){
      if(data.length === 1){
        return 'only-booked'
      }else{
        return 'start-date'
      }
    }else if(data.indexOf(dayIntVal) === 1){
      return 'end-date'
    } else if(     data.length === 2
                && dayIntVal > data[0] 
                && dayIntVal < data[selectedLastDateIndex]){
      return 'mid-date'          
    }else{
      return 'not-selected'
    }
  }
   return 'not-selected'
}


let days = []

let firstDayofMonth = new Date(year, month, 1).getDay()

if (firstDayofMonth>0) {
  // let lastDateofPreviousMonth = new Date(year, month , 0).getDate()
  for (let i = 0; i < firstDayofMonth; i++) {
    // days.push(<div className={`${styles.inactive}`}> {lastDateofPreviousMonth  -  (firstDayofMonth- (i+1))} </div>)
    days.push(<div className={`${styles.inactive}`}> </div>)
  }
}
let lastDateofMonth = new Date(year, month + 1, 0).getDate()
for (let i = 0; i < lastDateofMonth; i++) {
{
  if(!today){
    const dateIntegerValue = dateToInteger(month, (i+1), year)
    const dateState = generateDateStateClass(dateIntegerValue)
    days.push(<div className={`${styles.active} ${dateState}  ${dateState !== 'not-selected'? styles.selectedDate :'' }`} 
    onClick={()=>SelectDate(dateIntegerValue)}> {i + 1} </div>)
  }else{
    if ( (i+1) < today){
      days.push(<div className={`${styles.inactive}`}> {i + 1} </div>)

    }else if((i+1) === today){
      const dateIntegerValue = dateToInteger(month, (i+1), year)      
      const dateState = generateDateStateClass(dateIntegerValue)
      days.push(<div className={`${styles.today} ${dateState} ${dateState !== 'not-selected'? styles.selectedDate :'' }`} 
      onClick={()=>SelectDate(dateIntegerValue)}> {i + 1} </div>)

    }else{
      const dateIntegerValue = dateToInteger(month, (i+1), year)
      const dateState = generateDateStateClass(dateIntegerValue)
      days.push(<div className={`${styles.active} ${dateState} ${dateState !== 'not-selected'? styles.selectedDate :'' }`} 
      onClick={()=>SelectDate(dateIntegerValue)}> {i + 1} </div>)
    }
  }  
}



}
let lastDayofMonth = new Date(year, month, lastDateofMonth).getDay()
if(lastDayofMonth < 6){
  for (let i = 0; i < 6 - lastDayofMonth; i++) {
    days.push(<div className={`${styles.inactive}`} >  </div>)
    // days.push(<div className={`${styles.inactive}`}> {i + 1} </div>)

  }
}

  return (
          <div className={`${styles.month}`}>
            <div className={`${styles.month_title}`} >{months[month]}  {year}</div>
            <div  className={`weeks ${styles.week_name}`} >
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>

            <div className={`weeks ${styles.days_name}`}>
              {days.map(e=>e)}
            </div>
          </div>
  )
}

export default Month
