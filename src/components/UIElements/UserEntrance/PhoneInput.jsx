'use client'
import { useState } from 'react'
import styles from './login.module.css'

import appwriteService from '@/service/config'
// import useAuth from '@/context/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import checkPasswordErr from '@/components/Utility/checkPassword'

import LucidIcon from '@/components/LucidIcon'
import OAuthAccess from './OAuthAccess'
import ConfirmationCode from './ConfirmationCode'
import hasCountryCode from '@/components/Utility/hasCountryCode'
import isValidPhoneNumber from '@/components/Utility/isValidPhoneNumber'
import accountService from '@/service/AccountService'




// appwrite
// import { account } from '@/service/config'
// import { ID } from 'appwrite'


const PhoneInput = ({closeBtnClick, formType, changeFormTo}) => {

  const [userId, setUserId] = useState(null)

  const [countryCodeOptionOpened, setCountryCodeOptionOpened] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode]  = useState('')
  const [selectedCountryCodeValue, setSelectedCountryCodeValue]  = useState('')
  const toggleCountryCodeOption = ()=> setCountryCodeOptionOpened(!countryCodeOptionOpened)
const [phoneNumberValue, setPhoneNumberValue] = useState('');



function closeAll(params) {
  setUserId(null)
  closeBtnClick()
}

//   const [formData, setFormData] =  useState({ email:'',
//                                               password:''})
//   const [err, setErr] = useState([])

