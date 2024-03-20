"use client"
import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'

const MoreBtn = () => {
  return (
    <button className='p-8 bg-transparent no-outline no-border'>
        <LucidIcon name='more-vertical' size={24}/>
    </button>
  )
}

export default MoreBtn
