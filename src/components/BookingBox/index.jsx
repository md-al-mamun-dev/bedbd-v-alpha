'use client'
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import Calender from '../UIElements/Calender'
import ReservationBtn from './ReservationBtn'




const BookingBox = ({data, isAvailable}) => {


  // useEffect(()=>{
  //   const dateInputHtmlElements = document.getElementsByClassName("date_input");
  //   const dateInputs = Array.from(dateInputHtmlElements);
  //   console.log(dateInputHtmlElements)
  //   console.log(Array.isArray(dateInputs))
  //   dateInputs.forEach((dataInput, index )=> {
  //     dataInput.addEventListener('focus', function() {
  //       this.setAttribute('placeholder', 'Add dates');
  //     });
  //   });
  // }, [])

  const [nightCount, setNightCount] =  useState(2)
  // currency
  return (
  <div className={`${styles.booking_box}`}>
    <div className={`${styles.booking_title} `}>
      <div className={`${styles.price}`}>{data['currency']  + data['price']}</div>  
      <div  className={`capitalize ${styles.unit}`}> &nbsp;  {' /' + data['unit']  + ' '} &nbsp; </div>
      {
        isAvailable
          ? <div className={`txt-success ${styles.availability_txt}`}>{' (Available)'}</div>
          : <div className={`txt-error ${styles.availability_txt}`}>{' (Not Available)'}</div>
      }
      {/* <div>{' ' + availability['isAvaliable'] ? '(Available)' : '(Not Available)' }</div> */}
    </div>
  <div className={`${styles.container}`}>
    <div className={`${styles.input_box}`}>
      <div className={`${styles.check_in}`}>
        <label>Check In</label>
        <input readOnly={true} type="text" className={`date_input ${styles._date_input}`} placeholder='Add Dates'/>
      </div>

      <div className={`${styles.check_out}`}>
        <label>Check Out</label>
        <input readOnly={true} type="text" className={` date_input ${styles._date_input}`}  placeholder='Add Dates'/>
      </div>

      <div className={`${styles.guest_count}`}>
        <label>Guest</label>
        <input readOnly={true} placeholder='select guest'/>
      </div>

      {/* <Calender 
        bookingDate = {bookingDate} 
        setBookingDate={setBookingDate} 
        showCalender={showCalender}  
        calenderRef={calenderRef} /> */}
    </div>


    <div className={`${styles.price_calculation_details}`}>
      <div className={`${styles.row}`}>
        <div> 
          { data['price'] + ' ' + 'x' + ' ' + nightCount + ' ' + 'nights'}
        </div>
        <div >
          {data['currency'] + (data['price'] * nightCount) }
        </div>    
      </div>

      <div className={`${styles.row}`}>
        <div>Service Fee</div> <div > { data['currency'] + data['servicesFee']}  </div>    
      </div>

      <div className={`${styles.row}`}>
        <div>Bedbd Fee</div> <div > { data['currency'] + data['bedbdFee']}  </div>    
      </div>

      <div className={`${styles.row}`}>
        <div>Total</div> 
        <div > { data['currency'] + ((data['price'] * nightCount) + data['servicesFee'] +  data['bedbdFee'] ) }  </div>    
      </div>
    </div>

    <ReservationBtn/>
  </div>

</div>)
}

export default BookingBox