import LucidIcon from "@/components/LucidIcon";
import copyToClipboard from "@/components/Utility/copyToClipboard";

export default function Congrats({data}) {
    
    // const [propertyUrl, setPropertyUrl] = useState('https://maps.google.com/?q=')

    // useEffect(()=>{
    //     let ignore = false
    //     if(!ignore && data['location'])
    //         setPropertyUrl(`https://maps.google.com/?q=${data['location']['lat']},${data['location']['lng']}`)
    //     return ignore = true 
    // }, [])
    // `https://maps.google.com/?q=${data[location]['lat']},${data[location]['lng']}`

  return (
    <div className='w-100 h-max-content absolute-center top-0 max-width-1280 fw-regular-dark'>
        <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px p-top-56px'>
            <h3 className='clr-secondary-400 txt-align-center fw-bold fs-875'>Congratulation</h3>
            <p className='txt-align-center fs-600'>
                Your property has listed successfully.
            </p>
            <div className='mr-top-64px mr-btm-64px'>
                <h2 className='clr-neutral-700 fs-500 mr-btm-14px'>You can share it now.</h2>
                <div className='p-16px-24px border-neutral-500 radius-8 position-relative fs-regular fs-400'>
                    <p>{`https://maps.google.com/?q=${data['location']['lat']},${data['location']['lng']}`}</p>
                    <button 
                        onClick={()=> copyToClipboard(`https://maps.google.com/?q=${data['location']['lat']},${data['location']['lng']}`)}
                        className='position-absolute top-50 translateY-50 right-24px no-border no-outline bg-transparent cursor-pointer'>
                        <LucidIcon className=' opacity-0_70 ' name='copy'  size={24}/>
                    </button>
                    
                </div>
            </div>
            {/* <p className="fs-regular clr-neutral-500 txt-align-center fs-400">Your property has listed successfully</p>         */}
        </div>
    </div>
  )
}
