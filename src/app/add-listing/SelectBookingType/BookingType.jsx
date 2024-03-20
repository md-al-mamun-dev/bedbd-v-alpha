import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'

export default function BookingType({data, isChecked, toggleSelection}) {
  return (
    <div className={`${styles.socpe_item}`} onClick={()=>toggleSelection(data['title']) }>                    
        <LucidIcon className={`${styles.icon} `} name={`${ isChecked ? 'check-square': 'square' }`}/>
        <h3 className={`${styles.scope_title}`}>{data['title']}</h3>
        <p className={`${styles.details}`}>{data['description']}</p>
    </div>
  )
}
