"use client"
import styles from './index.module.css'
import "leaflet/dist/leaflet.css"
import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import { Icon, divIcon, point } from "leaflet";





// mapboxgl.accessToken =

const LeafletMap = () => { 
  const [lng, setLng] = useState(90.407608);
  const [lat, setLat] = useState(23.811056);


  const markers =  [{ location:[23.811056, 90.407608], popup:"Hello" }]


  const customIcon = new Icon({
    iconUrl:"/fabicon.svg",
    iconSize: [60, 60]
  })
  

    return (<MapContainer center={[ 23.811056, 90.407608]} zoom={15} zoomControl={false} touchZoom={false} doubleClickZoom={false} scrollWheelZoom={false} boxZoom={false} keyboard={false}>
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}

      <Marker position={[ 23.811056, 90.407608]} icon={customIcon}>

      </Marker>
      
    </MapContainer>)
}

export default LeafletMap