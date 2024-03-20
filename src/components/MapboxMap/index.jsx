"use client"
import styles from './index.module.css'
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { SearchBox } from '@mapbox/search-js-react';
// import { SearchBox } from '@mapbox/search-js-react';




// mapboxgl.accessToken =

const MapboxMap = () => {
    // const [markerIcon, setMarkerIcon] = useState({url:'fabicon.svg'})

    // Variable need to put into Envirnment variable


    // const mapRef = useRef
    // const mapCenter = useMemo(()=>  ({lat: 23.811056, lng: 90.407608}), [])
    // const fixedZoomLevel  = 15


    // const onLoad = useCallback(map => (mapRef.current = map), [])


    // const {isLoaded} = useLoadScript({
    //     googleMapsApiKey: API_KEY,
    //     libraries:['places']
    // })

    // const mapContainer = useRef(null);
    // const markerIcon = {
    //   url: 'fabicon.svg', 
    //   scaledSize: { width: 48, height: 48 }, 
    // };


    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const [lng, setLng] = useState(90.407608);
    const [lat, setLat] = useState(23.811056);
    const [zoom, setZoom] = useState(12);



    // useEffect(() => {
    //   if (map.current) return; 
    //   map.current = new mapboxgl.Map({
    //   container: mapContainer.current,
    //   style: 'mapbox://styles/mapbox/streets-v12',s
    //   center: [lng, lat],
    //   zoom: zoom      
    //   });     

    //   map.current.scrollZoom.disable()
    //   map.current.on('move', () => {
    //     setLng(map.current.getCenter().lng.toFixed(4));
    //     setLat(map.current.getCenter().lat.toFixed(4));
    //     setZoom(map.current.getZoom().toFixed(2));
    //     });       

    //   });

    useEffect(() => {
      mapboxgl.accessToken =  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      });
        // Add additional map configurations or features here
      new mapboxgl.Marker({ element: createCustomMarkerElement(), anchor: 'bottom',}).setLngLat([lng, lat]).addTo(map);

      return () => map.remove(); // Cleanup on component unmount
    }, [mapContainer ]);

    const createCustomMarkerElement = () => {
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      // Set the path to your custom image
      markerElement.style.backgroundImage = 'url(/images/custom-marker.png)';
      markerElement.style.width = '30px'; // Adjust the width as needed
      markerElement.style.height = '30px'; // Adjust the height as needed
  
      return markerElement;
    };
 

    // if(!isLoaded) return <div>Loading...</div>

    return (<div ref={mapContainer} className={`${styles.map_container}`} />)


}

export default MapboxMap