// function handleInputChange(e, fieldName) {
//         const inputvalue = e.target.value
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         if(fieldName === 'email'){
//         const otherErrors = err.filter(item => item.errName !== 'email' )

//         emailRegex.test(inputvalue)
//         ? setErr([...otherErrors])
//         : setErr([...otherErrors, {errName: 'email', msg: "email is invalid" }])
//         }
//         if(fieldName === 'password' ){
//         const passwordErrArr = checkPasswordErr(inputvalue)
//         const otherErrors = err.filter(item => item.errName !== 'password')

//         passwordErrArr.length>0
//           ? setErr([...otherErrors, { errName: 'password', errList: passwordErrArr }])
//           : setErr([...otherErrors])
//         }
//         setFormData({...formData, [fieldName]:inputvalue })
//   }










// SignUp Code
// const router = useRouter(); 


// const [error, setError] = useState('')
// const {setAuthStatus} = useAuth()
// const create = async (e)=>{
//   e.preventDefault()
//   try {
//     const userData = await appwriteService.createUserAccout(formData)
//     if(userData){
//       setAuthStatus(true)
//       router.push('/')
//     }
//   } catch (err) {
//     setError(err['message'])
//   }
// }



// Login Code 

// const router = useRouter()
// const [formData, setFormData] = useState({  email:'',
//                                             passwor:'',
//                                             name:'' })
// const [error, setError] = useState('')


async function login(e) {
  e.preventDefault()
  try {
    const session = await appwriteService.login(formData);
    if(session){
      setAuthStatus(true)
      router.push('/profile')
    }
  } catch (err) {
    setError(err.message)
  }
}


const selectCountryCodeOption = (e)=> {
  setSelectedCountryCodeValue(e.target.value)
  setSelectedCountryCode(e.target.text)
}

// temoprary shut off this code, it will implement leter
// 
// const handleInputPhoneNumberChange = (event) => {
  // Allow only digits and limit the input to 11 digits
  // const newValue = event.target.value.replace(/\D/, '').slice(0, 11);
  // setPhoneNumberValue(newValue);
  // };

  // const countrycodeRegex = /^\+\d{1,4}\s?/;
  // if(countrycodeRegex.test(inputPhoneNumberValue)){

  // }


const handleInputPhoneNumberChange =(e)=>{
  const inputPhoneNumber = e.target.value
  console.log(e.target.value)
  // var regex = /^(\+\d{1,4}\s?)?(\(\d{1,}\)|\d{1,})[ -]?\d{1,}([ -]?\d{1,}){1,}$/;
  var regex = /^[0-9+()-\s]*$/
  if(regex.test(inputPhoneNumber))
    setPhoneNumberValue(inputPhoneNumber)
}


const continueBtnClickHandlar = (e)=>{


  async function handleLogin(input) {
    const userData = await accountService.login(input)
    if(userData)
      setUserId(userData['userId'])
  }
  // let phoneNumber='';

  const isCountryCodeSelected = selectedCountryCodeValue.length>0

  const phoneNumberHasCountryCode =  /^(00|\+)\d{1,4}/.test(phoneNumberValue)

  if(phoneNumberValue.length<1){
    // show notification
    console.log('pls provide phone number')
  }else if(!phoneNumberHasCountryCode && !isCountryCodeSelected){
    // show notification
    console.log('please select your country code')
  }else if(isCountryCodeSelected && !phoneNumberHasCountryCode){

    const phoneNumber = phoneNumberValue.startsWith('0') 
                    ? selectedCountryCodeValue + phoneNumberValue.substring(1)
                    : selectedCountryCodeValue + phoneNumberValue

    handleLogin(phoneNumber)
  }else if(!isCountryCodeSelected && phoneNumberHasCountryCode){
    handleLogin(phoneNumberValue)
  }
}


  // logout function 
  // const logoutResult = await account.deleteSession('current')
  // if(logoutResult){
  //   console.log(logoutResult)
  // }

  return (

    <>
      <div className={`absolute-center h-100 w-100 max-w-750 h-fit-content p-72-105 box-shadow-overlay bg-neutral-000 radius-100  ${styles.entrance_box}`}>
        <div className={`${styles.container} h-100 w-100`}>

          <div className={`${styles.title_bar} w-100 flex space-between relative p-r-2  mr-btm-1000 horizontal-line-btm`}>
                <h3 className={`${styles.title_txt} fs-500 fw-bold p-l-2`} >Login or Signup</h3>
                <LucidIcon onClick={()=>closeBtnClick()} className={`${styles.close_icon} p-r-2 cursor-pointer`} color="#000" name='x'/>
          </div>

          <div className={`${styles.phone_input} border-secondary-100 w-100 h-900 radius-450 flex relative z-index-2`}>
            <div className={`${styles.country_code} flex flex-col p-l-30 p-t-150 w-36percent max-w-195px p-btm-14 relative no-txt-select input-right-vr-line`}>
              <label className='h-16px fs-100 fw-regular-dark clr-neutral-300'>Country</label>
              <div className={`${styles.select_country_code} fs-200 fw-semi-bold clr-neutral-500`} onClick={toggleCountryCodeOption}>                    
                
                <div className="custom-select" id="customSelect" >
                  {selectedCountryCode === '' || countryCodeOptionOpened ? 'Select Code' : selectedCountryCode}
                </div>
                
                <div 
                   className={` bg-neutral-000 absolute left-25 w-170px top-57px box-shadow-0_04 max-h-500 overflow-y-auto ${styles.country_code_options} ${countryCodeOptionOpened ? 'display-block' : 'display-none'  }  `} 
                   id="phone_code"
                   onClick={selectCountryCodeOption}>
                  <option className='p-7-30 cursor-pointer bg-hover-neutral-050' value="+880">{`BD +880`}</option>
                  <option className='p-7-30 cursor-pointer bg-hover-neutral-050' value="+880">{`BD +881`}</option>
                  <option className='p-7-30 cursor-pointer bg-hover-neutral-050' value="+880">{`BD +882`}</option>
                  <option className='p-7-30 cursor-pointer bg-hover-neutral-050' value="+880">{`BD +883`}</option>
                  <option className='p-7-30 cursor-pointer bg-hover-neutral-050' value="+880">{`BD +880`}</option>
                  <option className='p-7-30 cursor-pointer bg-hover-neutral-050' value="+2">{`BD +881`}</option>
                </div>

                <button className={`${styles.dropdown_btn}`}>
                {
                  countryCodeOptionOpened 
                    ? <LucidIcon className='bg-transparent no-border no-outline height-425 absolute-v-center right-16px clr-neutral-620' name='chevron-up'/>
                    : <LucidIcon className='bg-transparent no-border no-outline height-425 absolute-v-center right-16px clr-neutral-620' name='chevron-down'/>
                }
                </button>                
              </div>                  
            </div>

            <div className={`${styles.contact_number} w-64percent max-w-342 h-100 flex flex-col justify-center p-14-24`}>
              <label className='h-16px fs-100 fw-regular-dark clr-neutral-300'>Phone Number</label>

              <input 
                className='no-border no-outline fs-200 fw-semi-bold clr-neutral-500 ' 
                placeholder='Enter Your Number' 
                type='text'  
                maxlength="15" 
                onChange={handleInputPhoneNumberChange} value={phoneNumberValue} />
            </div>                          
          </div>

          <h4 className={`fs-100 fw-regular-dark clr-neutral-400 w-100 txt-center mr-top-20px`}>
            We’ll call or text you to confirm your number. Standard message and data rates apply.
          </h4>          

          <div className='inline-flex gap-24 mr-t-24'>
            <button className={`btn-primary p-12-60`} onClick={continueBtnClickHandlar}>Continue</button>
            <button className={` clr-neutral-500 fs-300 fw-semi-bold no-border no-background flex flex-align-center gap-10 cursor-pointer`} onClick={()=>changeFormTo( 'email-login')} >
            <LucidIcon className='clr-neutral-500' size={24} name='mail'/> Continue With Email              
            </button>
          </div>
              <OAuthAccess/>
        </div>
      </div>

      {userId && <ConfirmationCode userId={userId} close={closeAll} />} 
    </>
      
    
  )
}

export default PhoneInput