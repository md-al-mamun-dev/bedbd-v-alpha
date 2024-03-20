import styles from './page.module.css'

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import ImageGallery from "@/components/ImageGallery";
import LocationMap from "@/components/LocationMap";
import ShareSaveBtn from "@/components/ShareSaveBtn";
import BookingBox from "@/components/BookingBox";
import PropertyImageDetails from "@/components/ImageDetails";

import Facilities from "./Facilities";
import About from "./About";
import Amenities from "./Amenities";
import HomeRules from "./HomeRules";
import CancellationPolicy from "./CancellationPolicy";
import Host from "./Host";
import Rating from "./Rating";
import Review from "./Review";
import NearbyServices from "./NearbyServices";
// import LeafletMap from '@/components/LeafletMap'


async function getData(id) {  
  const res = await fetch(process.env.API_URL + '/api/property/'+id, { method: 'GET' }) 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data')
  } 
  return res.json()
}

const Property = async ({params}) => {
  
    const imageDetailsContainerId = 'img_details'
  // get property Id from url parameter 
  const decodedParameter = decodeURIComponent(params.id);
  const data = await getData(decodedParameter)

//   console.log(decodedParameter.split('=')[1])
//   const matchParameter = decodedParameter.match(/id="([^"]+)"/);

//   console.log(matchParameter)
//   const propertyId = matchParameter ? matchParameter[1] : null;





  const userTimeZone = new Date().getTimezoneOffset() / (-60)
  const image_gallery_item_limit = 4

  let propertyType = 'Apartment'
  let propertyTitle = 'Ocean Blue, Labonno point, Cox bazar'
  let propertyAddress = '467 Stutler Lane, Altoona, PA 16602'
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

  const pricingData =  {
      'price':20.00,
      'unit' : 'night',
      'currency': '$',
      'servicesFee': 3,
      'bedbdFee':2,
  }

  const availability = { 'isAvaliable' : true}

  const price = 20.00
  const services =    [
                          {
                              title:'Bedrooms',
                              amount:3,
                              icon:   {
                                          type:'lucidicon',
                                          iconName:'bed-double',
                                          // url:''
                                      },
                          },
                          {
                              title:'Washroom',
                              amount:3,
                              icon:   {
                                          type:'lucidicon',
                                          iconName:'bath',
                                          // url:''
                                      },
                          },
                          {
                              title:'Guests',
                              amount:'6/8',
                              icon:   {
                                          type:'lucidicon',
                                          iconName:'users',
                                          // url:''
                                      },
                          },{
                              title:'Bedrooms',
                              amount:3,
                              icon:   {
                                          type:'lucidicon',
                                          iconName:'bed-double',
                                          // url:''
                                      },
                          },
                          {
                              title:'Washroom',
                              amount:3,
                              icon:   {
                                          type:'lucidicon',
                                          iconName:'bath',
                                          // url:''
                                      },
                          }
                      ]

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

  const amenities = [
                      {
                          title:'Kitchen',
                          icon:{
                                  type:'local-link',
                                  link:'/icons/kitchen.svg',
                                  name:'cooking-pot'
                              }
                      },
                      {
                          title:'Television with Netflix',
                          icon: {
                                  type:'local-link/lucidicon',
                                  link:'/icons/tv.svg',
                                  name:'tv'
                              }
                      },
                      {
                          title:'Air Conditioner',
                          icon: {
                                  type:'local-link/lucidicon',
                                  link:'/icons/air_conditioner.svg',
                                  name:'air-vent'
                              }
                      },
                      {
                          title:'Free Wireless Internet',
                          icon: {
                                  type:'lucidicon',
                                  name:'wifi'
                              }
                      },
                      {
                          title:'Washer',
                          icon: {
                                  type:'local-link/lucidicon',
                                  link:'/icons/laundry.svg',
                                  name:'shirt'
                              }
                      },
                      {
                          title:'Balcony or Patio',
                          icon: {
                                  type:'local-link',
                                  link:'/icons/balcony.svg'
                              }
                      },
                      {
                          title:'Kitchen',
                          icon:{
                                  type:'local-link/lucidicon',
                                  link:'/icons/kitchen.svg',
                                  name:'cooking-pot'
                              }
                      },
                      {
                          title:'Television with Netflix',
                          icon: {
                                  type:'local-link',
                                  link:'/icons/tv.svg'
                              }
                      },
                      {
                          title:'Air Conditioner',
                          icon: {
                                  type:'local-link',
                                  link:'/icons/air_conditioner.svg',
                                  name:'air-vent'
                              }
                      },
                      {
                          title:'Free Wireless Internet',
                          icon: {
                                  type:'lucidicon',
                                  name:'wifi'
                              }
                      },
                      {
                          title:'Washer',
                          icon: {
                                  type:'local-link',
                                  link:'/icons/laundry.svg'
                              }
                      },
                      {
                          title:'Balcony or Patio',
                          icon: {
                                  type:'local-link',
                                  link:'/icons/balcony.svg'
                              }
                      }

                  ]

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
          'manualVarification'     : true,
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


  return (
    <>
        <div className={`container  ${styles.property_details}`} >
        <div >
            <ImageGallery data={details['images'].slice(0, 4)} totalImageCount={details['images'].length}/>
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
                        {propertyType}                        
                    </div>
                    <ShareSaveBtn/>
                </div>
                
                <div className={`${styles.property_name}`}>
                    <div className={`${styles.property_title}`}>
                        {propertyTitle}
                    </div>
                    <div className={`${styles.property_subtitle}`}>
                        {propertyAddress}
                    </div>
                </div>

                { services.length > 0 && <Facilities data={services}/> }
                { about.length > 0 &&  <About data={about} /> }
                { amenities.length > 0 && <Amenities data={amenities}/> }

                {<HomeRules data={propertyRules} />}
                {<CancellationPolicy/>}

                {  Object.keys(host).length > 0 && <Host data={host}/>}
                <Rating/>
                <Review/>
                <NearbyServices/>

            </div>
            
            <div className={`${styles.reservation_section}`}>
                <BookingBox data={pricingData} availability = {availability} />
            </div>
        </div>
        </div>
        <PropertyImageDetails containerId = {imageDetailsContainerId}  data={details['images']} />
    </>
  )
}

export default Property

