import styles from './index.module.css'
import React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageSlider from './ImageSlider'
import FavouriteBtn from './ImageSlider/FavouriteBtn'


const ListingItem = ({}) => {

  const images = [
    {
        imageTitle:'Living room',
        imageUrl: '/images/4eabfbe482568e48247e3a0119a702ca.jpeg',
        content:'',
        tags:' ' 
    },
    {
        imageTitle:'Decoration',
        imageUrl: '/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
        content:'',
        tags:' ' 
    },
    {
        imageTitle:'Bedroom',
        imageUrl: '/images/edd4ba000bdfa85be11654df3de4ccf3.jpeg',
        content:'',
        tags:' ' 
    },
    {
        imageTitle:'Dining room',
        imageUrl: '/images/ff4537db926dfeb0067a37eecda96e8f.jpeg',
        content:'',
        tags:' ' 
    },
    {
        imageTitle:'front view',
        imageUrl: '/images/edd4ba000bdfa85be11654df3de4ccf3.jpeg',
        content:'',
        tags:' ' 
    },
    {
        imageTitle:'front view',
        imageUrl: '/images/ff4537db926dfeb0067a37eecda96e8f.jpeg',
        content:'',
        tags:' ' 
    },
    {
        imageTitle:'front view',
        imageUrl: '/images/edd4ba000bdfa85be11654df3de4ccf3.jpeg',
        content:'',
        tags:' ' 
    },
    {
        imageTitle:'front view',
        imageUrl: '/images/ff4537db926dfeb0067a37eecda96e8f.jpeg',
        content:'',
        tags:' ' 
    }
  ]




  return (
    <div className={`${styles.listing_item} z-index-0`} >
        
        <ImageSlider images={images} />

        
        <div className={`${styles.item_info}`}>
            <div className={`${styles.location_text}`}>{`Kuakata, Barishal`}</div>
            <div className={`${styles.availability}`}>{`Available/Not Available`}</div>
            <div className={`${styles.price} flex flex-align-center`}>
              <div className={` ${styles.currency_symbol}`}>$</div>
              <div className={` ${styles.price_value}`}>25</div>
            </div>
            <div className={`${styles.rating} flex flex-align-center`}>
              <div className={`${styles.star_symbol_wrapper}`}>
                <Image src={`icons/star.svg`} height={24} width={24} />
              </div>
              <div className={`${styles.rating_value}`}>{`4.8`}</div>
              <div className={`${styles.rating_count}`}>{`(20)`}</div>
          </div>
        </div>
      </div>
  )
}

export default ListingItem