import { useEffect, useState } from "react"
import BackBtn from "./BackBtn"
import checkName from "../Utility/checkName"
import checkEmail from "../Utility/checkEmail"
import checkPhoneNumber from "../Utility/checkPhoneNumber"
import useRegistrationDispatch from "@/context/registration/useRegistrationDispatch"
import LucidIcon from "../LucidIcon"
import isEmailValid from "../Utility/isEmailValid"
import isPhoneNumberValid from "../Utility/isPhoneNumberValid"
// import { usePathname } from "next/navigation"


export default function GetStart({data, nextStep}) {
    // const account =  useAccount()
    // const [formData, setFormData] = useState(data)

    const [err, setErr] = useState([])
    const [formData, setFormData] = useState({   name: '' ,
                                                phone: '' ,
                                                email: '' ,
                                    emailVerification: false,
                                    phoneVerification: false
                                })

    // const dispatch = useAccountDispatch()
    const dispatch = useRegistrationDispatch()
    // const pathname = usePathname()

    // console.log(data['phone'])
    // useEffect(()=>{
    //     let ignore = false;
    //     if(data){
    //         setFormData({ ...formData, 
    //                     name: data['name'] ,
    //                     phone: data['phone'],
    //                     email: data['email']
    //                 })
    //     }
    //     return () => { ignore = true };
    // }, [data])

    useEffect(()=>{
        let ignore = false;
        if(data){
            setFormData({ ...formData, ...data })
        }
        return () => { ignore = true };
    }, [data])

    // useEffect(()=>{
    //     let ignore = false;
    //     if(data['phone']){
    //         setFormData({ ...formData, phone: data['phone'] })
    //     }
    //     return () => { ignore = true };
    // }, [data['phone']])


    // useEffect(()=>{
    //     let ignore = false;
    //     if(data['email']){
    //         setFormData({ ...formData, email: data['email'] })
    //     }
    //     return () => { ignore = true };
    // }, [data['email']])

    function onContinueBtnClick(e) {
        e.preventDefault()
        // console.log(formData)
        // console.log(err)
        dispatch({ type:'registration/update', data: formData })
        nextStep('tarms-nd-condition')
    }


    function handleNameChange(e) {
        const inputValue = e.target.value
        const nameErrorArr = checkName(inputValue)
            const otherErrors = err.filter(item => item.errName !== 'name')

            if((inputValue.length > 0) &&  (nameErrorArr.length > 0))
                 setErr([...otherErrors, { errName: 'name', errList: nameErrorArr }])
            else setErr([...otherErrors])

            setFormData({...formData, name:inputValue })
    }

    function handlePhonenumberChange(e) {
        const inputValue = e.target.value
        var phoneRegex = /^[0-9+()-\s]*$/
            const phoneErrorArr = checkPhoneNumber(inputValue)
            const otherErrors = err.filter(item => item.errName !== 'phone')            

            if((inputValue.length > 0) && (phoneErrorArr.length > 0)){
                setErr([...otherErrors, { errName: 'phone', errList: phoneErrorArr }])
            }else
                setErr([...otherErrors])            

            if(phoneRegex.test(inputValue))
                setFormData({...formData, phone:inputValue })
    }

    function handleEmailchange(e) {
        const inputValue = e.target.value
        const emailErrorArr = checkEmail(inputValue)
            const otherErrors = err.filter(item => item.errName !== 'email')

            if((inputValue.length > 0) && (emailErrorArr.length > 0))
                setErr([...otherErrors, { errName: 'email', errList: emailErrorArr }])
            else setErr([...otherErrors])

            setFormData({...formData, email:inputValue })            
    }

    // function onFormDataChange(inputValue, fieldName) {
    //     if(fieldName === 'name' ){          
    //         const nameErrorArr = checkName(inputValue)
    //         const otherErrors = err.filter(item => item.errName !== 'name')

    //               ((inputValue.length > 0) 
    //         &&  (nameErrorArr.length > 0))
    //                     ? setErr([...otherErrors, { errName: 'name', errList: nameErrorArr }])
    //                     : setErr([...otherErrors])

    //         setFormData({...formData, [fieldName]:inputValue })
    //         }

    //     if(fieldName === 'phone' ){
    //         console.log(inputValue)
    //         console.log(err.filter(item => item.errName !== 'phone'))

    //         var phoneRegex = /^[0-9+()-\s]*$/
    //         const phoneErrorArr = checkPhoneNumber(inputValue)
    //         const otherErrors = err.filter(item => item.errName !== 'phone')
    //         console.log(phoneErrorArr.length)
    //         console.log(otherErrors.length)
            

    //         if((inputValue.length > 0) && (phoneErrorArr.length > 0)){
    //             setErr([...otherErrors, { errName: 'phone', errList: phoneErrorArr }])
    //         }else{
    //             setErr([...otherErrors])
    //         }

    //         if(phoneRegex.test(inputValue))
    //             setFormData({...formData, [fieldName]:inputValue })
    //         }

    //     if(fieldName === 'email' ){          
    //         const emailErrorArr = checkEmail(inputValue)
    //         const otherErrors = err.filter(item => item.errName !== 'email')

    //               (inputValue.length > 0) 
    //         && (emailErrorArr.length > 0)
    //                     ? setErr([...otherErrors, { errName: 'email', errList: emailErrorArr }])
    //                     : setErr([...otherErrors])

    //         setFormData({...formData, [fieldName]:inputValue })
    //         }
          
    // }

  return (
    <>
          <h3 className='clr-primary txt-align-center fs-875 fw-regular-dark'>Get Start</h3>

          {/* min-w-600px */}

          <form className='clr-neutral-500 fs-regular fw-regular-dark flex flex-col gap-24 mr-top-800 mr-btm-800 w-600px'>
              <div>
                  <input className='form-input' placeholder='Name ( auto )' 
                         value={formData['name']}
                         onChange={handleNameChange}/>
              </div>
              <div className="relative">
                <input 
                    className='form-input' placeholder='Phone' 
                    value={formData['phone']}
                    onChange={handlePhonenumberChange}/>
                {
                    (formData['phone'].length > 0 &&  isPhoneNumberValid(formData['phone'])) &&
                    ((data['phoneVerification'] && ( data['phone'] === formData['phone']))
                        ?   <div className="text-select-none fs-100 clr-secondary-400 absolute-v-center right-24px flex gap-10 align-center">
                                <LucidIcon name='badge-check' size={20} className='clr-secondary-400'/>
                                Verified
                            </div>
                        :   <div className="text-select-none fs-100 clr-neutral-200 absolute-v-center right-24px flex gap-10 align-center ">
                                Not Verified
                                {/* <button className="no-background border-none cursor-pointer p-6-8 radius-8 hover-bg-neutral hover-txt-secondary-200 fw-semi-bold">Verify Now</button> */}
                            </div>
                    )
                }                    
              </div>
              <div className="relative">
                  <input className='form-input' placeholder='Email' 
                         value={formData['email']}
                         onChange={handleEmailchange}/>
                {
                    (formData['email'].length > 0 && isEmailValid(formData['email'])) &&
                    ((data['emailVerification'] && ( data['email'] === formData['email']))
                        ?   <div className="text-select-none fs-100 clr-secondary-400 absolute-v-center right-24px flex gap-10 align-center">
                                <LucidIcon name='badge-check' size={20} className='clr-secondary-400'/>
                                Verified
                            </div>
                        :   <div className="text-select-none fs-100 clr-neutral-200 absolute-v-center right-24px flex gap-10 align-center ">
                                Not Verified
                                {/* <button className="no-background border-none cursor-pointer p-6-8 radius-8 hover-bg-neutral hover-txt-secondary-200 fw-semi-bold">Verify Now</button> */}
                            </div>
                    )
                }
              </div>
          </form>
          <button className='btn-primary w-100' onClick={onContinueBtnClick}>Continue</button>          
          {/* <BackBtn/> */}
      </>
  )
}
