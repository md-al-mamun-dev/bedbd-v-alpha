import styles from './index.module.css'
import Image from 'next/image'

const HostImg = async () => {
    const img = await import('@/../public/images/sample_host_img.jpeg')

  return (
    <div className={`${styles.host_img}`}>
        <Image src={img} />
    </div>
  )
}

export default HostImg