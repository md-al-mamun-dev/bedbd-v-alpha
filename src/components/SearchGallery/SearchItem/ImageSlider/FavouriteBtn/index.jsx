import styles from './index.module.css'
import React from 'react'
import Image from 'next/image'

const FavouriteBtn = () => {
  return (  <div className={`${styles.icon_container} ${styles.heart_icon}`}>
                <button className={` ${styles.icon_btn}`}>
                    <div className={` ${styles.icon_img_wrapper} `}>
                        <Image src={`/icons/heart_primary_clr.svg`} fill />
                    </div>
                </button>
            </div> )
}

export default FavouriteBtn