import styles from './index.module.css'
import Image from 'next/image'
import ImageClick from './ImageClick'

const AnImage = async ({imgId, data}) => {

  const imgSrc = await import(`@/../public${data['imageUrl']}`)

  return (<div id={imgId} className={`${styles.img_wrapper}`}>
    <div style={{ position: 'relative' }} >
      <Image fill={true}  src={'/icon/avatar.svg'} alt='' />
    </div>
              {/* <Image layout='responsive' src={imgSrc}/> */}
              <ImageClick imageId={imgId}/>
          </div>)
}
export default AnImage