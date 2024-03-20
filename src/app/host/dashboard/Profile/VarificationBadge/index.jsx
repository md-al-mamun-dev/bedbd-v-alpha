import styles from './index.module.css';
import LucidIcon from '@/components/LucidIcon';

const VarificationBadge = ({data}) => {
  return (
    data['isVarified']
        ?   <LucidIcon className='clr-secondary-400' name='badge-check' size={24}  />
        :<div className={`absolute-v-center fs-regular fw-regular-dark right-16 flex-center gap-16 `}>
            <LucidIcon className={`clr-neutral-300 ${styles.not_checked_icon}`} name='badge-check' size={24}  /> 
            <span className={`relative ${styles.not_varified_msg}`}>Verify Now</span>            
        </div>
  )
}

export default VarificationBadge