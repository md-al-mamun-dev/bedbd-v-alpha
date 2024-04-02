import styles from './index.module.css'
import React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageSlider from './ImageSlider'
import FavouriteBtn from './ImageSlider/FavouriteBtn'
import storageService from '@/service/StorageService'

function getRating(data) {
  const ratings = data.reduce((acc, obj) => {
      for (let key in obj) {
          if (acc[key] === undefined) {
              acc[key] = obj[key];
          } else {
              acc[key] += obj[key];
          }
      }
      return acc;
  }, {});

  for (let key in ratings) {
      ratings[key] = Math.round(ratings[key] / data.length); 
  }

  let averageRating = 0;
  for (let key in ratings) {
  averageRating += ratings[key];
  }
  averageRating /= Object.keys(ratings).length;

  return {average:averageRating.toFixed(1), ratings: ratings}
}

export default function SearchItem({data}) {
  const ratings = data['propertyRatingReview'].map(item => item['ratings']) || { amenities: 0, communication: 0, hygiene: 0, location: 0 }
  const { average, rating } = getRating(ratings) || {average:0, rating:0 }
  const images = data['images'].map(imgId=> storageService.getPropertyImage(imgId))

  return (
    <div className={`${styles.listing_item} z-index-0`} >
        
        <ImageSlider data ={images}/>

        
        <div className={`${styles.item_info}`}>
            <div className={`${styles.location_text}`}>{data['title']}</div>
            <div className={`${styles.availability}`}>{ data['isAvailable'] ?  'Available' : 'Not Available'}</div>
            <div className={`${styles.price} flex flex-align-center`}>
              <div className={` ${styles.currency_symbol}`}>{data['currency']}</div>
              <div className={` ${styles.price_value}`}>{data['rent']+data['tax']+data['serviceFee']  }</div>
            </div>
            <div className={`${styles.rating} flex flex-align-center justify-content-end`}>
              <div className={`${styles.star_symbol_wrapper}`}>
                <Image src={`icons/star.svg`} height={24} width={24} />
              </div>
              <div className={`${styles.rating_value}`}>{ average }</div>
              <div className={`${styles.rating_count}`}>{`(${ data['propertyRatingReview'].length })`}</div>
          </div>
        </div>
      </div>
  )
}
