"use client"
import styles from './index.module.css'

const SaveBtn = ({data}) => {

  // 
  return (
    <button className={`w-285 h-48 txt-align-center ${data['isActive']?'bg-primary-400 btn-hover-shadow':'bg-primary-a_50' }  clr-neutral-000  border-none fs-regular fw-regular-dark br-8`}>Save</button>
  )
}

export default SaveBtn