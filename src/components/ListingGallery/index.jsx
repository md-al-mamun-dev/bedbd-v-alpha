import styles from './index.module.css'
import Image from 'next/image'
// import listingItem from '../UIElements/ListingItem'
import ListingItem from '../UIElements/ListingItem'



export default function ImageGallery({data}){
  const galleryTitle = 'Properties'



  
  return (
    <div className={`z-index-1 full-width-container position-relative  ${styles.listing_gallery_container}`}>
      <div className='horizontal-center w-fit-content'>
        {galleryTitle &&  <div className={`${styles.title_container}`}>
                          <h2>{galleryTitle}</h2>
                        </div>}

        <div className={`${styles.listing_gallery} `}>
          {
            data.map(item => <ListingItem data={item}/>)
          }
        </div>
      </div>      
    </div>
  )
}
// export default ImageGallery