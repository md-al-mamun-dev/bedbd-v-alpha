"use client"
import { useState , useRef, useCallback, useEffect} from 'react'
import Map, {Marker, GeolocateControl} from 'react-map-gl'
import useSearch from '@/context/search/useSearch'



export default function SearchMap() {
  const search = useSearch()

  const [viewport, setViewport] = useState({
    // latitude: 23.7841,
    // longitude:  90.4152,
    longitude:90.36203892315308,
    latitude:23.82439436458189,
    zoom:12
  })

  useEffect(()=>{
    console.log(search)
    setViewport({...viewport, ...search['location']})
  }, [search])



  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );
  const [markerPoint, setMarkerPoint] = useState({
    longitude:90.36203892315308,
    latitude:23.82439436458189
  })


      return (<div className={`w-100 h-432px p-32px-24px`}>
        <Map 
        ref={mapRef}
        {...viewport}
          onViewportChange={handleViewportChange}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onMove={evt => setViewport(evt.viewState)}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}>
            <GeolocateControl />
            <Marker 
              // className='position-relative marker-class' 
              longitude={markerPoint['longitude']} 
              latitude={markerPoint['latitude']} 
              anchor="top"
              draggable
              onDrag={(e)=>{ setMarkerPoint({
                                            longitude: e['lngLat']['lng'],
                                            latitude:e['lngLat']['lat']
                                          })
                              console.log(e['lngLat'])
                            }}>
              <div className='position-absolute box-shadow-gray  bg-secondary-050 p-4px-8px radius-8px '>$10.50</div>
            </Marker>
            {/* <Geocoder
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
              position="top-left"
            /> */}
            
        </Map>
      </div>)
}