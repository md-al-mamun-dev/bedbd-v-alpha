import styles from './index.module.css'
import EditBtn from './EditBtn'
import DltBtn from './DltBtn'
import MoreBtn from './MoreBtn'
import ShareBtn from './ShareBtn'
import PreviewBtn from './PreviewBtn'
import Image from 'next/image'



const PropertyItem = ({data, siNo, viewType}) => {

    return (
      <div className={` ${viewType === 'list' ? 'w-100 fw-regular-dark clr-neutral-400 grid grid-tmp-col-96-224-254-auto bg-neutral-000 radius-8 p-l-r-24 min-h-48 align-center':'radius-8 bg-neutral-000 h-fit-content flex flex-col overflow-hidden'}`}   >
        { viewType==='grid' && <Image src={data['thumbnailUrl']}  height={192} width={345}/>}   

        {
          viewType==='grid' 
            ? <div className='p-16 p-b-24'>
                <div className='clr-primary-400 fs-600 fw-regular-dark'>{data['name']}</div>
                <div className='clr-neutral-300 fw-regular-dark'>{data['address']}</div>
                <div className='flex space-between mr-t-24'>
                  <PreviewBtn/>
                  <div className='flex gap-8 mr-r-nv-8'>
                    <EditBtn  /> <DltBtn/> <ShareBtn/>  
                  </div>
                </div>
              </div>
            : <>
                <div>{siNo}</div>
                <div>{data['uid']}</div>
                <div>{data['name']}</div>
                <div className={`flex gap-16 min-w-100 justify-content-end`}>
                  <EditBtn/> <DltBtn/><MoreBtn/>
                </div>
              </>
        }        
      </div>
  )

}

export default PropertyItem