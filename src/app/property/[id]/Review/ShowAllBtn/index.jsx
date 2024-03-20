"use client"
import { useEffect, useState, useRef } from 'react'
import styles from './index.module.css'

const ShowAllBtn = ({contentId, reviewCount}) => {

    const [reviewHidden, setReviewHidden] = useState(false)

    const reviewsRef = useRef(null)

    const onClickHandlar =()=> {

        if(reviewHidden){
            const hiddenReview = Array.from(reviewsRef.current.children).filter(
                review => (window.getComputedStyle(review).display === 'none' && review.tagName.toLowerCase() !== 'button')
              );
            hiddenReview.forEach((review, index) => {
                review.style.display = 'block';
              });
              setReviewHidden(false)
        }
        else{
            const reviewsArray =  Array.from(reviewsRef.current.children).filter(
                review => review.tagName.toLowerCase() !== 'button');
            reviewsArray.forEach((review, index) => {
                if(index>1 && !(review.tagName.toLowerCase() === 'button')){
                    review.style.display = 'none';                    
                }
            })
            setReviewHidden(true)
        }
    }


    useEffect(()=>{
        const reviews = document.getElementById(contentId);
        
        if(reviews){
            reviewsRef.current = reviews;
            const reviewsArray = Array.from(reviews.children);
            reviewsArray.forEach((review, index) => {
                if(index>1 && !(review.tagName.toLowerCase() === 'button')){
                    review.style.display = 'none';                    
                }
            })
            setReviewHidden(true)
        }
      
    }, [])

  return (
    <button onClick={onClickHandlar} className={`${reviewHidden ? styles.show_btn : styles.hide_btn}`}>
       { reviewHidden ?  'Show '+ (reviewCount - 2)  +' more Reviews' : '...show less'  }
    </button>

  )
}

export default ShowAllBtn