import styles from './index.module.css';
import LucidIcon from '@/components/LucidIcon';
import Image from 'next/image';
import { numberToWords } from '@/components/Utility/numberToWords';
import ContacHostBtn from './ContacHostBtn';
import storageService from '@/service/StorageService';

const Host = ({data, reviewCount}) => {
    const host = data[0]
    console.log(host)

    const calculateResponseTime = (responseTime)=>{         
        const resTime = responseTime /3600000
        const floorValue = Math.floor(resTime);
        const ceilValue = Math.ceil(resTime);    
        // Calculate the fractions
        const fractionToFloor = resTime - floorValue;
        const fractionToCeil = ceilValue - resTime;    
        return (fractionToFloor < fractionToCeil) ? floorValue : ceilValue
    }

    return  <>
                <div className={`${styles.host}`}>
                    <div className='flex gap-16'>
                        <div className={`${styles.image_wrapper}`}>
                            <Image className={`${styles.host_image}`} src={storageService.getProfileImage(host['profilePhoto'])} height={72} width={72}/>
                        </div>
                        <div className={`${styles.host_title_badge}`}>
                            <h3 className={`${styles.host_name}`}>{ 'Hosted By'+' '+ host['name']}</h3>
                            <div className={`${styles.host_badges}`}>
                                {
                                    host['badges'].map(
                                        badge=>(
                                            <div className={`${styles.badge_item}`}>
                                                {
                                                    (badge['icon']['type'] === 'lucidicon')
                                                        && <LucidIcon className={`${styles.badge_icon}`} name={badge['icon']['name']} size={24}/> 
                                                        // : <Image className={`${styles.badge_icon}`} src={item['icon']['link']}  height={24} width={24}/>
                                                }
                                                <div>{badge['badgeName']}</div> 
                                            </div>                                                                 
                                            )
                                        )
                                }

                                <div>{ reviewCount > 0 && `( ${reviewCount} Reviews )` }</div>
                            </div>
                        </div>
                    </div>
                    { !(host['description'] === null) && <div>{host['description']}</div>}

                    {/* <div className={`${styles.special_points} flex flex-column gap-16 `}>
                        <div className='flex flex-row gap-16 '>
                            <LucidIcon name='award' size={24}/>
                            Response Rate: {data['responseRate'] }%
                        </div> 
                        <div className='flex flex-row gap-16 '>
                            <LucidIcon name='award' size={24}/>
                            Response time: within {(numberToWords(calculateResponseTime(data['responseTime'])) === 'one'?'an': numberToWords(calculateResponseTime(data['responseTime'])) )  } hour
                        </div>
                    </div> */}
                    {/* <ContacHostBtn/> */}
                </div>    
            </> 
    
        
}

export default Host