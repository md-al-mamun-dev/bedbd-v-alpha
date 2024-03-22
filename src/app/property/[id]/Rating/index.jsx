import styles from './index.module.css';
import Image from 'next/image';
import LucidIcon from '@/components/LucidIcon';


function getRating(data) {
    const ratings = data.reduce((acc, obj) => {
        for (let key in obj) {
            if (acc[key] === undefined) {
                acc[key] = obj[key];
            } else {
                acc[key] += obj[key];
            }
        }
        return acc;
    }, {});

    for (let key in ratings) {
        ratings[key] = Math.round(ratings[key] / data.length);
    }

    let averageRating = 0;
    for (let key in ratings) {
    averageRating += ratings[key];
    }
    averageRating /= Object.keys(ratings).length;

    return {average:averageRating.toFixed(1), ratings: ratings}
}

const Rating = ({ data }) => {


    const {average, ratings} = getRating(data)

    // const rating = data.reduce((acc, obj) => {
    //                 for (let key in obj) {
    //                     if (acc[key] === undefined) {
    //                         acc[key] = obj[key];
    //                     } else {
    //                         acc[key] += obj[key];
    //                     }
    //                 }
    //                 return acc;
    //             }, {});
    // for (let key in rating) {
    //     rating[key] = Math.round(rating[key] / array.length); // Round to integer
    // }


    // let averageRating = 0;
    // for (let key in rating) {
    //     averageRating += rating[key];
    // }
    // averageRating /= Object.keys(rating).length;



    const allReviews = []


    // star_primary_color_border.svg

    for (let key in ratings) {
        if (ratings.hasOwnProperty(key)){
            allReviews.push(
                <div key={key} className={`${styles.rating_item}`}> {key}
                    <div className={`${styles.rating_stars}`}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Image className={`${styles.star_icon}`} src={`/icons/${(index < ratings[key])?'star_primary_color_fill.svg':'star_primary_color_border.svg'}`} height={20} width={20} /> 
                            
                            // index < rating[key]
                            //     ?   <Image className={`${styles.star_icon}`} src={`/icons/star_primary_color_fill.svg`} height={20} width={20} /> 
                            //     :   <Image className={`${styles.star_icon}`} src={`/icons/star_primary_color_border.svg`} height={20} width={20} />
                            
                            // index < rating[key]
                            //     ?   <Image className={`${styles.star_icon}`} src={`/icons/star_primary_color_fill.svg`} height={20} width={20} /> 
                            //     :   <LucidIcon className={`${styles.star_icon}`} name='star' size={21} color='#FF8515'/>

                            // <LucidIcon className={`${styles.icon}`} name='arrow-right' size={36} color='#FFFFFF'/>
                        ))}
                        <span>{parseFloat(ratings[key]).toFixed(1)}</span>
                    </div>
                    
                 </div>
            )
        } 
        
    }


    // const countCurrentRating = (Object.values(ratings).reduce((accumulator, currentValue) => (accumulator + currentValue), 0) / Object.keys(ratings).length).toFixed(1)
    






  return (
    <div className={`${styles.rating}`}>
        <div className={`${styles.title}`}>
            Rating
            <Image className={`${styles.star_icon}`} src='/icons/star_primary_color_fill.svg' height={20} width={20} />    
            <span>  {average} </span> 
            {/* <span>&#40;</span>  <span>&#41;</span> */}
        </div>
        <div className={`${styles.rating_details}`}>
            { allReviews }
        </div>

    </div>
  )
}

export default Rating