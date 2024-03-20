'use client'
import LucidIcon from "@/components/LucidIcon"
import { useState } from "react"
import checkEmail from "@/components/Utility/checkEmail"
// import checkPasswordErr from "@/components/Utility/checkPassword"
import checkPassword from "@/components/Utility/checkPassword"
import accountService from "@/service/AccountService"

export default function SignUp({closeBtnClick, changeFormTo}) {

    const [formData, setFormData] =  useState({ email:'',
                                                password:'',
                                                confirmPassword:''})
    const [err, setErr] = useState([])

    function continueBtnClickHandlar(e) {
        e.preventDefault()
        console.log(formData)

        if(                             err.length === 0
            &&            formData['email'].length  >  0
            &&         formData['password'].length  >  0
            &&  formData['confirmPassword'].length  >  0){
                console.log('no error')
                accountService.createUserAccout(formData['email'], formData['password'])
                // send some notification 
                closeBtnClick()
            }
        else{
            console.log('has error')
            console.log(err)
        }



        console.log(formData)
        console.log(err)
    }
    function handleInputChange(inputValue, fieldName) {
        // const inputvalue = e.target.value
      
        // Email error checking
        if(fieldName === 'email' ){          
          const emailErrorArr = checkEmail(inputValue)
          const otherErrors = err.filter(item => item.errName !== 'email')  
          emailErrorArr.length>0
            ? setErr([...otherErrors, { errName: 'email', errList: emailErrorArr }])
            : setErr([...otherErrors])
          }
      
        // Password error checking
        if(fieldName === 'password' ){
          const passwordErr = checkPassword(inputValue)
          const otherErrors = err.filter(item => item.errName !== 'password')
          passwordErr.length>0
            ? setErr([...otherErrors, { errName: 'password', errList: passwordErr }])
            : setErr([...otherErrors])
        }

        // check confirm password is Matched or not
        if((fieldName ===  'confirmPassword')){ 
            // const otherErrors = err.filter(item => item.errName !== 'password' )
            // const passwordError = err.filter(item => item.errName === 'password' )

            // {type:'number', message:'password must contain number'}


            const { passwordError, otherErrors } = 
                      err.reduce(  (acc, item) => {
                        item.errName === 'password'
                          ? acc.passwordError = [...acc.passwordError, item]
                          : acc.otherErrors = [...acc.otherErrors, item]                                                                    
                        return acc;
                        }, { passwordError: [], otherErrors: [] } );

            if(formData['password'] !== inputValue)
               if(passwordError.length !== 0 ){
                  const otherPasswordErr = passwordError[0]['errList']
                                              .filter(item => 
                                                        (item.type !== 'invalidConfirmation') )
                  setErr([...otherErrors, 
                            { ...passwordError[0], 
                              errList: [...otherPasswordErr, 
                                        {    type: 'invalidConfirmation', 
                                          message: 'password not matched' }] }])
               }
                else setErr([...otherErrors, { errName: 'password', errList: [{type:'invalidConfirmation', message:'password not matched '}] }])
            else setErr([...otherErrors])
            
        }
        
        setFormData({...formData, [fieldName]:inputValue })
      }

    // function handleInputChange(e, fieldName) {
    //     const inputvalue = e.target.value
    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     if(fieldName === 'email'){
    //         const otherErrors = err.filter(item => item.errName !== 'email' )

    //         emailRegex.test(inputvalue)
    //             ? setErr([...otherErrors])
    //             : setErr([...otherErrors, {errName: 'email', msg: "email is invalid" }])
    //     }
    //     if(fieldName === 'password' ){
    //         const passwordErrArr = checkPasswordErr(inputvalue)
    //         const otherErrors = err.filter(item => item.errName !== 'password')

    //         passwordErrArr.length>0
    //             ? setErr([...otherErrors, { errName: 'password', errList: passwordErrArr }])
    //             : setErr([...otherErrors])
    //     }
    //     if((fieldName ===  'confirmPassword')){            
    //         const otherErrors = err.filter(item => item.errName !== 'confirmPassword' )
            
    //         formData['password'] !== inputvalue
    //             ? setErr([...otherErrors, { errName: 'confirmPassword', msg: 'password not matched' }])
    //             : setErr([...otherErrors])
    //     }
    //     setFormData({...formData, [fieldName]:inputvalue })
    // }


  return (
    <div className='absolute-center  w-100 p-24-38 max-w-750 p-72-105 box-shadow-overlay bg-neutral-000 radius-100'>
        <div className='h-100 w-100'>
          <div className='w-100 flex space-between relative p-r-2  mr-btm-1000 horizontal-line-btm'>
                <h3 className='fs-500 fw-bold p-l-2' >Sign up</h3>
                <LucidIcon onClick={closeBtnClick} className='p-r-2 cursor-pointer' color="#000" name='x'/>
          </div>

          <form className="flex flex-col gap-32 w-100 max-w-540 ">
            <div className="w-100 relative ">
                <input 
                    value={formData['email']}
                    required
                    // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    onChange={e => handleInputChange(e.target.value, 'email')}
                    className="p-16-24 w-100 radius-6 border-neutral-250" type="text" id="email" name="email"  placeholder="Email address"/>
                    {
                        formData['email'].length > 3 
                        && <LucidIcon onClick={e => setFormData({...formData, ['email']:''})} name='rotate-ccw' size={24} className='cursor-pointer no-border no-background absolute-v-center right-24'/>
                    }
            </div>
            <div className="w-100 relative">
                <input 
                    value={formData['password']}
                    required
                    // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$"
                    onChange={e => handleInputChange(e.target.value, 'password')}
                    className="p-16-24 w-100  radius-6 border-neutral-250" type="password" id="password" name="password" placeholder="Create Password"/>
            </div>
            <div className="w-100 relative">
                <input 
                    required
                    value={formData['confirmPassword']}
                    onChange={e => handleInputChange(e.target.value, 'confirmPassword')}
                    className="p-16-24 w-100  radius-6 border-neutral-250" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" />
                { 
                        formData['password'].length > 7
                    &&  (formData['password'] === formData['confirmPassword'])
                    &&  <LucidIcon name='check' size={24} className='absolute-v-center right-24'/>                
                }

            </div>
            <button type='submit' onClick={continueBtnClickHandlar} className="w-100 btn-primary p-12 txt-align-center"> Continue</button>
          </form>
          <h3 className="w-100 clr-neutral-500 txt-align-center mr-top-32px fs-200 fw-regular ">Already have an account?&nbsp; 
          <button onClick={()=>changeFormTo('email-login')} className="no-border no-background clr-primary-400 fw-regular-dark cursor-pointer">Login</button></h3>

        </div>
      </div>
  )
}
