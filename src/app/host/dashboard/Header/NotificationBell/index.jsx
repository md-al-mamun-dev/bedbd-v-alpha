"use client"
import styles from './index.module.css'
import Image from 'next/image'
import logoImg from '@/../public/logo.png'
import { useState } from 'react'
import LucidIcon from '@/components/LucidIcon'
import notificationBellDot from '@/../public/icons/bell-dot.svg'

const NotificationBell = () => {
const [hasNotification, setHasNotification] = useState(true)

  return (
    <div className={`${styles.notification_bell}`}>
      {
        hasNotification 
          ? <Image src={notificationBellDot} height={24} width={24}/>      
          : <LucidIcon name='bell' size={24}/>
      }
      
    </div>
  )
}

export default NotificationBell