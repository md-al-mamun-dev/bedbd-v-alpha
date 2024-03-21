"use client"
import Image from "next/image"
// import { ChevronLeft, ChevronRight } from "lucide-react"
import LucidIcon from "@/components/LucidIcon"
import styles from './index.module.css'
import FavouriteBtn from "./FavouriteBtn"
import LeftArrowBtn from "./LeftArrowBtn"
import RightArrowBtn from "./RightArrowBtn"
import { useEffect, useRef, useState } from "react"
// import dynamic from "next/dynamic"

// async function getImages(data) {
//   return data.map(async image =>  await import(image['href']))
// }


export default function ImageSlider({data}){


  // return <div>sample </div>

  // const images = await getImages(data)
  // console.log(images)

  const [imageIndex, setImageIndex] = useState(0)
  // const images = data.map(item=>)
  // const [images, setImages] = useState(data)
// const [image, setImage] = useState(data[0])

// useEffect(()=>{
//   let ignore = false
//   if(data.length>0 && !ignore){
//     const imgdata = data.map(i=> storageService.getPropertyImage(i))
//     console.log(imgdata)
//     setImageIndex(imgdata)
//   }

//   return ()=> ignore = true 
// }, [])

  // const imageSliderRef = useRef(null);
  // const handleScroll = (direction) => {
  //   const scrollContainer = imageSliderRef.current;

  //   if (scrollContainer) {
  //     const scrollAmount = direction === 'left' ? -200 : 200;
  //     scrollContainer.scrollLeft += scrollAmount;
  //   }
  // };

  return (
        <div className={`${styles.slider}`}>
          <div className={`${styles.images}`} >
          <div className={`${styles.img_wrapper}`}>                                    
            <Image src={data[imageIndex]} alt='property image' fill objectFit="cover"/>
          </div>
            {/* {              
              data?.map((img, idx )=>  <Image id={`image_${idx}`} src={img} alt='property image' fill objectFit="cover"/> )
            } */}
          </div>
          <FavouriteBtn />
          {/* scrollHandlar={handleScroll} */}
          <LeftArrowBtn imageIndex={imageIndex} changeImage={setImageIndex} imageCount={data.length}/>
          <RightArrowBtn   imageIndex={imageIndex} changeImage={setImageIndex} imageCount={data.length}/>          

        {/* navigation dot  */}
      {/* 
      <div className={`${styles.slider_nav}`}>
          <button className={`${styles.slider_nav_btn}`}>
            <div className={`${styles._dot}`}/>
          </button>
          <button className={`${styles.slider_nav_btn}`}>
            <div className={`${styles._dot}`}/>
          </button>
          <button className={`${styles.slider_nav_btn}`}>
            <div className={`${styles._dot}`}/>
          </button>
          <button className={`${styles.slider_nav_btn}`}>
            <div className={`${styles._dot}`}/>
          </button>
          <button className={`${styles.slider_nav_btn}`}>
            <div className={`${styles._dot}`}/>
          </button>
      </div> 
      */}
        
        </div>
  )
}

// export default ImageSlider