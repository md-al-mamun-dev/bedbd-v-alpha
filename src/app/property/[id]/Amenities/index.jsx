import styles from './index.module.css'
import Image from 'next/image'
import LucidIcon from '@/components/LucidIcon'
// import LucidIcon from '@/components/LucidIcon'
import ShowAllBtn from './ShowAllBtn'
import { Square } from 'lucide-react';
// import icon from '@/../public/icons'

// import someImage from '@/../public'
const icons = [
    {
        title:'kitchen',
        iconType:'lucidicon',
        iconname:'cooking-pot'
    },
    {
        title:'Television with Netflix',
        iconType:'lucidicon',
        iconName:'tv'
    },
    {
        title:'Air Conditioner',
        iconType:'lucidicon',
        iconName:'air-vent'
    },
    {
        title:'Free Wireless Internet',
        iconType:'lucidicon',
        iconName:'wifi'
    },
    {
        title:'Washer',
        iconType:'lucidicon',
        iconName:'shirt'
    },
    {
        title:'Balcony or Patio',
        iconType:'local-link',
        link:'@/../public/icons/balcony.svg'
    },
    {
        title:'Kitchen',
        iconType:'lucidicon',
        iconName:'cooking-pot'
    },
    {
        title:'Television with Netflix',
        iconType:'local-link',
        link:'@/../public/icons/tv.svg'
    },
    {
        title:'Air Conditioner',
        iconType:'local-link',
        link:'@/../public/icons/air_conditioner.svg',
        iconName:'air-vent'
    },
    {
        title:'Free Wireless Internet',
        iconType:'lucidicon',
        iconName:'wifi'
    },
    {
        title:'Washer',
        iconType:'local-link',
        link:'@/../public/icons/laundry.svg'
    },
    {
        title:'Balcony or Patio',
        iconType:'local-link',
        link:'@/../public/icons/balcony.svg'
    }

]

const Amenities = ({data}) => {
    const amenitiesContainerId = 'all-amenities'
    const renderAmenities = 
        data.map(
            (item, index)=> (                                    
                                <div className={`${styles.amenity_item} `}>
                                    {
                                        // item.icon.type.includes('lucidicon') 
                                        //     && <LucidIcon className={`${styles.amenities_icon}`} name={ item['icon']['name']} size={24} />
                                            // : <Image src={`@/../public${item['icon']['link']}`} className={`${styles.amenities_icon_image}`} height={24} width={24}/>
                                    }
                                    {/* className={`${styles.amenities_icon}`} */}
                                    {/* <LucidIcon  name={'square-check'} size={24} /> */}

                                    <div className={`${styles.amenities_title}`}>{item['title']}</div>
                                </div>
                            )
            )


  return (
    <div className={`${styles.amenities}`}>
        <h3 className={`${styles.title}`}>Offered Amenities</h3>
        <div id={amenitiesContainerId}>
            {
                 data.map(
                    (item, index)=> (                                    
                                        <div className={`${styles.amenity_item} `}>
                                            {
                                                // item.icon.type.includes('lucidicon') 
                                                //     && <LucidIcon className={`${styles.amenities_icon}`} name={ item['icon']['name']} size={24} />
                                                    // : <Image src={`@/../public${item['icon']['link']}`} className={`${styles.amenities_icon_image}`} height={24} width={24}/>
                                            }
                                            {/* className={`${styles.amenities_icon}`} */}
                                            <LucidIcon className='min-w-24px min-h-24px'  name={'check'} size={24} />
                                            <div className={`${styles.amenities_title}`}>{item['title']}</div>
                                        </div>
                                    )
                    )
            }
        </div>
        {data.length > 6 && <ShowAllBtn contentContainerId={amenitiesContainerId} itemCount={data.length}/>}
    </div>
    )
}

export default Amenities