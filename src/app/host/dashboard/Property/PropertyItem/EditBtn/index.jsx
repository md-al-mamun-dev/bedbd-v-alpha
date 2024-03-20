'use client'
import LucidIcon from '@/components/LucidIcon'
import styles from './index.module.css'

const EditBtn = () => {
  return (
    <button className='p-8 bg-transparent no-outline no-border'>
      <LucidIcon name='file-pen' size={24}/>
    </button>
  )
}

export default EditBtn