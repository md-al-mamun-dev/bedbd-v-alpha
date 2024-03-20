import React, { useEffect, useState } from 'react'
import PropertyFeature from './PropertyFeature'
import SwitchBtn from '../SwitchBtn'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import LucidIcon from '@/components/LucidIcon'
import copyToClipboard from '@/components/Utility/copyToClipboard'
import useCountriesList from '@/hooks/useCountriesList'
import { City } from 'country-state-city'
import { timezone } from './timzoneList'


export default function LocationConfirmation({data, nextPage, previousPage}) {

    const {isLoading:isCountriesLoading, countries:{countries}} = useCountriesList() || {}
    const [country, setCountry] = useState({name: '', code: ''})
    const [cities, setCities] = useState([])
    const [city, setCity] = useState({ name:'', lng:'', lng:'' })
    const [location, setLocation] = useState({lat:'', lng:''})
    const [timeZone, setTimeZone] = useState('')
    const [postZipCode, setPostZipCode] = useState('')
    const [mapLink, setMapLink] = useState('')


    // const {country:countryData, city:cityData, location:locationData, zipCode } = data 
    

    // const [city, setCity] = useState('')

    



    useEffect(()=>{
        let ignore = false 

        const {country, city, location, zipCode } = data 
        if(!ignore){
            console.log(data)
            setCountry(country)
            setCity(city)
            setLocation(location)
            // setTimeZone(timeZone+' '+city['name'])
            setPostZipCode(zipCode)
        }
        
        return ()=> ignore = true 
    }, [data])
    useEffect(()=>{
        let ignore = false
        if(!ignore){
            setMapLink(`https://maps.google.com/?q=${location['lat']},${location['lng']}`)
        }        
        return ()=> ignore = true 
    }, [location])

    useEffect(()=>{
        let ignore = false
        const { city,  timeZone  } = data 
        if(!ignore && timeZone && (typeof timeZone !== undefined)){
            setTimeZone(timeZone+' '+city['name'])
        }        
        return ()=> ignore = true 
    }, [data])

    useEffect(()=>{
        if(country['code'].length>0){
            const allCitiesOfCountry = City.getCitiesOfCountry(country['code'])
            if(allCitiesOfCountry?.length>0){
                setCities(allCitiesOfCountry)
            }
        }
    }, [country])

    // console.log(countries)
    // const citiesOfCountry = City.getCitiesOfCountry('BD')

    const [thana, setThana] = useState({name:''})
    const [district, setDistrict] = useState({ name:'', lat:'', lng:'' })
    const [address, setAddress] = useState({     aptFloor: '',
                                            streetAddress: '',
                                               addressOne: '',
                                               addressTwo: ''})
    

    function onCountryChangeHandlar(e) {
        setCountry(countries.find(i=>i['code']===e.target.value))
    }
    
    const dispatch = usePropertyDispatch()

    
    // const [propertyTitle, setPropertyTitle]=useState('')
    // const [seelctedFeatures, setSelectedFeatures] = useState([])
    // const [propertyDescription, setPropertyDescription] = useState('')

    function onContinueBtnClick() {
        // console.log(timeZone)
        dispatch({type:'property/address',            data: address  })
        dispatch({type:'property/country',            data: country  })
        dispatch({type:'property/city',               data: city     })
        dispatch({type:'property/district',           data: district })
        dispatch({type:'property/thana',              data: thana    })
        dispatch({type:'property/timezone',           data: timeZone })
        nextPage()
    }

  return (
    <div className='w-100 h-max-content absolute-h-center top-0 max-width-1280 '>
        <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px p-top-56px'>
            <div className=' mr-btm-36px'>
                <h3 className=' clr-primary-400 txt-align-center fw-regular-dark fs-875'>Location confirmation</h3>
                <div className='w-100 mr-top-48px'>
                    <label className='w-100 fs-600 clr-neutral-600 fw-regular-dark'>Add details about your location</label>
                    <div className='w-100 '>
                        <div className='position-relative mr-top-16px mr-btm-24px'>

                            {
                                isCountriesLoading
                                    ? <div className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>Loading...</div>
                                    :   countries?.length > 0
                                        ?   <select 
                                                onChange={onCountryChangeHandlar}
                                                value={country['code']}
                                                className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>                                
                                                <option value=''> select country </option>
                                                {
                                                    countries.map(i => <option value={i['code']}>{i['name']}</option>)
                                                }                                            
                                            </select>
                                        : <div className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>
                                            something wrong!! no data found 
                                            </div>
                            }
                            
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div>

            {/* const [addres, setAddres] = useState({aptFloor:'', streetAddress:'', addresss:'', addressTwo:''}) */}
                        <input 
                            value={address['aptFloor']}
                            onChange={e=>setAddress({...address, 'aptFloor':e.target.value })}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="apt, floor(if applicable)" name='floor'/>

                        <input 
                            value={address['streetAddress']}
                            onChange={e=>setAddress({...address, 'streetAddress':e.target.value })}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="street address" name='street-address'/>

                        <input 
                            value={address['addressOne']}
                            onChange={e=>setAddress({...address, 'addressOne':e.target.value })}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="Address" name='address-line-2'/>

                        <input 
                            value={address['addressTwo']}
                            onChange={e=>setAddress({...address, 'addressTwo':e.target.value })}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="Address-2" name='address-two'/>

                        <input 
                            value={city['name']}
                            onChange={e=>setCity({...city, 'name':e.target.value })}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="City" name='city'/>
                        {/* <div className='position-relative mr-top-40px'>
                            <select 
                                value={city['name]}
                                onChange={e=>setCity(e.target.value)}
                                className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent' 
                                placeholder="pls give a title">                        
                                <option value=''> select city </option>
                                <option value='Dhaka'>Dhaka</option>
                            </select>
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div> */}
                    {/* district */}
                        <input 
                            value={district['name']}
                            onChange={e=>setDistrict({...district, 'name':e.target.value })}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="District" name='district'/>
                        {/* <div className='position-relative mr-top-14px'>
                            <select 
                                value={district}
                                onChange={e=>setDistrict(e.target.value)}
                                className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent' 
                                placeholder="pls give a title">                        
                                <option value=''> select district </option>
                                <option value='Dhaka'>Dhaka</option>
                            </select>
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div> */}

                    {/* thana */}

                        <input 
                            value={thana['name']}
                            onChange={e=>setThana({...thana, 'name':e.target.value })}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="Thana" name='thana'/>

                        {/* <div className='position-relative mr-top-14px'>
                            <select 
                                value={thana['name']}
                                onChange={e=>setThana({...thana, 'name':e.target.value })}
                                className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent' 
                                placeholder="pls give a title">                        
                                <option value=''> select thana </option>
                                <option value='ramna-thana'>Ramna</option>
                            </select>
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div> */}

                        <div className='position-relative mr-top-16px mr-btm-24px'>
                            {   isCountriesLoading
                                ? <div className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>Loading...</div>
                                :   timezone?.length > 0
                                    ?   <select 
                                            onChange={e=> setTimeZone(e.target.value)}
                                            value={timeZone}
                                            className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>                                
                                            <option value=''> select timezone  </option>
                                            {
                                                timezone.map(i => <option value={i['title']}>{i['title']}</option>)
                                            }                                            
                                        </select>
                                    : <div className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>
                                        something wrong!! no data found 
                                        </div>
                            }
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div>

                        {/* <input 
                            value={timeZone}
                            onChange={e=>setTimeZone(e.target.value )}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="Timezone" name='timezone'/> */}
                        {/* <div className='position-relative mr-top-14px'>
                            <select 
                                value={timeZone}
                                onChange={e=>setTimeZone(e.target.value)}
                                className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent' 
                                placeholder="pls give a title">                        
                                <option value=''> select time zone </option>
                                <option value='GMT +6'>Dhaka GMT +6</option>
                            </select>
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div> */}

                        <input 
                            value={postZipCode}
                            onChange={e=>setPostZipCode(e.target.value)}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="post/zip Code" name='post-zip-code'/>
                    </div>
                    <div className='fs-200  mr-t-6px'>No worries! <br/> Your address is only shared with guests after they’ve made a reservation.</div>
                </div>
            </div>
            <div className=' mr-btm-36px'>
            <h3 className='w-100 fs-500 fw-regular-dark'>Add details about your location</h3>
                <div className='w-100 position-relative mr-top-14px '>
                    <input 
                        disabled
                        className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                        placeholder="heare is your map link" 
                        value={mapLink}
                        name='map-link'/>
                        <button onClick={()=>copyToClipboard(mapLink)} className='position-absolute top-50 translateY-50 right-24px opacity-0_70 cursor-pointer no-border  no-background no-outline'>
                            <LucidIcon  name='copy' size={24}/>
                        </button>                    
                </div>                
            </div>
            <SwitchBtn nextPage={onContinueBtnClick} previousPage={previousPage}/>
        </div>        
    </div>
  )
}
