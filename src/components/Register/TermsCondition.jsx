"use client"
import { useEffect, useState } from "react"
import LucidIcon from "../LucidIcon"
import BackBtn from "./BackBtn"
import useAccountDispatch from "@/context/account/useAccountDispatch"
import {  usePathname } from "next/navigation"
import useTermsConditions from "@/hooks/useTermsConditions"
import useRegistrationDispatch from "@/context/registration/useRegistrationDispatch"
import databaseService from "@/service/DatabaseService"

import { Databases, Query } from "appwrite"
import appwriteClient from "@/service/config"

export default function TermsCondition({data, prevStep, nextStep}) {
    const [showAllTearms, setShowAllTearms] = useState(false)
    const [isHostAgree, setIsHostAgree] = useState(false)
    const [isClientAgree, setIsClientAgree] = useState(false)


    const [isHostTermsConditionsAgree, setIsHostTermsConditionsAgree] = useState(false)
    const [isClientTermsConditionsAgree, setIsClientTermsConditionsAgree] = useState(false)


    // const [termsConditions, setTermsConditions] = useState([])

    
    const databases = new Databases(appwriteClient); 
    const dispatch = useRegistrationDispatch()
    const pathname = usePathname()
    
    const tearmsAndCondition = useTermsConditions() || []
    console.log(tearmsAndCondition)

    useEffect(()=>{
        if(data.hasOwnProperty('prefs')){
            const prefs = data['prefs']
            if(prefs.hasOwnProperty('isHostTermsConditionsAgree'))
                setIsClientTermsConditionsAgree(prefs['isHostTermsConditionsAgree'])
            if(prefs.hasOwnProperty('isClientTermsConditionsAgree'))
                setIsHostTermsConditionsAgree(prefs['isClientTermsConditionsAgree'])                
        }
    }, [data])
    // const getTermsConditions = useTermsConditions()
    // console.log(getTermsConditions)
    // console.log(path)

    // useEffect(()=>{
    //     let ignore = false
    //     async function getHostTermsCondition() {
    //         if(!ignore){
    //             const termsCondition = await databases.listDocuments(
    //                                             process.env.NEXT_PUBLIC_APPWRITE_DB_BEDBD_ID,
    //                                             process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TERMS_CONDITIONS_ID,
    //                                             [Query.equal('conditionForWhom', ['host', 'host-and-client'])]
    //                                             )

    //             if(termsCondition){
    //                 console.log(termsCondition)
    //                 setTermsConditions(termsCondition)
    //             }
    //         }
    //     }
    //     getHostTermsCondition() 
    //     return ()=> ignore = true
    // }, [])


    // const tearmsAndCondition = [
    //                                 {
    //                                     id:0,
    //                                     name:'',
    //                                     description:'Lorem ipsum dolor sit amet consectetur. Sit vitae semper nam amet integer. Vitae enim sit facilisis nunc. Nec hendrerit risus risus venenatis vitae eu et malesuada. Id egestas tortor at mollis fermentum netus.',
    //                                 }, {
    //                                     id:1,
    //                                     name:'',
    //                                     description:'Fermentum ornare vulputate condimentum massa quis. Sit mi nisl hac orci dolor proin scelerisque lacus. Augue pellentesque sed ornare sit.',
    //                                 }, {
    //                                     id:2,
    //                                     name:'',
    //                                     description:'Vitae enim sit facilisis nunc. Nec hendrerit risus risus venenatis vitae eu et malesuada. Id egestas tortor at mollis fermentum netus.',
    //                                 },{
    //                                     id:3,
    //                                     name:'',
    //                                     description:'Lorem ipsum dolor sit amet consectetur. Sit vitae semper nam amet integer. Vitae enim sit facilisis nunc. Nec hendrerit risus risus venenatis vitae eu et malesuada. Id egestas tortor at mollis fermentum netus.',
    //                                 }, {
    //                                     id:4,
    //                                     name:'',
    //                                     description:'Fermentum ornare vulputate condimentum massa quis. Sit mi nisl hac orci dolor proin scelerisque lacus. Augue pellentesque sed ornare sit.',
    //                                 }, {
    //                                     id:5,
    //                                     name:'',
    //                                     description:'Vitae enim sit facilisis nunc. Nec hendrerit risus risus venenatis vitae eu et malesuada. Id egestas tortor at mollis fermentum netus.',
    //                                 }
    //                             ]
    
    function continueBtnClickHandlar(e) {
        e.preventDefault()
        dispatch({ type:'registration/update-pref', data:{ 
                                        isHostTermsConditionsAgree: isHostTermsConditionsAgree, 
                                        isClientTermsConditionsAgree: isClientTermsConditionsAgree 
                                    }
                                })
        console.log(data)
        nextStep()
    }

    function toggleShow(e){
        e.preventDefault()
        setShowAllTearms(!showAllTearms)
    }
    function toggleAgreement(e){
        e.preventDefault()
        if(pathname === '/host/register')
            setIsHostTermsConditionsAgree(!isHostTermsConditionsAgree)
        if(pathname === '/client/register')
            setIsClientTermsConditionsAgree(!isClientTermsConditionsAgree)
    }

  return (
        <>
            <h3 className='clr-primary txt-align-center fs-875 fw-regular-dark w-600px'>Terms & Conditions</h3>
            <ul className='clr-neutral-620 fs-regular fw-regular line-height-32 flex flex-col gap-14 numbered-items mr-t-48'>
                {
                    tearmsAndCondition.length > 0 
                        ?   <>
                                {
                                    tearmsAndCondition
                                        .map((item, idx) => <li key={item['id']} className={`p-l-24 ${(idx>2 && !showAllTearms) && 'display-none'}`}>{item['description']}</li>)
                                }
                                {
                                    tearmsAndCondition.length > 3  
                                        && <button className='btn-secondary w-180 relative left-224 cursor-pointer' onClick={toggleShow}> {!showAllTearms ? 'Read More' : 'Show less'} </button>
                                }
                                <button 
                                className="mr-top-700 w-fit-content cursor-pointer relative bg-transparent no-border no-outline margin-left-24" onClick={toggleAgreement}>
                                    <LucidIcon className='absolute-v-center position-left-outside-24'  name={`${ pathname === '/host/register'
                                                                                                                    ? isHostTermsConditionsAgree 
                                                                                                                        ? 'check-square' 
                                                                                                                        : 'square'
                                                                                                                    : isClientTermsConditionsAgree 
                                                                                                                        ? 'check-square'
                                                                                                                        : 'square' }`} size={24}/>
                                        I agree with the terms and conditions
                                    </button>

                                <button disabled={pathname === '/host/register'
                                                    ? !isHostTermsConditionsAgree
                                                    : !isClientTermsConditionsAgree }                                 
                                    onClick={continueBtnClickHandlar} className={` w-100 mr-top-32 ${ pathname === '/host/register'
                                                                                                                    ? isHostTermsConditionsAgree 
                                                                                                                        ? 'btn-primary'
                                                                                                                        : 'btn-disable'
                                                                                                                    : isClientTermsConditionsAgree 
                                                                                                                        ? 'btn-primary'
                                                                                                                        : 'btn-disable' } `}>Continue</button>
                            </>
                        : <div>Loading...</div>              
                }

                
            </ul>
            <BackBtn onBackBtnClick={prevStep}/>
        </>
  )
}
