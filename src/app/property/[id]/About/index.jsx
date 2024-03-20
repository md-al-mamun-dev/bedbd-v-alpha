import styles from './index.module.css';
import LucidIcon from '@/components/LucidIcon';

const About = ({data}) => {

    return  <div className={`${styles.about}`}>
                <h3 className={`${styles.about_title}`}>About the Apartment</h3>
                <div className={`${styles.about_items}`}>
                    {
                        data.map(item => (
                            <div className={`${styles.about_item}`}>
                                <LucidIcon className={`${styles.decorative_plus_icon}`} name='plus' size={24} />
                                <h4 className={`${styles.item_heading}`}>{item['title']}</h4>
                                {
                                    item['description']
                                    && <p className={`${styles.item_details}`}>{item['description']}</p>
                                    }
                                
                            </div>))
                    }
                </div>                
            </div>
        
}

export default About