'use client'
import styles from './index.module.css'
import Navbar from '../Navbar'
import Image from 'next/image'
// import dummy_profile_img from './images/profile-dummy.svg'
// import { Filter } from 'lucide-react'
import { Menu, X , } from 'lucide-react'
import { useEffect, useState } from 'react'
// import LucidIcon from '../LucidIcon'
import ProfileImage from './ProfileImage'
import UserEntrance from '../UIElements/UserEntrance'
import useAccount from '@/context/account/useAccount'
// import { useAccount } from '@/context/account/accountContext'
import useAuthCheck from '@/hooks/useAuthCheck'
import LucidIcon from '../LucidIcon'
import Link from 'next/link'


const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [showLoginRegisterBox, setShowLoginRegisterBox] = useState(false)
  const isAuthChecked = useAuthCheck()
  const userData = useAccount()
  console.log(userData)

  // const [loggedInUser, setLoggedInUser] = useState(false)



  // if(authChecked){
  //   Object.keys(data).length > 0 && setLoggedInUser(data)    
  // }


  // const [account, setAccount] = useState({})

  // useEffect(()=>{

  // },[])


  const toggleMenu =()=>setShowMenu(!showMenu)
  const loginBtnClickHandlar =()=>{
    setShowLoginRegisterBox(true)
  }

  const closeBtnClickHandlar =()=>{   
    setShowLoginRegisterBox(false)
  }



  return (
    <div className={` sticky box-shadow-gray z-index-5 | ${styles.header}  `}>
        <div className={`container | ${styles.nav_wrapper} `}>

              <Link href="/" className='logo' replace>
                <div className={`${styles.logo_wrapper}`}>
                  <Image className={`${styles.logo_image} `} src={`/logo.png`}  fill />
                </div>
              </Link>
            
              <div className={`${styles.header_section_r} bg-neutral-000 right-0 ${ showMenu ? 'flex p-8px' : 'display-sm-none' }  `} >
                <Navbar/>
                <button className={`btn ${styles.btn_join}`}>Become A Host</button>                
                <ProfileImage logInBtnHandlar={loginBtnClickHandlar} user={userData} isLoggedIn={isAuthChecked && (userData && (Object.keys(userData).length > 0))}/>
              </div>           

            <button className={`${styles.menu_toggle_btn}`} onClick={toggleMenu}>
                <LucidIcon className={`${styles.icon}`} name={`${showMenu ? 'x' : 'menu'}`} size={24} />
            </button>

            {/* <X/ className={`${styles.close_icon}`}> */}
            {/* <LucidIcon className={`${styles.close_icon}`} name='x' size={24}/> */}
        </div>
        {
          showLoginRegisterBox 
            && <UserEntrance  closeBtnClick={closeBtnClickHandlar}/>
        }
    </div>
  )
}

export default Header