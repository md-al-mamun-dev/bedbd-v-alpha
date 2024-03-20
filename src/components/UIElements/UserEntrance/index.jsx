'use client'
import PhoneInput from "./PhoneInput"
import EmailLogin from "./EmailLogin"
import ConfirmationCode from "./ConfirmationCode"
import SignUp from "./EmailSignup"
import { useState } from "react"


export default function UserEntrance({ closeBtnClick}) {



  // states 
  // phone-login
  // email-login
  // phone-signup
  // email-signup

  const [formType, setFormType] = useState('phone-login')
  return (
    <div className={`position-fixed w-100 h-100 z-3 bg-neutral-1000-a_25 top-0 blur-3 `}>
      
      { (formType === 'phone-login' || formType === 'phone-signup' )
        && <PhoneInput  
              closeBtnClick={closeBtnClick} 
              formType={formType}
              changeFormTo={setFormType}/>}

      {/* { (formType === 'phone-signup' )
        && <PhoneInput  
              closeBtnClick={closeBtnClick} 
              formType={formType}
              changeFormTo={setFormType}/>} */}
      { (formType === 'email-login' )
        && <EmailLogin  
              closeBtnClick={closeBtnClick} 
              formType={formType}
              changeFormTo={setFormType}/>}

      {/* { formType === 'otp'
        && <ConfirmationCode 
              formType={formType}
              changeFormTo={setFormType}/>} */}

      { formType === 'email-signup' 
        && <SignUp 
              closeBtnClick={closeBtnClick} 
              changeFormTo={setFormType}/> }
    </div>
  )
}
