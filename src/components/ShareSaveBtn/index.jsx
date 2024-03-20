"use client"
import styles from './index.module.css';
import LucidIcon from '@/components/LucidIcon';

const ShareSaveBtn = () => {
    return (
        <div className={`${styles.btn_group} ${styles.share_btn}`}>
            <button className={`${styles.btn} ${styles.share_btn}`}>
                <LucidIcon className={`${styles.btn_icon}`} name='share-2'/> Share
            </button>
            <button className={`${styles.btn} ${styles.save_btn}`}>
                <LucidIcon className={`${styles.btn_icon}`} name='heart'/> Save
            </button>                           
        </div>        
    )
  }
  
  export default ShareSaveBtn