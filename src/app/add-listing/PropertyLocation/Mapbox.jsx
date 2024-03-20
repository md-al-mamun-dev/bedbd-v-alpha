import { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
import mapboxgl from '!mapbox-gl'; 

export default function Mapbox() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const [lng, setLng] = useState(90.407608);
    const [lat, setLat] = useState(23.811056);
    const [zoom, setZoom] = useState(9);
    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWQtYWwtbWFtdW4iLCJhIjoiY2x0NjBlZHVhMDYyNTJxcDg1ODNheTJ0MiJ9.X4B7NTUH03dC2dVOytHlAg'

    useEffect(() => {
        // if (map.current) return; 
        const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
        accessToken: MAPBOX_ACCESS_TOKEN,
        attributionControl: false,
        });
        map.addControl(new mapboxgl.NavigationControl());

        marker.current = new mapboxgl.Marker({
            draggable: true,
          }).setLngLat([90.407608, 23.811056])
          .addTo(map);
    
        marker.current.on('dragend', () => {
        const lngLat = marker.current.getLngLat();
        console.log(lngLat)
        // onLocationChange({ lng: lngLat.lng, lat: lngLat.lat });
        });
  
    //   return () => {
    //     map.current.remove();
    //   };
    }, []);
  
    return <div style={{ width: '600px', height: '370px', overflow:'hidden' }} ref={mapContainer}/>;
}
