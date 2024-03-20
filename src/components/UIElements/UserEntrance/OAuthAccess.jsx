import React from 'react'
import { account } from '@/service/config'
import Image from 'next/image'
import styles from './login.module.css'

export default function OAuthAccess() {


    function handleOAuth(authProvider){
        const login = account.createOAuth2Session(authProvider, 'http://localhost:3000/property/id="smth"', 'http://localhost:3000/host/dashboard')
      }
  return (
    <div className={`${styles.alternative_access}`}>
    <h4 >Or Continue With</h4>
    <div className={`${styles.access_btns}`}>
      <button className={`${styles.btn}`} onClick={()=>handleOAuth('google')}>
        <div className={`${styles.btn_icon_wrapper}`}>
          <Image src={'/icons/google_colored.png'}  fill />
        </div>
        Google
      </button>
      <button className={`${styles.btn}`} onClick={()=>handleOAuth('facebook')}>
        <div className={`${styles.btn_icon_wrapper}`}>
          <Image src={'/icons/fb_colored.png'}  fill />
        </div>
        Facebook
      </button>
      {/* <button className={`${styles.btn}`}>
        <div className={`${styles.btn_icon_wrapper}`}>
          <Image src={'/icons/apple_colored.png'}  fill />
        </div>
        Apple ID
      </button> */}
    </div>
  </div>
  )
}
