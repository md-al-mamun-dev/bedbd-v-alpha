'use client'
import styles from './index.module.css'
import React from 'react'
import Image from 'next/image'
import GooglePlayStoreIcon from '@/../public/icons/ion_logo-google-playstore.svg'
import AppleStoreIcon from '@/../public/icons/ion_logo-apple-appstore.svg'
import SocialIconFb from '@/../public/icons/social_fb.svg'
import SocialIconTwtter from '@/../public/icons/social_twitter.svg'
import SocialIconInstagram from '@/../public/icons/social_instagram.svg'
import SocialIconLinkedin from '@/../public/icons/social_linkedin.svg' 


export default function Footer() {  
  return (
    <div className={`${styles.footer} `}>
        
        <div className={`footer-container ${styles.footer_content_wrapper}`}  >
          <Logo/>          
          <Details/>
          <AppLink/>
          <Company/>          
          <HelpCenter/>          
          <ContactInfo/>
          <SocialLinks/>
          <Newsletter/>          
        </div>
        <Copywrite/>
    </div>
  )
}

const Logo = () => {
  return (
    <div className={`${styles.logo}`}>
      <h1 className={`${styles.logo_text}`}>bedbd.com</h1>
    </div>
  )
}

const Details = () => {
  return (
    <div className={`${styles.about}`}>
      <p className={`${styles.about_text}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  )
}

const AppLink = () => {
  return (
    <div className={`${styles.mobile_app_link}`}>
      <button className={`${styles.btn} cursor-pointer`}>
        <div className={`${styles.app_icon_wrapper}`}>
          <Image 
            className={`${styles.app_icon}`} 
            alt='google playstore icon'
            src={GooglePlayStoreIcon}
            height={24}
            width={24}
          />
        </div>
         PlayStore
      </button>
      <button className={`${styles.btn} cursor-pointer`}>
      <div className={`${styles.app_icon_wrapper}`}>
        <Image  
          className={`${styles.app_icon}`}
            src={AppleStoreIcon}
            height={24}
            width={24}
          />
      </div>
        
        AppleStore
      </button>
    </div>
  )
}

const Company = () => {
  return (
    <div className={`${styles.company}`}>
      <h1 className={`uppercase ${styles._info_header}`}>company</h1>
      <div className={`${styles._info_list}`}>
        <div className={`${styles._list_item}`}>about us</div>
        <div className={`${styles._list_item}`}>legal information</div>
        <div className={`${styles._list_item}`}>contacts us</div>
        <div className={`${styles._list_item}`}>blogs</div>
      </div>
    </div>
  )
}

const HelpCenter = () => {
  return (
    <div className={`${styles.help_center} `}>
      <h1 className={`uppercase ${styles._info_header}`}>help center</h1>
      <div className={`${styles._info_list}`}>
        <div className={`${styles._list_item}`}>find a property</div>
        <div className={`${styles._list_item}`}>how to add?</div>
        <div className={`${styles._list_item}`}>why us</div>
        <div className={`${styles._list_item}`}>FAQs</div>
        <div className={`${styles._list_item}`}>Rental Guides</div>
      </div>
    </div>
  )
}

const ContactInfo = () => {
  return (
    <div className={`${styles.contact_info}`}>
      <h1 className={`uppercase ${styles._info_header}`}>contact info</h1>
      <div className={`${styles._info_list}`}>
        <p className={`${styles._list_item}`}>Phone: 1234567890</p>
        <p className={`${styles._list_item}`}>Email: company@email.com</p>
        <p className={`${styles._list_item}`}>Location: 100 Smart Street, LA, USA</p>
      </div>
      
    </div>
  )
}

const SocialLinks = () => {
  return (
    <div className={`${styles.social_links}`}>            
      <div>              
        <a href="#"><Image src={SocialIconFb}  height={24} width={24}/></a>              
      </div>
      <div>
        <a href="#"><Image src={SocialIconTwtter}  height={24} width={24}/></a>              
      </div>
      <div>
        <a href="#"><Image src={SocialIconInstagram}  height={24} width={24}/></a>              
      </div>
      <div>
        <a href="#"><Image src={SocialIconLinkedin} height={24} width={24}/></a>              
      </div>
    </div>
  )
}

const Newsletter = () => {
  return (
    <div className={`${styles.newsletter}`}>
      <div>
        <h3 className={`uppercase ${styles.title}`}>newsletter</h3>
        <h4 className={`capitalize ${styles.subtitle}`}>stay upto date</h4>
      </div>
      <form className={` ${styles.newsletter_input_form}`}>
        <input type='text' placeholder='Your Email...'/>
        <button className={`${styles.send_btn} round cursor-pointer`}>
          <Image src={'icons/ph_paper-plane.svg'} height={26} width={26} />
        </button>
      </form>      
    </div>
  )
}

const Copywrite = () => {
  return (
    <div className={`${styles.copywrite} footer-container`}>
        <span>&#169;</span> <span> </span>
        2023 bedbd | All rights reserved
    </div>
  )
}