"use client"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LucidIcon from "@/components/LucidIcon"
import styles from './index.module.css'
import FavouriteBtn from "./FavouriteBtn"
import LeftArrowBtn from "./LeftArrowBtn"
import RightArrowBtn from "./RightArrowBtn"
import { useRef } from "react"




const ImageSlider = ({images}) => {
  const imageSliderRef = useRef(null);
  const handleScroll = (direction) => {
    const scrollContainer = imageSliderRef.current;

    if (scrollContainer) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainer.scrollLeft += scrollAmount;
    }
  };

  return (
        <div className={`${styles.slider}`}>
          <div className={`${styles.images}`} ref={imageSliderRef} >
            {
              images?.map(img =>( <div className={`${styles.img_wrapper}`}>
                                    <Image alt={img.imageTitle} src={img.imageUrl} fill />
                                  </div> ) )
            }
          </div>
          <FavouriteBtn />
          <LeftArrowBtn scrollHandlar={handleScroll} />
          <RightArrowBtn  scrollHandlar={handleScroll} />          

        {/* navigation dot  */}
      {/* <div className={`${styles.slider_nav}`}>
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
      </div> */}
        
        </div>
  )
}

export default ImageSlider