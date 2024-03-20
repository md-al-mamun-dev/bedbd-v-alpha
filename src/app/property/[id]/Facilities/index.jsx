import styles from './index.module.css';
import LucidIcon from '@/components/LucidIcon';

const Facilities = ({data}) => {

    const {roomCount, guestCount } =  data

    const _count = guestCount.map(item => (parseInt(item.split(' ')[0])) )
    const totalGuestnumber = _count.reduce((acc, curr) => acc + curr, 0)
    const minGuestCount = Math.max(..._count);

    
    // let guestText = ''
    // if(_count.length > 1){
    //     _count.
    // }

    // console.log(_count)

    // console.log(guestCount)
    const icons =    [
        {
            title:'bedroom',
            iconType:'lucidicon',
            iconName:'bed-double',
        },
        {
            title:'washroom',
            iconType:'lucidicon',
            iconName:'bath',
        },
        {
            title:'guests',
            iconType:'lucidicon',
            iconName:'users',
        },
        {
            title:'diningroom',
            iconType:'lucidicon',
            iconName:'utensils',
        },
        {
            title:'others',
            iconType:'lucidicon',
            iconName:'swatch-book',
        },
    ]

    return  <div className={`${styles.facilities_services}`}>
                {
                    roomCount.map(
                        item => {
                            const icon = icons.find(i => i['title']=== item.split(' ').splice(1).join('').toLowerCase())

                            return ( 
                                <div className={`${styles.service_item}`} >
                                    {
                                        icon 
                                            && ((icon['iconType'] === 'lucidicon') 
                                            &&  <LucidIcon name={icon['iconName']} size={32} />)
                                        // (icon['iconType'] === 'lucidicon')
                                        // && <LucidIcon name={icon['iconName']} size={32} />
                                        // (srv.icon.type === 'lucidicon') 
                                        // &&  <LucidIcon name={srv.icon.iconName} size={32} />
                                    }
                                    <h1>{item}</h1>
                                </div>
                            )}
                        )
                }
                {
                    <div className={`${styles.service_item}`} >

                        <LucidIcon name='users-round' size={32} />
                    <h1>{minGuestCount+'/'+totalGuestnumber+' Guests'}</h1>
                </div>
                }
            </div>
        
}

export default Facilities