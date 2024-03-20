'use client'
import { useState } from "react"
import React from 'react'
import TermsCondition from "./TermsCondition"
import UploadPhoto from "./UploadPhoto"
import Review from "./Review"
import LastWords from "./LastWords"
// import LucidIcon from "../LucidIcon"
import BackBtn from "./BackBtn"
import GetStart from "./GetStart"
import useAccount from "@/context/account/useAccount"
import useAuthCheck from "@/hooks/useAuthCheck"
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()
  const isAuthChecked = useAuthCheck()
  const account =  useAccount()
  const [formState, setFormState] = useState('start')

// const [name, setName] = useState('')
// const [phone, setPhone] = useState('')
// const [email, setEmail] = useState('')

  if(isAuthChecked && 
    (!account || 
      (account && 
        (Object.keys(account).length < 1)))){
          router.push('/');
  }

  console.log(isAuthChecked)
  

  return (
    (isAuthChecked && Object.keys(account).length > 0) 
    ? <div className='w-100v h-100v relative '>  
        <div className='bg-secondary-050 absolute-center radius-8 p-56-106 '>

        { formState === 'start' && 
            <GetStart data={account} 
                      nextStep={()=>setFormState('tarms-nd-condition')}/> }

        { formState === 'tarms-nd-condition' &&
            <TermsCondition data={account}
                            prevStep={()=>setFormState('start')}
                            nextStep={()=>setFormState('user-photo')}/>}

        { formState === 'user-photo' &&
            <UploadPhoto  data={account} formState={formState}
                          prevStep={()=>setFormState('tarms-nd-condition')} 
                          nextStep={()=>setFormState('verification-document-front-side')}/>}

        { formState === 'verification-document-front-side' &&
            <UploadPhoto data={account} formState={formState}
                         prevStep={()=>setFormState('user-photo')} 
                         nextStep={()=>setFormState('verification-document-back-side')}/>}

        { formState === 'verification-document-back-side' &&
            <UploadPhoto data={account} formState={formState}
                         prevStep={()=>setFormState('verification-document-front-side')} 
                         nextStep={()=>setFormState('info-review')}/>}

        { formState === 'info-review' && 
            <Review data={account}
                    prevStep={()=>setFormState('verification-document-back-side')} 
                    nextStep={()=>setFormState('end')}/>}

        { formState === 'end' && 
            <LastWords/>}


            {/* <GetStart/> */}
            {/* <TermsCondition/> */}
            {/* <UploadPhoto/> */}
            {/* <Review/> */}
            {/* <LastWords/> */}
        </div>
    </div>
    :<>Loading...</>
  )
}
