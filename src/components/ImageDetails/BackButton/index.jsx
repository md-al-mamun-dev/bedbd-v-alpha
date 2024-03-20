'use client'
import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'
import closeImgContainer from '../lib/closeImgContainer'

const BackButton = ({containerId}) => {
  const handleClick = ()=>{
    closeImgContainer(containerId)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
    // const imageDetails = document.getElementById(containerId);
    //   if (imageDetails) 
    //     imageDetails.style.display = 'none';
  }

  return (
    <button className={` ${styles.back_button}`} onClick={handleClick}>            
      <LucidIcon className={` ${styles.back_btn_icon}`} name='chevron-left' size={24} /> Back
    </button>
  )
}

export default BackButton