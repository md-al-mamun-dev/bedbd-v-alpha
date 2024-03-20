import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'

const CopyBtn = () => {
  return (
    <button className='flex-center gap-8 clr-neutral-400 w-fit-content absolute-v-center right-16 bg-transparent border-none cursor-pointer '>
        <LucidIcon name='copy' size={24} />
        Copy
    </button>
  )
}

export default CopyBtn