"use client"
import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'

const BrowseBtn = ({type}) => {
  return (
    <button className={`flex-center gap-8 p-8 br-8 border-neutral-300 bg-transparent ${styles.btn_browse}`}>
        <LucidIcon name='upload' size={24} />
        Browse
    </button>
  )
}

export default BrowseBtn