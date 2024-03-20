'use client'
import SwitchBtn from "../SwitchBtn"
import Mapbox from "./Mapbox"
// import { GoogleMap } from "./GoogleMap"
import GoogleLocationMap from "./GoogleLocationMap"
import { usePlacesWidget } from "react-google-autocomplete"
import GoogleMap from "./GoogleMap"
import usePlacesAutocomplete from "use-places-autocomplete"
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox"
import Geocode , {setKey, setDefaults} from "react-geocode"
import { useEffect, useRef, useState } from "react"
import useAreaLocation from "@/hooks/useAreaLocation"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"

let autoComplete;

const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
  
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }
  
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });

export default function PropertyLocation({data, nextPage, previousPage }) {
  const dispatch = usePropertyDispatch()

  const [currentLocation, setCurrentLocation] = useState({lat:0.00,  lng:0.00})

  const {localInfo, location} = useAreaLocation()
  console.log(localInfo)
  console.log(location)

    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null)

    const handleScriptLoad = (updateQuery, autoCompleteRef) => {
        autoComplete = new window.google.maps.places.Autocomplete(
          autoCompleteRef.current,
          {
            // types: ["(cities)"],
            componentRestrictions: { country: "IN" },
          }
        );
    
        autoComplete.addListener("place_changed", () => {
          handlePlaceSelect(updateQuery);
        });
      };


  const handlePlaceSelect = async (updateQuery) => {
        const addressObject = await autoComplete.getPlace();
    
        const query = addressObject.formatted_address;
        updateQuery(query);
        console.log({ query });
    
        const latLng = {
          lat: addressObject?.geometry?.location?.lat(),
          lng: addressObject?.geometry?.location?.lng(),
        };
    
        console.log({ latLng });
        // setSelectedLocation(latLng);
      };

    // const handleScriptLoad = (updatequery, autoCompleteRef)=>{
    //     autoComplete = new window.google.maps.places.Auutocomplete(
    //         autoComplete.current,
    //         {

    //         } )
    //     autoComplete.addListener('places_changed', ()=>{
    //         handlePlaceSelect(updatequery)
    //     })
    // }

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`,
            ()=>handleScriptLoad(setQuery, autoCompleteRef)
        )
    }, [])

    function onContinueBtnClickHandlar() {
      dispatch({type:'property/country', data:{name: localInfo['country'], code: localInfo['countryCode']}     })
      // dispatch({type:'property/countryCode', data: })
      dispatch({type:'property/city', data:{ name:location['city_name'], lat:'', lng:''}})
      dispatch({type:'property/timezone', data:`(GMT${location['time_zone']})` })
      dispatch({type:'property/zipCode', data:location['zip_code'] })
      dispatch({type:'property/location', data:currentLocation })
      nextPage()
      console.log(localInfo)
      console.log(location)
    }


  return (
    <div className='w-100 h-max-content absolute-center max-width-1280 '>
        <div className='max-w-600px mr-l-auto mr-r-auto '>
            <h3 className=' clr-primary-400 txt-align-center fw-regular-dark fs-875 mr-btm-48px'>Property Location</h3>
            <div className='w-100'>
                <label className='w-100 fs-600 fw-regular-dark'>Find your place</label>
                <div>
                    {/* <PlacesAutoConplete/> */}
                    <input ref={autoCompleteRef} 
                    onChange={(event)=> setQuery(event.target.value)}
                    value={query}
                    className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' type='text' placeholder="search or enter goole map link"/>
                </div>
                {/* <div>
                    <input className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' type='text' placeholder="Use current location"/>
                </div> */}
                {/* <div className='fs-200 p-l-24 mr-t-6px'>Choose a catchy title in 40 characters</div> */}
            </div>
            <div className='mr-top-24px mr-btm-40px'>
                <p className="fs-200 mr-btm-4px">Or Drag the pin where is your property located.</p>
                <div className="radius-4 w-600px h-370px relative">
                    {/* <GoogleMap/> */}
                    {/* <Mapbox/> */}
                    <GoogleLocationMap data={location} setCurrentLocation={setCurrentLocation} />
                </div>
            </div>
            <SwitchBtn previousPage={previousPage} nextPage={onContinueBtnClickHandlar} />
        </div>        
    </div>
  )
}

// const PlacesAutoConplete = ({})=>{
//     const {ready, value, setValue, suggestions:{ status, data, }, clearSuggestions} = usePlacesAutocomplete()
//       console.log(ready)

//     return <Combobox>
//                 <ComboboxInput className="w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8" placeholder='search an address' value={value} onChange={(e)=>setValue(e.target.value)} disabled={!ready}/>
//                 <ComboboxPopover>
//                     <ComboboxList>
//                         {status === 'OK' && data.map(({place_id, description})=><ComboboxOption key={place_id} value={description}/>)}
//                     </ComboboxList>
//                 </ComboboxPopover>
//             </Combobox>
// }
