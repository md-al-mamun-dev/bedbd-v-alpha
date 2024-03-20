import styles from './index.module.css'
import BrowseBtn from '../BrowseBtn'

const CoverImg = () => {
  return (
    <div className={`${styles.cover_img_wrapper}`}>
      <BrowseBtn type='cover'/>
    </div>
  )
}

export default CoverImg