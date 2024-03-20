import styles from './index.module.css'
import Image from 'next/image'
const HostAvatar = ({imgUrl}) => {
  return (
    <div className={`${styles.img_wrapper}`}>
      <Image src={imgUrl} height={56} width={56}/>
    </div>
  )
}

export default HostAvatar