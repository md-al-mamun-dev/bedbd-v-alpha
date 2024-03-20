// LocationSearch.js
import { useEffect } from 'react';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const LocationSearch = ({ map, onLocationFound }) => {
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: true,
      showPopup: false,
      maxMarkers: 1,
      retainZoomLevel: false,
      autoComplete: true,
    });

    map.addControl(searchControl);

    // Listen to the location found event
    map.on('geosearch/showlocation', (event) => {
      const { latLng, location } = event;
      onLocationFound({ latLng, location });
    });

    return () => {
      // Cleanup when component is unmounted
      map.removeControl(searchControl);
      map.off('geosearch/showlocation');
    };
  }, [map, onLocationFound]);

  return null;
};

export default LocationSearch;