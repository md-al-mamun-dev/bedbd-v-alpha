"use client"
import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'
import { useEffect } from 'react'

const RightBtn = ({contentId}) => {
  let container
  const rightBtnClickHandlar =()=>{
      if(container ){
          container.scrollLeft = (container.scrollLeft + 200);
      }
  }
useEffect(()=>{
  container =  document.getElementById(contentId)   
}, [])
  return (
    <div className={`${styles.right_btn_wrapper}`}>
        <button onClick={rightBtnClickHandlar} > <LucidIcon className={`${styles.icon}`} name='arrow-right' size={36} color='#FFFFFF'/> </button>
    </div>
  )
}

export default RightBtn