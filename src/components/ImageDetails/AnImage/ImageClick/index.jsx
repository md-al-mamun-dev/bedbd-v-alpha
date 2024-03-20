"use client"
import styles from './index.module.css'

const ImageClick = ({imageId}) => {

    const onBtnClickHandlar =()=>{
        console.log('btn clicked')
    }
  return (
    <button onClick={onBtnClickHandlar}/>
  )
}

export default ImageClick