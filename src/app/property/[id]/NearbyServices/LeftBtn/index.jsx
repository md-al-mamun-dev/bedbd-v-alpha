"use client"
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'

const LeftBtn = ({contentId}) => {
    let container
    const leftBtnClickHandlar =()=>{
        if(container){
            container.scrollLeft = (container.scrollLeft - 200);
        }
    }

    useEffect(()=>{
        container =  document.getElementById(contentId) 
    }, [])


  return (
    <div className={`${styles.left_btn_wrapper} `}>
        <button onClick={leftBtnClickHandlar} > <LucidIcon className={`${styles.icon}`} name='arrow-left' size={36} color='#FFFFFF'/> </button>
    </div>
  )
}

export default LeftBtn