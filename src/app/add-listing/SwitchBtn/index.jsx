
import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'


export default function SwitchBtn({data, previousPage, nextPage, isContinueBtnDisable}) {
  return (
    <div className={`${styles.switch_btn_grp} flex mr-top-40px gap-32px w-100 justify-content-center `}>
      <button className={`${styles.btn} ${styles.step_back_btn} flex radius-8 p-t-150 p-b-150 cursor-pointer fs-400 fw-regular-dark gap-16px clr-primary bg-neutral-000 p-l-30px p-r-30px border-primary-1`} onClick={()=>previousPage()}>
            <LucidIcon name='chevron-left'className='clr-primary-400' size={24} />
            Back
      </button>
      <button className={`${styles.btn} ${styles.continue_btn} ${ !isContinueBtnDisable ? 'btn-primary': 'btn-disable'}  w-100 max-width-428px`}  onClick={()=>nextPage()}>Continue</button>
    </div>)
}


