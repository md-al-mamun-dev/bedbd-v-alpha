"use client"
import styles from './index.module.css'
import { ChevronRight } from 'lucide-react'
import LucidIcon from '@/components/LucidIcon'


const RightArrowBtn = ({ imageIndex,  changeImage ,  imageCount}) => {
  function onRightArrowBtnClickHandlar(){
    if(imageIndex< (imageCount+1)){
        changeImage(imageIndex+1)
    }
}

  return ((imageIndex < (imageCount-1)) && <div className={`${styles.icon_container} ${styles.right_arrow_icon}`}>
            <button onClick={onRightArrowBtnClickHandlar} className={` ${styles.icon_btn}`}>
              <div className={` ${styles.icon_img_wrapper} `}>
                <ChevronRight color="#ffffff" className=''/>
                {/* <LucidIcon className={`${styles.filter_icon}`} color="#ffffff" name='chevron-right'/> */}
              </div>
            </button>
          </div>)
}

export default RightArrowBtn