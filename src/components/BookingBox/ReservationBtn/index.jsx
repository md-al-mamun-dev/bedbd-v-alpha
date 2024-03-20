'use client'
import { useEffect, useState } from 'react'
import styles from './index.module.css'

const ReservationBtn = () => {
  return (
    <div className={` ${styles.btn_wrapper}`}>
      <button className={`${styles.reserve_now_btn}`} >
          Reserve Now
      </button>
    </div>
)
}

export default ReservationBtn