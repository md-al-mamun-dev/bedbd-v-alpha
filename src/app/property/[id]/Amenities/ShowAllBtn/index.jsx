'use client'
import styles from './index.module.css'
import { useEffect, useState } from 'react'

const ShowAllBtn = ({contentContainerId, itemCount}) => {
    const [showAllAmenities, setShowAllAmenities] = useState(false)

    const showMoreBtnClickHandlar = ()=> setShowAllAmenities(!showAllAmenities) 

    // Hide more then 6 element of amenities
    useEffect(() => {
        const amenities = document.getElementById(contentContainerId);
        if(amenities){
            const amenityItems = Array.from(amenities.children);
            if (!showAllAmenities) {
                amenityItems.slice(6).forEach(item => {
                    item.style.display = 'none';
                });
            }else if(showAllAmenities){
                amenityItems.slice(6).forEach(item => {
                    item.style.display = 'flex';
                })
            }
        }
        
    }, [showAllAmenities]);

  return (
            <button className={`${styles.btn} ${ showAllAmenities ? styles.show_less : styles.show_all_btn} `} onClick={showMoreBtnClickHandlar} >
                {showAllAmenities ?  ' ...view less' : `Show All ${itemCount} Amenities`}
            </button>
        
    )
}

export default ShowAllBtn