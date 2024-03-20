'use client'
// import BackBtn from "./BackBtn"
import BackBtn from "../BackBtn"
import { useState, useEffect } from "react"
// import useAccountDispatch from "@/context/account/useAccountDispatch"
import useRegistrationDispatch from "@/context/registration/useRegistrationDispatch"
import useRegistration from "@/context/registration/useRegistration"
import storageService from "@/service/StorageService"
import userVerificationService from "@/service/UserVerificationService"
import accountService from "@/service/AccountService"
import {Client, Account } from "appwrite"
import appwriteClient from "@/service/config"

export default function Review({data, prevStep, nextStep}) {
  const dispatch = useRegistrationDispatch()
  const regData = useRegistration()
  const [formData, setFormData] = useState({  name: '' ,
                                              email: '' ,
                                              phone: '' ,
                                              prefs: {       idNumber: '',
                                                          fathersName: '',
                                                          mothersName: '',
                                                                  dob: '',
                                                       presentAddress: '',
                                                    permanenetAddress: '',    }, })

useEffect(()=>{
  let ignore = false;

  if(data && !ignore)
      setFormData({ ...formData, ...data, prefs:{ ...formData['prefs'], ...data['prefs'] } })
  
  return () => { ignore = true };
  }, [data])
// useEffect(()=>{
//   let ignore = false;
//   if(data['name'])
//       setFormData({ ...formData, name: data['name'] })
//   if(data['prefs']){
//     if(data['prefs']){
//       setFormData({ ...formData, pref:{...formData['pref'], ...data['pref']} })
//     }
//   }
//   return () => { ignore = true };
// }, [data])

function onFormDataChange(inputValue, fieldName) {

// console.log(data)


// useEffect(()=>{
//     let ignore = false;
//     if(data['phone'])
//         setFormData({ ...formData, phone: data['phone'] })    
//     return () => { ignore = true };
// }, [data['phone']])


        // if(fieldName === 'name' ){          
        //     const nameErrorArr = checkName(inputValue)
        //     const otherErrors = err.filter(item => item.errName !== 'name')

        //           ((inputValue.length > 0) 
        //     &&  (nameErrorArr.length > 0))
        //                 ? setErr([...otherErrors, { errName: 'name', errList: nameErrorArr }])
        //                 : setErr([...otherErrors])

        //     setFormData({...formData, [fieldName]:inputValue })
        //     }

        // if(fieldName === 'phone' ){
        //     console.log(inputValue)
        //     console.log(err.filter(item => item.errName !== 'phone'))

        //     var phoneRegex = /^[0-9+()-\s]*$/
        //     const phoneErrorArr = checkPhoneNumber(inputValue)
        //     const otherErrors = err.filter(item => item.errName !== 'phone')
        //     console.log(phoneErrorArr.length)
        //     console.log(otherErrors.length)
            

        //     if((inputValue.length > 0) && (phoneErrorArr.length > 0)){
        //         setErr([...otherErrors, { errName: 'phone', errList: phoneErrorArr }])
        //     }else{
        //         setErr([...otherErrors])
        //     }

        //     if(phoneRegex.test(inputValue))
        //         setFormData({...formData, [fieldName]:inputValue })
        //     }

        // if(fieldName === 'email' ){          
        //     const emailErrorArr = checkEmail(inputValue)
        //     const otherErrors = err.filter(item => item.errName !== 'email')

        //           (inputValue.length > 0) 
        //     && (emailErrorArr.length > 0)
        //                 ? setErr([...otherErrors, { errName: 'email', errList: emailErrorArr }])
        //                 : setErr([...otherErrors])

        //     setFormData({...formData, [fieldName]:inputValue })
        //     }

      if(fieldName === 'name')
        setFormData({...formData, [fieldName]:inputValue})
      else {
        setFormData({...formData, pref:{...formData['pref'], [fieldName]:inputValue}} )
      }
    }
  async function continueBtnClickHandlar(e) {
    e.preventDefault()
    // console.log(formData)
    console.log(regData['prefs'])
    dispatch({ type:'registration/update', data: formData })

    const __formData = new FormData()
    __formData.append(                'name', regData['name'])
    __formData.append(               'email', regData['email'])
    __formData.append(               'phone', regData['phone'])
    __formData.append(            'idNumber', regData['prefs']['idNumber'])
    __formData.append(         'fathersName', regData['prefs']['fathersName'])
    __formData.append(         'mothersName', regData['prefs']['mothersName'])
    __formData.append(                 'dob', regData['prefs']['dob'])
    __formData.append(      'presentAddress', regData['prefs']['presentAddress'])
    __formData.append(   'permanenetAddress', regData['prefs']['permanenetAddress'])
    __formData.append(           'userPhoto', regData['prefs']['userPhoto'])
    __formData.append( 'verificationDocType', regData['prefs']['verificationDocType']['id'])
    __formData.append('verificationDocFront', regData['prefs']['verificationDocFront'])
    __formData.append( 'verificationDocBack', regData['prefs']['verificationDocBack'])
 
 
    const currentUser = await accountService.getCurrentUser()

    __formData.append(                'userId', currentUser['$id'])
    // const tokenResult = await accountService.getToken()    

    // if(tokenResult){
      // const token = tokenResult['jwt']


      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/register", {
        method: "POST",
        headers: {                        
          // Authorization: `Bearer ${token}`,
        },
        body: __formData,
      })

    // }
    

        // console.log(response)
    // const verificationFiles = [     regData['prefs']['verificationDocFront'],
    //                                 regData['prefs']['verificationDocBack']     ]

    // const result =  await storageService.uploadIdentificationImages(verificationFiles, regData['$id'] )
    // const profileImageResult =  await storageService.uploadProfileImage(regData['prefs']['userPhoto'], regData['$id'] )
    // if(profileImageResult)
    //     console.log(profileImageResult)
    // if(result){
    //     const infoData = {
    //         userId: regData['$id'],
    //         filesIdRefs: [result[0]['$id'], result[1]['$id']]
    //      }
    //     console.log(result)
    //     const dataResult = await userVerificationService.createVerificationInfo(infoData)
    //     if(dataResult){

    //       const newPrefs = {...data['prefs'], ...regData['prefs']}
    //       let promises = []
    //       if(regData['name'].length>0 && regData['name'] !== data['name'] )
    //         await accountService.updateUserName(regData['name'])
           
    //       // console.log(dataResult)
    //       const prefResult = await accountService.updateUserPrefs(
    //           {
    //                                 idNumber:regData['prefs']['idNumber'],
    //                              fathersName:regData['prefs']['fathersName'],
    //                              mothersName:regData['prefs']['mothersName'],
    //                                      dob:regData['prefs']['dob'],
    //                           presentAddress:regData['prefs']['presentAddress'],
    //                        permanenetAddress:regData['prefs']['permanenetAddress'],
    //             isClientTermsConditionsAgree:regData['prefs']['isClientTermsConditionsAgree'],
    //               isHostTermsConditionsAgree:regData['prefs']['isHostTermsConditionsAgree']
    //           })
    //       console.log(prefResult)

    //       // const update

    //     }

    // }

    // console.log(regData['prefs'])

    // nextStep()
  }
  return (
    <>
        <h3 className='clr-primary txt-align-center fs-875 fw-regular-dark '>Review</h3>
        <h3 className='clr-neutral-500 txt-align-center fs-regular fw-regular-dark '>Review your information</h3>
        <form className='mr-l-auto mr-r-auto w-600px w-600 grid gap-24 mr-t-24'>
          
            <input onChange={e=>onFormDataChange(e.target.value, 'idNumber')} 
                   className='w-100 form-input-item'
                   name='id-number'
                   id='id-number'
                   placeholder='ID Number'/>

            <input onChange={e=>onFormDataChange(e.target.value, 'name')} 
                   className='w-100 form-input-item'
                   name='user-name'
                   id='user-name'
                   placeholder='Name'/>

            <input onChange={e=>onFormDataChange(e.target.value, 'fathersName')} 
                   className='w-100 form-input-item'
                   name='fathers-name'
                   id='fathers-name'
                   placeholder={`Father's Name`}/>

            <input onChange={e=>onFormDataChange(e.target.value, 'mothersName')} 
                   className='w-100 form-input-item'
                   name='mothers-name'
                   id='mothers-name'
                   placeholder={`Mother's Name`} />
            {/* <div>
              <input onChange={e=>onFormDataChange(e.target.value, 'dob')} 
                className='w-100 form-input-item'
                name='date-of-birth'
                id='date-of-birth'
                placeholder='Date of Birth'/>              
            </div> */}
            

            <input onChange={e=>onFormDataChange(e.target.value, 'presentAddress')} 
                   className='w-100 form-input-item'
                   name='present-address'
                   id='present-address'
                   placeholder='Present Address' />

            <input onChange={e=>onFormDataChange(e.target.value, 'permanenetAddress')} 
                   className='w-100 form-input-item'
                   name='parmanent-address'
                   id='parmanent-address'
                   placeholder='Parmanenet Address'/>

            <button className='w-100 btn-primary' onClick={continueBtnClickHandlar}>Save & Continue</button>
        </form>
        <BackBtn onBackBtnClick={prevStep} />
    </> 
  )
}
