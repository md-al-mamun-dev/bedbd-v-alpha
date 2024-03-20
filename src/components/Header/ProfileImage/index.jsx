'use client'
import { useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'

const ProfileImage = ({logInBtnHandlar, user, isLoggedIn}) => {
  const [showMenu, setShowMenu] = useState(false)

  return (<>
            {
              isLoggedIn
                  ? <div className='position-relative'>
                      <div onClick={()=>setShowMenu(!showMenu)} className={`position-relative round box-shadow-primary h-48px w-48px mr-l-auto mr-r-auto ${styles.profile_image}`}>
                        <Image alt='user image' className='round border-primary-1 padding-0 ' src={'/images/sample-profile-photo.jpg'} height={48} width={48}/>
                      </div>
                      {/* display-xl-none */}
                      <ul className={`${showMenu ? 'lg-radius-10px lg-flex lg-position-absolute lg-right-12px lg-box-shadow-primary' : 'display-lg-none'}  fs-200  fw-regular-dark display-md-flex flex-col bg-neutral-000  w-max-content `}>
                        <li className='p-md-8px p-lg-16px-32px'>Profile</li>
                        <li className='p-md-8px p-lg-16px-32px'>Message</li>
                        <li className='p-md-8px p-lg-16px-32px'>Favourite List</li>
                        <li className='p-md-8px p-lg-16px-32px'>Booking History</li>
                        <li className='p-md-8px p-lg-16px-32px'>Switch to User</li>
                        <li className='p-md-8px p-lg-16px-32px'>Support</li>
                        <li className='p-md-8px p-lg-16px-32px'>Log Out</li>
                      </ul>
                  </div>
                    
                  : <button onClick={logInBtnHandlar} className={`capitalize fw-slightly-dark no-decoration fs-regular ${styles.login_btn}`} href="#">log in</button>
                  }

          
        </>

        )
}

export default ProfileImage