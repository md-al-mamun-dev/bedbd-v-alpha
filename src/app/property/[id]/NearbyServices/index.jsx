import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'
import RightBtn from './RightBtn'
import LeftBtn from './LeftBtn'

const NearbyServices = () => {

    const serviceContainerId = 'nearby_services_id'

    const data = [
                    {
                        'name': 'Grill Restro & Bar',
                        'distance': 100,
                        'distanceUnit':'m'
                    },
                    {
                        'name': 'Pizza Hut',
                        'distance': 200,
                        'distanceUnit':'m'
                    },
                    {
                        'name': 'Grill Restro & Bar',
                        'distance': 100,
                        'distanceUnit':'m'
                    },
                    {
                        'name': 'Pizza Hut',
                        'distance': 200,
                        'distanceUnit':'m'
                    },{
                        'name': 'Grill Restro & Bar',
                        'distance': 100,
                        'distanceUnit':'m'
                    },
                    {
                        'name': 'Pizza Hut',
                        'distance': 200,
                        'distanceUnit':'m'
                    },
                    {
                        'name': 'Grill Restro & Bar',
                        'distance': 100,
                        'distanceUnit':'m'
                    },
                    {
                        'name': 'Pizza Hut',
                        'distance': 200,
                        'distanceUnit':'m'
                    }
                ]


  return (
    <div  className='relative'>
        <h3 className={`${styles.title}`}></h3>
        
        <div id={serviceContainerId} className={`${styles.services}`}>
            
            {
                data.map(
                    item => 
                        <div className={`${styles.services_item}`}> 
                            <div className={`${styles.title}`}>{item['name']}</div> 
                            <div className={`${styles.distance}`}>{item['distance'] + item['distanceUnit']}</div>
                        </div>
                    )
            }
        </div>
        <LeftBtn contentId={serviceContainerId}/>
        <RightBtn contentId={serviceContainerId}/>
    </div>
    )
}

export default NearbyServices