import LucidIcon from "../LucidIcon"

export default function BackBtn({onBackBtnClick}) {
  return (
    <button onClick={onBackBtnClick} className='absolute top-32 left-32 bg-transparent border-none no-border cursor-pointer'>
        <LucidIcon name='arrow-left' size={24} />
    </button>
  )
}
