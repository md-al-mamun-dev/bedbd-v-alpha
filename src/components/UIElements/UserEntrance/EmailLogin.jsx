'use client'
import { useEffect, useState } from 'react'
import styles from './login.module.css'
import Image from 'next/image'

import appwriteService from '@/service/config'
// import useAuth from '@/context/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import checkEmail from '@/components/Utility/checkEmail'
import checkPassword from '@/components/Utility/checkPassword'
import LucidIcon from '@/components/LucidIcon'
// appwrite
import { account } from '@/service/config'
import { ID } from 'appwrite'
import OAuthAccess from './OAuthAccess'
import accountService from '@/service/AccountService'
import useAccountDispatch from '@/context/account/useAccountDispatch'


const EmailLogin = ({closeBtnClick, formType, changeFormTo}) => {

  const [formData, setFormData] =  useState({ email:'',
                                              password:'',
                                              confirmPassword:''})
  const [err, setErr] = useState([])

  const dispatch = useAccountDispatch()



// SignUp Code
// const router = useRouter(); 

// const [formData, setFormData] = useState({  email:'',
//                                             passwor:'',
//                                             name:'' })
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
function handleInputChange(inputValue, fieldName) {
  // const inputvalue = e.target.value

  if(fieldName === 'email' ){          
    const emailErrorArr = checkEmail(inputValue)
    const otherErrors = err.filter(item => item.errName !== 'email')  
    emailErrorArr.length>0
      ? setErr([...otherErrors, { errName: 'email', errList: emailErrorArr }])
      : setErr([...otherErrors])
    }

  if(fieldName === 'password' ){
    const passwordErrArr = checkPassword(inputValue)
    const otherErrors = err.filter(item => item.errName !== 'password')
    passwordErrArr.length>0
      ? setErr([...otherErrors, { errName: 'password', errList: passwordErrArr }])
      : setErr([...otherErrors])
  }
  
  setFormData({...formData, [fieldName]:inputValue })
}



// async function login(e) {
//   e.preventDefault()
//   try {
//     const session = await appwriteService.login(formData);
//     if(session){
//       setAuthStatus(true)
//       router.push('/profile')
//     }
//   } catch (err) {
//     setError(err.message)
//   }
// }










// temoprary shut off this code, it will implement leter
// 
// const handleInputPhoneNumberChange = (event) => {
  // Allow only digits and limit the input to 11 digits
  // const newValue = event.target.value.replace(/\D/, '').slice(0, 11);
  // setPhoneNumberValue(newValue);
// };

const continueBtnClickHandlar = async (e)=>{

  e.preventDefault()
  console.log(formData['email'].length > 0)
  console.log(formData['password'].length > 0)

  if(                  err.length === 0
    &&     formData['email'].length > 0
    &&  formData['password'].length > 0) {
    
    console.log('no error')
    const session  = await accountService.login(formData['email'], formData['password'])

    if(session){
      dispatch({ type:'login', data: session })
    }
    // if(result.resultType === 'error'){
    //   // handle error message 
    //   console.log(result)
    // }else{
    //   console.log(JSON.stringify(result))
    // }    
  } else
      console.log(err)

}



// text code
// useEffect(()=>{
//   console.log(selectedCountryCode)
//   console.log(selectedCountryCodeValue)
// }, [selectedCountryCode, selectedCountryCodeValue])


// const phoneInputForm = <div className={`${styles.phone_input} border-secondary-100 w-100 h-900 radius-450 flex relative z-index-2`}>
//                           <div className={`${styles.country_code} flex flex-col p-l-30 p-t-150 w-36percent max-w-195px p-btm-14 relative no-txt-select input-right-vr-line`}>
//                             <label className='h-16px fs-100 fw-regular-dark clr-neutral-300'>Country</label>
//                             <div className={`${styles.select_country_code} fs-200 fw-semi-bold clr-neutral-500`} onClick={toggleCountryCodeOption}>                    
//                               <div className="custom-select" id="customSelect" >
//                                 {selectedCountryCode === '' || countryCodeOptionOpened ? 'Select Code' : selectedCountryCode}
//                               </div>
//                               <div 
//                                 className={`bg-neutral-000 absolute left-25 w-170px top-57px box-shadow-0_04 max-h-500 overflow-y-auto ${styles.country_code_options} ${countryCodeOptionOpened ? 'display-block' : 'display-none'  }  `} 
//                                 id="phone_code"
//                                 onClick={selectCountryCodeOption}>
//                                 <option className='p-7-30 cursor-pointer bg-hover-neutral-050' value="+880">{`BD +880`}</option>
//                                 <option value="+2">{`BD +881`}</option>
//                                 <option value="+3">{`BD +882`}</option>
//                                 <option value="+4">{`BD +883`}</option>
//                                 <option className='p-7-30 cursor-pointer bg-hover-neutral-050' value="+880">{`BD +880`}</option>
//                                 <option value="+2">{`BD +881`}</option>
//                               </div>


//                               <button className={`${styles.dropdown_btn}`}>
//                               {
//                                 countryCodeOptionOpened 
//                                   ? <LucidIcon className='bg-transparent no-border no-outline height-425 absolute-v-center right-16px clr-neutral-620' name='chevron-up'/>
//                                   : <LucidIcon className='bg-transparent no-border no-outline height-425 absolute-v-center right-16px clr-neutral-620' name='chevron-down'/>
//                               }
//                               </button>
//                             </div>                  
//                           </div>

//                           <div className={`${styles.contact_number} w-64percent max-w-342 h-100 flex flex-col justify-center p-14-24`}>
//                             <label className='h-16px fs-100 fw-regular-dark clr-neutral-300'>Phone Number</label>

//                             <input className='no-border no-outline fs-200 fw-semi-bold clr-neutral-500 ' placeholder='Enter Your Number' type='number'  maxlength="100" onChange={handleInputPhoneNumberChange} value={phoneNumberValue} />
//                           </div>                          
//                         </div>

  return (
      <div className={`absolute-center h-100 w-100 max-w-750 h-fit-content p-72-105 box-shadow-overlay bg-neutral-000 radius-100  ${styles.entrance_box}`}>
        <div className={`${styles.container} h-100 w-100`}>

          <div className={`${styles.title_bar} w-100 flex space-between relative p-r-2  mr-btm-1000 horizontal-line-btm`}>
                <h3 className={`${styles.title_txt} fs-500 fw-bold p-l-2`} >Login</h3>
                <LucidIcon onClick={()=>closeBtnClick()} className={`${styles.close_icon} p-r-2 cursor-pointer`} color="#000" name='x'/>
          </div>

          <div className={`${styles.phone_input} flex gap-14  w-100 h-900 radius-450 flex relative z-index-2`}>             
              <div className={`${styles.contact_number} border-secondary-100 radius-450 h-900 w-100 flex flex-col justify-center p-14-24`}>
                <label className='h-16px fs-100 fw-regular-dark clr-neutral-300'>Type your Email</label>
                <input className='no-border no-outline fs-200 fw-semi-bold clr-neutral-500 ' placeholder='Enter Your Email' type='email'  maxlength="100" onChange={e=>handleInputChange(e.target.value, 'email')} value={formData['email']} />
              </div>

              <div className={`${styles.contact_number} border-secondary-100 radius-450 h-900 w-100 flex flex-col justify-center p-14-24`}>
                <label className='h-16px fs-100 fw-regular-dark clr-neutral-300'>Password</label>

                <input className='no-border no-outline fs-200 fw-semi-bold clr-neutral-500 ' placeholder='Enter Your password' type='password'  maxlength="100" onChange={e=>handleInputChange(e.target.value, 'password')} value={formData['password']} />
              </div>
          </div>

          <h4 className={`fs-100 fw-regular-dark clr-neutral-400 w-100 txt-center mr-top-20px`}>
              Don't have an account?&nbsp;
              <button 
                onClick={()=>changeFormTo('email-signup')}
                className='clr-primary-400 no-border no-background cursor-pointer'> Create new account. </button> it's free forever.
          </h4>

          <div className='inline-flex gap-24 mr-t-24'>
            <button className='btn-primary p-12-60' onClick={continueBtnClickHandlar}>Continue</button>
            <button className='clr-neutral-500 fs-300 fw-semi-bold no-border no-background flex flex-align-center gap-10 cursor-pointer'
              onClick={()=>changeFormTo( formType === 'email-login' ? 'phone-login':'phone-signup' )} >              
                <LucidIcon className='clr-neutral-500' size={24} name='phone'/> Continue With Phone              
            </button>
          </div>
          <OAuthAccess/>
        </div>
      </div>
    
  )
}

export default EmailLogin