"use client"
import styles from './index.module.css'
import { ChevronLeft } from 'lucide-react'
// import LucidIcon from '@/components/LucidIcon'





const LeftArrowBtn = ({ imageIndex,  changeImage}) => {
    function onLeftArrowBtnClickHandlar(){
        if(imageIndex>0){
            changeImage(imageIndex-1)
        }
    }
  return ( (imageIndex > 0) && <div className={`${styles.icon_container} ${styles.left_arrow_icon}`}>

{/* <button onClick={()=>scrollHandlar('left')} className={` ${styles.icon_btn}`}> */}

            <button onClick={onLeftArrowBtnClickHandlar} className={` ${styles.icon_btn}`}>
                <div className={` ${styles.icon_img_wrapper} `}>
                    <ChevronLeft color="#ffffff"/>
                    {/* <LucidIcon className={`${styles.filter_icon}`} color="#ffffff" name='chevron-left'/> */}
                </div>
            </button>
        </div>)
}

export default LeftArrowBtn