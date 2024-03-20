'use client'
import SwitchBtn from '../SwitchBtn'
import styles from './index.module.css'
import Image from 'next/image'
// import SwitchBtn from '../SwitchBtn'
// import SwitchBtn from '../SwitchBtn'
// import LucidIcon from '@/components/LucidIcon'
import { Minus, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'

const SetRent = ({data, nextPage, previousPage}) => {
  console.log(data)
const [currencySymbol, setCurrencySymbol] = useState('$')
const [rent, setRent] = useState(21)
const [minRent, setMinRent] = useState(3)

const [serviceFee, setServiceFee] = useState(2)
const [tax, setTax] = useState(1)

const dispatch = usePropertyDispatch()




// seperate currency symbol from text value of input field and set rent as intiger value 
const onRentValueChange = (e)=>{
  const inputValue = e.target.value
  const currencySymbolRegex = /^[^\d.,]+/;
  const textWithoutCurrencySymbol = inputValue.replace(currencySymbolRegex, '').trim();
  textWithoutCurrencySymbol === ''
    ? setRent(minRent)
    : setRent(parseInt(textWithoutCurrencySymbol))  
}

const incrementRent = ()=>{
  setRent(rent+1)
}
const decrementRent = ()=>{
  minRent < rent
    ? setRent(rent-1)
    : setRent(minRent)
}

// set input field width accroding to value digit number
const [inputFieldSize, setInputFieldSize] = useState(2)
useEffect(() => {
  const rentDigit = Math.abs(rent).toString().length;
  if (rentDigit<3) setInputFieldSize(2)
  else if (rentDigit<5) setInputFieldSize(rentDigit)
  else setInputFieldSize(4)
}, [rent]);


function onContinueBtnClick() {
  dispatch({type:'property/rentInfo', data:{
    rent:rent,
    tax:tax,
    serviceFee:serviceFee,
    currency:currencySymbol
  }})
  nextPage()

  console.log(data)
}





  return (
    <div className={`contents absolute left-50 translateX-50 translateX-50 ${styles.rent_content}`}>
        <h3 className={`text-select-none ${styles.heading}`}>Set Price</h3>

        <h4 className={`text-select-none ${styles.pricing_q}`}>How much do you want to charge per night?</h4>
        <h5 className={`text-select-none ${styles.assurance_txt}`}>No worries! You can change it anytime you want.</h5>

        <div className={`${styles.rent_box}`}>
          <button onClick={decrementRent}>
            <Minus className={`${styles.icon_minus} `} size={32}/>
            {/* <LucidIcon name={'minus'} className={`${styles.icon_minus} `} size={32} /> */}
          </button>
          <input type='text' className={`${styles.rent_input} clr-secondary-400`} size={inputFieldSize} value={currencySymbol + rent} onChange={onRentValueChange} />

          <button onClick={incrementRent}>
            <Plus className={`${styles.icon_plus} `} size={32} />
            {/* <LucidIcon name={'plus'} className={`${styles.icon_plus} `} size={32} /> */}
          </button>

        </div>

        <div className={`text-select-none ${styles.pricing_details} clr-neutral-500`}>

          <div className={`${styles._wrapper}`}>
            <div className={`${styles.pricing_item}`}>
              <div className={`${styles.price_name}`}>
                Ground Price
              </div>

              <div className={`${styles.value}`}>
                {currencySymbol + rent} 
              </div>
            </div>
          </div>
          
          <div className={`${styles._wrapper}`}>
            <div className={`${styles.pricing_item} `}>
              <div className={`${styles.price_name} `}>
              Service Fee
              </div>

              <div className={`${styles.value} `}>
                {currencySymbol + serviceFee} 
              </div>
            </div>
          </div>

          <div className={`${styles._wrapper}`}>
            <div className={`${styles.pricing_item} `}>
              <div className={`${styles.price_name} `}>
              Taxes
              </div>

              <div className={`${styles.value} `}>
                {currencySymbol + tax} 
              </div>
            </div>
          </div>

          <div className={`${styles._wrapper}`}>
            <div className={`${styles.pricing_item} clr-secondary-400 fw-regular-dark`}>
              <div className={`${styles.price_name} `}>
                You will earn
              </div>

              <div className={`${styles.value}`}>
                {currencySymbol + rent} 
              </div>
            </div>
          </div>

        </div>

        <p className={`text-select-none ${styles.suggestion_txt}`}>
          Check your nearest property price to make more competitive. It will increase your changes of getting more booking
        </p>

        
        <SwitchBtn previousPage={previousPage} nextPage={onContinueBtnClick}/>
    </div>
  )
}

export default SetRent