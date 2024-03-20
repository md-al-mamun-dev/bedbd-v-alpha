'use client'
import { useRouter } from "next/navigation"

export default function LastWords() {
  const router = useRouter()
  return (
    <div className='mr-l-auto mr-r-auto w-100 max-w-386 '>
        <h3 className='clr-primary txt-align-center fs-875 fw-regular-dark'>That's all</h3>
        <h4 className='clr-neutral-500 txt-align-center fs-regular fw-regular-dark mr-t-8 mr-btm-28'>
            Your bedbd account is ready to use. Now you can start listing your property
        </h4>
        <button 
          onClick={()=> router.push('/')}
          className='w-100 btn-primary'>Back to home</button>        
    </div>
  )
}
