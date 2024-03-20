'use client'
import BackBtn from "./BackBtn"
import { useState, useEffect } from "react"
import useAccountDispatch from "@/context/account/useAccountDispatch"

export default function Review({data, prevStep, nextStep}) {
  const dispatch = useAccountDispatch()
  const [formData, setFormData] = useState({  name: '' ,
                                              prefs: {        idNumber: '',
                                                          fathersName: '',
                                                          mothersName: '',
                                                                  dob: '',
                                                       presentAddress: '',
                                                    permanenetAddress: '',    }, })

useEffect(()=>{
  let ignore = false;

  if(data)
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
  function continueBtnClickHandlar(e) {
    e.preventDefault()
    console.log(formData)
    dispatch({ type:'update', data: formData })
    nextStep()
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
            <div>
              <input onChange={e=>onFormDataChange(e.target.value, 'dob')} 
                className='w-100 form-input-item'
                name='date-of-birth'
                id='date-of-birth'
                placeholder='Date of Birth'/>
              
            </div>
            

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
