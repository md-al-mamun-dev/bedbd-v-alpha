'use client'
import SwitchBtn from '../SwitchBtn'
import styles from './index.module.css'
import Image from 'next/image'
// import SwitchBtn from '../SwitchBtn'
// import SwitchBtn from '../SwitchBtn'

const DescriptionInput = () => {
  return (
    <div className=' w-100 absolute-center max-width-1280'>
        <h3 className={`${styles.heading}`}>Property Name</h3>

        <div className={`${styles.input_fields}`}>
          <div className={`${styles.input_items}`}>
            <label className={`${styles.input_lebel}`} for="">Property Title</label>
            <input className={`${styles.txt_input}`}  placeholder='Ex; Ahasan Manjil'/>
            <p className={`${styles.info}`}>Choose a catchy title in 40 characters</p>
          </div>

          <div className={`${styles.input_items}`}>
            <label className={`${styles.input_lebel}`} for="">Property Description</label>
            <textarea className={`${styles.txt_input}`} placeholder='Optional'/>
            {/* <p className={`${styles.info}`}>Choose a catchy title in 40 characters</p> */}
          </div>
        </div>
        
        <SwitchBtn/>
            

    </div>
  )
}

export default DescriptionInput