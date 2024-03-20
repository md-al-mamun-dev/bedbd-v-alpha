import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'
import timeSubtraction from '@/components/Utility/timeSubtraction'

const HomeRules = ({data}) => {
// let rules = []

// const generatePeopleRestriction = (restrictionData)=>{
//     if( (restrictionData['isMaleRestricted'] ^ restrictionData['isFemaleRestricted'] ) === 1){
//         if(restrictionData['isMaleRestricted']){
//             rules.push( <div className='flex gap-16'>
//                             <LucidIcon name='info' size={24} />
//                             <div>only for<span>Female</span>
//                             </div> 
//                         </div> )
//         }
//         if(restrictionData['isFemaleRestricted']){
//             rules.push( <div className='flex gap-16'>
//                             <LucidIcon name='info' size={24} />
//                             <div>only for <span>Male</span>
//                             </div>
//                         </div> )
//         }
//     }
// }

// const generateTimeRules =(timeData)=>{
//     const userTimeOffset = new Date().getTimezoneOffset() / 60
//     const CheckInTimeArr = timeData['checkInTime'].split(':')
//     const CheckOutTimeArr = timeData['checkOutTime'].split(':')
//     const checkInTime = timeSubtraction(CheckInTimeArr[0], userTimeOffset)
//     const checkOutTime = timeSubtraction(CheckOutTimeArr[0], userTimeOffset)

//     rules.push( <div className='flex gap-16'> 
//                     <LucidIcon name='info' size={24} /> 
//                     <div> Check In: <span>{ checkInTime } </span> 
//                         {`(GMT ${ userTimeOffset > 0 ? '-'+ userTimeOffset : '+'+ (-userTimeOffset ) } )`} 
//                     </div>
//                 </div>)

//     rules.push( <div className='flex gap-16'> 
//                     <LucidIcon name='info' size={24} /> 
//                         <div> Check Out: <span>{ checkOutTime } </span> 
//                             {`(GMT ${ userTimeOffset > 0 ? '-'+ userTimeOffset : '+'+ (-userTimeOffset)  } )`} 
//                         </div> 
//                 </div>)
// }
// generatePeopleRestriction(data['people-restriction'])
// generateTimeRules(data['time-rules'])

  return (
    <div>
        <h3 className={`${styles.title}`}>Home rules</h3>
        <div className={`${styles.rules}`}>
            {
                data.map(item=>(
                <div className='flex gap-16'>
                    <LucidIcon name='info' size={24} />
                    <div>
                        {item['title']}
                    </div>
            </div>))
            }

            
        </div>
    </div>
  )
}

export default HomeRules