'use client'
import { useEffect, useRef } from 'react'
import styles from './index.module.css'
import openImgContainer from '@/components/ImageDetails/lib/openImgContainer'
import scrollToImg from '@/components/ImageDetails/lib/scrollToImg'
// import Image from 'next/image'


const MorePhotoBtn = ({imageDetailContainerId, moreImageCount, imgIdPrefix}) => {

    const handleImageClick = ()=>{
        openImgContainer(imageDetailContainerId)
        scrollToImg(4)
        // const imgDetailsContainer = document.getElementById(imageDetailContainerId);
        // if(imgDetailsContainer){
        //     imgDetailsContainer.style.display = 'block';
        // }
        // console.log(imgIdPrefix+4)
        
        // console.log(targetDiv)

        // Scroll to the target div
        
    }

  return (<button className={`${styles.more_photo_btn}`} onClick={e =>handleImageClick(4)}>
            +{moreImageCount}
            <div>more<div>Photos</div></div>
        </button>)
}

export default MorePhotoBtn