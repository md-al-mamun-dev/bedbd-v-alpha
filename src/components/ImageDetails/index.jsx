import styles from './index.module.css'
import BackButton from './BackButton'
import ShareSaveBtn from '../ShareSaveBtn'
import Image from 'next/image'
import ImageClick from './AnImage/ImageClick'
import AnImage from './AnImage'

const PropertyImageDetails = ({containerId, data}) => {
  const imagesDetailsId = 'img_details'

  return (
    <div id='img_details' className={` ${styles.image_details}`}>
      <div className={` ${styles.container  }`}>
        <div className={`flex flex-align-center flex-space-between ${styles.top_bar}`}>
          <BackButton containerId = {containerId}/>
          <ShareSaveBtn/>
        </div>
        <div className={`${styles.images}`}>
          {
            data.map( async (imgData, idx) =>{
              const image_id = `detail_image_${idx}`
                  return <AnImage key={idx} imgId={image_id} data = {imgData}/>
                })
          }
        </div>
      </div>      
    </div>
  )
}

export default PropertyImageDetails