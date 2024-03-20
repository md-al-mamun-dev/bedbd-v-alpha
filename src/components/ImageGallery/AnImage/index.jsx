'use server'
import styles from './index.module.css'
import Image from "next/image"
import ImageClickBtn from "./ImageClickBtn"
import storageService from '@/service/StorageService'

const AnImage = async ({ imgDetailContainerId, imgId, data}) => {
  // const imgSrc = await import(`@/../public${data['imageUrl']}`)
  // const imgSrc = storageService.getPropertyImage(data)
  const imgSrc = storageService.getPropertyImage(data)

  const imgIdArr = imgId.split('_')
  return (
        <div className={`${styles.image_wrapper}`}>
            <Image id={imgId} src={imgSrc} fill objectFit='cover'/> 
            <ImageClickBtn imageId={imgIdArr[imgIdArr.length - 1]} imgDetailContainerId={imgDetailContainerId} />
        </div>
  )
} 

export default AnImage