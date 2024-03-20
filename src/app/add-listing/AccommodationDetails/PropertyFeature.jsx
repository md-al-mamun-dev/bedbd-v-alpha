// import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'

export default function PropertyFeature({data, isChecked, toggleSelection}) {

  return (
    <div className='max-w-600px p-8px-20px-8px-56px border-neutral-300 radius-100 position-relative cursor-pointer mr-btm-8px mr-t-16px' onClick={()=>toggleSelection(data['typeName']) }>                    
      <LucidIcon className='position-absolute left-16px top-8px' name={`${ isChecked ? 'check-square': 'square' }`}/>
      <h3 className='fs-600 fw-semi-bold clr-neutral-600 p-btm-8px'>{data['typeName']}</h3>
      <p className='fs-regular fw-regular-dark clr-neutral-500'>{data['typeDescription']}</p>
    </div>
  )
}
