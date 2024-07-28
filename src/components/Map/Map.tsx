import React, { useEffect, useMemo,useRef,useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  LayerGroup,
} from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { ATM } from "./../../types";
import { map, set } from "lodash";
import MarkerCluster from "../MarkerCluster/MarkerCluster";
import CustomZoomControl from "../CustomZoomControl/CustomZoomControl";
import FoucsedMapOnAtm from "../FoucsedMapOnAtm/FoucsedMapOnAtm";
import FoucsedMap from "../FoucsedMap/FoucsedMap";
interface MapProps {
  atmsList: ATM[];
  atm: ATM | null;
  setAtm: (atm: ATM | null) => void;
  
  isCityFouced: boolean;
}

const Map: React.FC<MapProps> = ({ atmsList, atm,setAtm,isCityFouced }) => {

  return (
    <MapContainer
      center={[31.5, 34.75]}
      zoom={8}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       
      />
      
      {/* {atm? (<FoucsedMapOnAtm atm={atm}/>):(<FoucsedMap atmsList={atmsList}/>)} */}
      {atm ? <FoucsedMapOnAtm atm={atm} setAtm={setAtm} /> : <MarkerCluster atmsList={atmsList} />}
      <CustomZoomControl />
      {/* {isCityFouced ? <FoucsedMap atmsList={atmsList}  />:null} */}
      
      <FoucsedMap atmsList={atmsList} />
      {/* <MarkerCluster atmsList={atmsList} /> */}
    </MapContainer>
  );
};

export default Map;
