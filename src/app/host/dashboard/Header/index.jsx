import styles from './index.module.css'
import Image from 'next/image'
import logoImg from '@/../public/logo.png'
import NotificationBell from './NotificationBell'
import AddNewProperty from './AddPropertyBtn'
import HostAvatar from './HostAvatar'

import React from 'react'

export default function Header() {
    const balance = 5264.00
    const availableBalance = new Intl.NumberFormat('en-US', {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            }).format(balance)

    const hostImageUrl = '/images/sample-profile-photo.jpg'
    return (
        <div className={`${styles.header} `}>
            <div className='container flex flex-align-center space-between padding-l-32 padding-r-32'>
                <div className={`${styles.logo_wrapper}`}>
                    <Image height={36} width={62} src={logoImg}/>
                </div>
                <div className='flex align-center gap-32'>
                    <NotificationBell/>
                    <div className={`${styles.balanceTxt}`}>
                        Available Balance:<span>{availableBalance}</span>
                    </div>
                    <AddNewProperty/>
                    <HostAvatar imgUrl={hostImageUrl}/>
                </div>
            </div>
        </div>
      )
}
