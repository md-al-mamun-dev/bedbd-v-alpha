import { useState, createRef } from 'react'
import accountService from '@/service/AccountService';
import useAccountDispatch from '@/context/account/useAccountDispatch';
// appwrite
// import { account } from '@/service/config'
// import { ID } from 'appwrite'

export default function ConfirmationCode({userId, close}) {
  const dispatch = useAccountDispatch()

// console.log(userId)

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const inputRefs = Array(6).fill(0).map((_, idx) => createRef());

  const handleOtpInputChange = (event, idx) => {
    const value = event.target.value;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    // Move focus to the next input box if the value is not empty
    if (value !== '' && idx < 5) {
      inputRefs[idx + 1].current.focus();
    }
  };

async function onSubmitClickHandlar(e) {
  e.preventDefault()
  const hasEmptyOtpInput = otp.some(value => value.trim() === '')
  
  if(!hasEmptyOtpInput){
    const fullOtp = otp.map(value => value.trim()).join('')
    const session = await accountService.submitOtp( userId, fullOtp.toString());
    if(session){
      dispatch({type:'login', data: session })
      close()
    }
  }else{
    console.log('has error')
  }
}

 

  return (
    <div className='w-530px p-62-90 absolute-center box-shadow-overlay bg-neutral-000 radius-100 flex flex-col flex-align-center gap-28 '>
        <h3 className='clr-neutral-500 fs-200 fw-regular-dark '>Enter 6-digit verification code</h3> 
        <div className='flex flex-center gap-14 clr-neutral-500 fw-bold '>
          {
            otp.map((digit, index) => (
              <input key={index} type="text" maxLength="1" value={digit} 
                className='w-45px h-60px p-16 radius-4 border-neutral-500 '
                onChange={(e) => handleOtpInputChange(e, index)}
                ref={inputRefs[index]}
              />
          ))}
        </div>
        <button className='btn-primary p-12-96' onClick={onSubmitClickHandlar}>Submit</button>


        <h3 className='clr-neutral-500 fs-200 fw-regular-dark '>Didn't reveice your code ?</h3> 
    </div>
  )
}
