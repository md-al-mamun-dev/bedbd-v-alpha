import styles from './page.module.css'
import ImageGallery from '@/components/ImageGallery'
import ShareSaveBtn from '@/components/ShareSaveBtn'
import PropertyImageDetails from '@/components/ImageDetails'
import Facilities from './Facilities'
import About from './About'
import Amenities from './Amenities'
import HomeRules from './HomeRules'
import CancellationPolicy from './CancellationPolicy'
import Host from './Host'
import Rating from './Rating'
import Review from './Review'
import NearbyServices from './NearbyServices'
import BookingBox from '@/components/BookingBox'
import { ImageDetails } from './ImageDetails'
import propertyService from '@/service/PropertyService'
import storageService from '@/service/StorageService'
import PostReview from './PostReview'
// import { Client, Databases, Account, Query} from 'appwrite'
import { Client, Databases, Account, Query, Storage, Users } from 'node-appwrite'


async function getData(id) {  

    const        APPWRITE_URL = process.env.APPWRITE_URL
    const          PROJECT_ID = process.env.APPWRITE_PROJECT_ID
    const             API_KEY = process.env.APPWRITE_BACKEND_API_KEY
    const               DB_ID = process.env.APPWRITE_DB_BEDBD_ID
    const PROPERTY_COLLECTION = process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID

    const RATING_REVIEW_COLLECTION = process.env.APPWRITE_DB_COLLECTION_RATING_REVIEW_ID

    const     PROPERTY_IMAGES = process.env.APPWRITE_PROPERTY_IMAGE_FILE_BUCKET_ID
    
    const client = new Client();
        client
            .setEndpoint(APPWRITE_URL)
            .setProject(PROJECT_ID)
            .setKey(API_KEY);
    const databases = new Databases(client);
    const   storage = new Storage(client);
    const   users = new Users(client);


    try {
        const data =  await databases.getDocument(
                                    DB_ID,
                                    PROPERTY_COLLECTION,
                                    id)

        const { 
            description, 
            propertyType, 
            title, 
            address,
            isPublished, 
            isAvailable, 
            rent, 
            currency, 
            serviceFee, 
            images,
            amenities,
            ownerId, 
            hosts,
            propertyBookingTypes,
            customBookingTypesTitle,
            customBookingTypesDescription,

            homeRules,
            customHomeRulesTitle,
            customHomeRulesDescription,
            propertyFeatures,
            customFeaturesTitle,
            customFeaturesDescription,
            roomCount,
            bedCount,
            guestCount,
    
            propertyRatingReview    } = data


            const ratingReviewResult =  await databases
                                            .listDocuments(
                                                DB_ID,
                                                RATING_REVIEW_COLLECTION,
                                                [Query.equal("propertyId", [data['$id']])])

                                    
                                                
            const ratingReviews = ratingReviewResult.documents.map(item =>
                                    (Object.entries(item)
                                            .reduce((acc, [key, value]) => {
                                                if (key.endsWith('Rating')) {
                                                    const ratingKey = key.replace('Rating', ''); // Remove 'Rating' from the key
                                                    acc.ratings = acc.ratings || {}; // Create ratings object if it doesn't exist
                                                    acc.ratings[ratingKey] = value; // Assign the rating value to the ratings object
                                                }else if(key=== 'author'){
                                                    acc[key] = {
                                                                            name: value['name'], 
                                                                     description: value['description'],
                                                                    profilePhoto: value['profilePhoto']
                                                                                    .reduce((latest, current) => {
                                                                                            const latestTime = new Date(latest['$updatedAt']).getTime();
                                                                                            const currentTime = new Date(current['$updatedAt']).getTime();
                                                                                            return currentTime > latestTime ? current : latest;
                                                                                        })['profilePhotoID'],
                                                                          badges: value['badges']
                                                                                    .map(i=>({ badgeName: i['badgeName'],
                                                                                                    icon: {
                                                                                                            type: i['iconType'],
                                                                                                            name: i['iconName'],
                                                                                                            url:  i['iconUrl']
                                                                                                        }
                                                                                                }))
                                                                }
                                                }else if(key=== 'reviewText' || key === '$updatedAt'){
                                                    acc[key] = value;
                                                }
                                                
                                                // else {
                                                //     acc[key] = value; // Assign non-rating keys directly
                                                // }
                                                return acc;
                                            }, {}))).sort((a, b) => {
                                                const dateA = new Date(a['$updatedAt']);
                                                const dateB = new Date(b['$updatedAt']);
                                                return dateB - dateA; // Sort in descending order
                                              });
            
            // console.log('rating review')
            // console.log(ratingReviews[0])
            // console.log(ratingReviews[0]['author']['profilePhoto'])
            // console.log(ratingReviews[0]['author']['badges'])


            const _hosts = hosts.map(item=> {

                    const profilePhoto = item['profilePhoto'].reduce((latest, current) => {
                                                                    const latestTime = new Date(latest.$updatedAt).getTime();
                                                                    const currentTime = new Date(current.$updatedAt).getTime();
                                                                    return currentTime > latestTime ? current : latest;
                                                                }); 
                    const badges = item['badges'].map(i=>({ badgeName: i['badgeName'],
                                                            icon:{
                                                                type: i['iconType'],
                                                                name: i['iconName'],
                                                                url: i['iconUrl']
                                                                } 
                                                            })) 


                                    return  ({  name: item['name'], 
                                         description: item['description'], 
                                        profilePhoto: profilePhoto['profilePhotoID'], 
                                // userVerificationInfo: item['userVerificationInfo'],
                                              badges: badges })})

            const _amenities = amenities.map(item=> ({
                                           title: item['title'], 
                                     description: item['description'], 
                                            icon: item['icon'], 
                                        category: item['category']
                                    }))

            const _homeRules = homeRules.map(item=>({title: item['title'], description: item['description']}))
            if(customHomeRulesTitle.length>0){
                customHomeRulesTitle.forEach(item => {
                    const textArray = item.split('_')
                    const index = textArray[0]
                    const title = textArray.slice(1).join('_')
                    let description = '';
                    customHomeRulesDescription.forEach(i=>{
                        const txtArr = i.split('_')
                        if(index === textArray[0] )
                            description = textArray.slice(1).join('_')
                    })
                    _homeRules.push({ title, description })
                })
            }


            const bookingTypes = propertyBookingTypes.map(item=>({title: item['title'], description: item['description']}))
            if(customBookingTypesTitle.length>0){
                customBookingTypesTitle.forEach( item =>{
                    const textArr = item.split('_')
                    const idx = textArr[0]
                    const title = textArr.slice(1).join('_')
                    let description =''; 
                    customBookingTypesDescription.forEach(i=>{ 
                        const txtArr = i.split('_')
                        if(idx === txtArr[0])
                          description = txtArr.slice(1).join('_')
                    })
                    bookingTypes.push({ title, description })
                })
            }


            const features = propertyFeatures.map(featureItem=>({title: featureItem['title'], description: featureItem['description']}))
            if(customFeaturesTitle.length>0){
                customFeaturesTitle.forEach(i=>{
                    const textArr = i.split('_')
                    const idx = textArr[0]
                    const title = textArr.slice(1).join('_')
                    let description =''; 
                    customFeaturesDescription.forEach(item=>{ 
                        const txtArr = item.split('_')
                        if(idx == txtArr[0])
                          description = txtArr.slice(1).join('_')
                    })
                    features.push({ title, description })
                })                              
            }


        // return data

        if(data['$id'])
            return { 
                description, 
                propertyType, 
                title, 
                address,
                isPublished, 
                isAvailable, 
                rent, 
                currency, 
                serviceFee, 
                images,    
                amenities:_amenities,    
                ownerId, 
                hosts:_hosts,
                roomCount,
                bedCount,
                guestCount,

                features:[...bookingTypes, ...features ],
                homeRules: _homeRules,    
                propertyRatingReview:ratingReviews   } 


    } catch (err) {
        return false
    }


  }



export default async function Property({ params}) {
    const id = params['id']
    const property = await getData(id)
    // console.log(property)


    const {     description,
                propertyType,
                title,
                address,
                isPublished,
                isAvailable,
                rent,
                currency,
                serviceFee,
                images,
                amenities,
                ownerId,
                hosts,
                features,
                homeRules,
                propertyRatingReview,
                roomCount,
                guestCount,
                bedCount
            } = property



// console.log(propertyRatingReview[0]['ratings'])
// console.log(propertyRatingReview[0]['author'])

const ratings = propertyRatingReview.map(item => item['ratings'])
const review = propertyRatingReview.map(item => ({
                                            reviewText: item['reviewText'], 
                                                author: item['author'], 
                                          '$updatedAt': item['$updatedAt']}))

    
    
    const imageDetailsContainerId = 'img_details'
    // let propertyType = 'Apartment'
    // let propertyTitle = 'Ocean Blue, Labonno point, Cox bazar'
    // let propertyAddress = '467 Stutler Lane, Altoona, PA 16602'
    const availability = { 'isAvaliable' : true}
    const pricingData =  {
        'price': rent,
        'unit' : 'night',
        'currency': currency,
        'servicesFee': serviceFee,
        'bedbdFee':2,
    }
    const details = {
        images:[
            {
                imageTitle:'Living room',
                imageUrl: '/images/4eabfbe482568e48247e3a0119a702ca.jpeg',
                content:'',
                tags:' ' 
            },
            {
                imageTitle:'Decoration',
                imageUrl: '/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
                content:'',
                tags:' ' 
            },
            {
                imageTitle:'Bedroom',
                imageUrl: '/images/edd4ba000bdfa85be11654df3de4ccf3.jpeg',
                content:'',
                tags:' ' 
            },
            {
                imageTitle:'Dining room',
                imageUrl: '/images/ff4537db926dfeb0067a37eecda96e8f.jpeg',
                content:'',
                tags:' ' 
            },
            {
                imageTitle:'front view',
                imageUrl: '/images/edd4ba000bdfa85be11654df3de4ccf3.jpeg',
                content:'',
                tags:' ' 
            },
            {
                imageTitle:'front view',
                imageUrl: '/images/ff4537db926dfeb0067a37eecda96e8f.jpeg',
                content:'',
                tags:' ' 
            },
            {
                imageTitle:'front view',
                imageUrl: '/images/edd4ba000bdfa85be11654df3de4ccf3.jpeg',
                content:'',
                tags:' ' 
            },
            {
                imageTitle:'front view',
                imageUrl: '/images/ff4537db926dfeb0067a37eecda96e8f.jpeg',
                content:'',
                tags:' ' 
            }
        ]
    }
    
    const about =  [{
        heading:'Room in a rental unit',
        details:'Your own room in a home, plus access to share space.'
    },{
        heading:'Shared bathroom',
        details:'You’ll share the bathroom with others.'
    },{
        heading:'Dedicated Workspace',
        details:'A room with wifi that’s well-suited for working'
    }]
    let propertyRules ={ 
        'people-restriction': {
            isMaleRestricted: false,
            isFemaleRestricted: true,          
        },
        'time-rules':{    
            checkInTime:'09:00',
            checkOutTime:'06:00',
            userTimeFormate:'UTC'   },
  
        'other-restriction':{
            isPetAllowed:false
        }
    }
    const host = {
        'name'              : 'Ajmol Hossain',
        'profileImageUrl'   : 'https://s3-alpha-sig.figma.com/img/1aa6/7521/2dba83baa62c2057ce79df83a3f0bd4c?Expires=1704672000&Signature=nnuAHcKMmTyYFQ77~KkRtl~toyrjsfyVBX1mGQBZelXUzVfzjtjVKzTsdFKZXCyQ~Q4SN5iA7RIAvEB0bq1ZMIVOwVq91fuvduzGuwap2X8aJ9pCyJIRHZY1r1u4T6pB5lcQuMr5fpxOac-tl~eMYwUoVnWwTU9BidV2cfe7mxBQhnP~lPmk5as3gHqIpJnr-66EzA1S9R9IXpsFyhN4sP4OWCRU2i-AgK0ELq6qIzTXxSyaKxAhZcwR277hgUuJKxd2Omuy~qMqEyPZAVDCX9VVEgzMUGIV78FOEY2YZE-kTaaExJpLzWoxJ9P1UHOyxQDzyX5h~~W3flWZsKE4JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        'details'           : 'Lorem ipsum dolor sit amet consectetur. Aliquam aliquam at sem magna sem diam. Facilisi id sit rhoncus nec nisl non. Faucibus cum magna enim aliquam sodales dignissim. Aliquam aliquam at sem magna sem diam. Facilisi id sit rhoncus nec nisl non. Faucibus cum magna enim aliquam sodales dignissim.',
        'badges'            : [     {
                                        'icon'      :   {
                                                            type:'lucidicon',
                                                            name:'award',
                                                            link:''
                                                        },
                                        'badgeName' :   'Premium Host'
                                    },
                                    {
                                        'icon'      :   {
                                                            type:'lucidicon',
                                                            name:'shield-check',
                                                            link:''
                                                        },
                                        'badgeName' :   'Identity Verified'
                                    },
                                    {
                                        'icon'      :  {
                                                            type:'lucidicon',
                                                            name:'star',
                                                            link:''
                                                        },
                                        'badgeName' :   'Rating'
                                    },
                                ],
        'emailVarified'     : true,
        'phoneVarified'     : true,
'manualVarification'        : true,
        'rating'            : 4.3,
        'review'            :   [
                                    {
                                        'author':'1326546521',
                                        'rating':5,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':4,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':5,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':3,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':2,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':1,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':5,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':4,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':5,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':3,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':2,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                    {
                                        'author':'1326546521',
                                        'rating':1,
                                        'feedback':' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, '
                                    },
                                ],
        'responseRate'      : 95,
        'responseTime'      : 3600000,                     
    }
// const amenities = [
//         {
//             title:'Kitchen',
//             icon:{
//                     type:'local-link',
//                     link:'/icons/kitchen.svg',
//                     name:'cooking-pot'
//                 }
//         },
//         {
//             title:'Television with Netflix',
//             icon: {
//                     type:'local-link/lucidicon',
//                     link:'/icons/tv.svg',
//                     name:'tv'
//                 }
//         },
//         {
//             title:'Air Conditioner',
//             icon: {
//                     type:'local-link/lucidicon',
//                     link:'/icons/air_conditioner.svg',
//                     name:'air-vent'
//                 }
//         },
//         {
//             title:'Free Wireless Internet',
//             icon: {
//                     type:'lucidicon',
//                     name:'wifi'
//                 }
//         },
//         {
//             title:'Washer',
//             icon: {
//                     type:'local-link/lucidicon',
//                     link:'/icons/laundry.svg',
//                     name:'shirt'
//                 }
//         },
//         {
//             title:'Balcony or Patio',
//             icon: {
//                     type:'local-link',
//                     link:'/icons/balcony.svg'
//                 }
//         },
//         {
//             title:'Kitchen',
//             icon:{
//                     type:'local-link/lucidicon',
//                     link:'/icons/kitchen.svg',
//                     name:'cooking-pot'
//                 }
//         },
//         {
//             title:'Television with Netflix',
//             icon: {
//                     type:'local-link',
//                     link:'/icons/tv.svg'
//                 }
//         },
//         {
//             title:'Air Conditioner',
//             icon: {
//                     type:'local-link',
//                     link:'/icons/air_conditioner.svg',
//                     name:'air-vent'
//                 }
//         },
//         {
//             title:'Free Wireless Internet',
//             icon: {
//                     type:'lucidicon',
//                     name:'wifi'
//                 }
//         },
//         {
//             title:'Washer',
//             icon: {
//                     type:'local-link',
//                     link:'/icons/laundry.svg'
//                 }
//         },
//         {
//             title:'Balcony or Patio',
//             icon: {
//                     type:'local-link',
//                     link:'/icons/balcony.svg'
//                 }
//         }

//     ]

// console.log(features)

    
    return <>
            <div className={`container  ${styles.property_details}`} >
                <div>
                    <ImageGallery data={images.slice(0, 4)} totalImageCount={images.length}/>
                    <div className={`${styles.geographical_map}`}>
                        {/* <MapboxMap/> */}
                        {/* <LocationMap /> */}
                        {/* <LeafletMap/> */}
                    </div> 
                </div>
                <div className={`${styles.property_descriptions } `} >
                    <div className={`${styles.attributes_details}`}>
                        <div className='flex flex-row space-between mr-top-700 mr-btm-700'>
                            <div className={`${styles.property_type }`}>
                                {propertyType['typeName']}  
                            </div>
                            <ShareSaveBtn/>
                        </div>
                        <div className={`${styles.property_name}`}>
                            <div className={`${styles.property_title}`}>
                                {title}
                            </div>
                            <div className={`${styles.property_subtitle}`}>
                                {address}
                            </div>
                        </div>

                        { roomCount.length > 0 && <Facilities data={{roomCount, guestCount }}/> }
                        { features.length > 0 &&  <About data={features} /> }
                        { amenities.length > 0 && <Amenities data={amenities}/> }

                        { <HomeRules data={homeRules} /> }
                        { <CancellationPolicy/> }                        
                        {  Object.keys(host).length > 0 && <Host data={hosts} reviewCount={review.length}/>}
                        
                            <Rating data={ratings}/>
                            <PostReview/>
                            <Review data={review}/>
                            <NearbyServices/>
                    </div>
                    <div className={`${styles.reservation_section}`}>
                        <BookingBox data={pricingData} isAvailable = {isAvailable} />
                    </div>
                </div>
            </div>
            <ImageDetails data={images}/>   
    </>
}

