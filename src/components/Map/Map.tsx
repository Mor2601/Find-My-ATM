import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { ATM } from "./../../types";
import MarkerCluster from "../MarkerCluster/MarkerCluster";
import CustomZoomControl from "../CustomZoomControl/CustomZoomControl";
import ZoomMapOnAtm from "../ZoomMapOnAtm/ZoomMapOnAtm";
import ZoomMapOnCity from "../ZoomMapOnCity/ZoomMapOnCity";
import { MAP_ZOOM, ISRAEL_CENTER } from "../../constants/constants";
import UserLocation from "../UserLocationMarker/UserLocationMarker";
interface MapProps {
  atmsList: ATM[];
  selectedAtm: ATM | null;
  setSelectedAtm: (atm: ATM | null) => void;
}
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const Map: React.FC<MapProps> = ({ atmsList, selectedAtm, setSelectedAtm }) => {
  return (
    <MapContainer
      center={[ISRAEL_CENTER[0], ISRAEL_CENTER[1]]}
      zoom={MAP_ZOOM}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer attribution={ATTRIBUTION} url={URL} />
      <CustomZoomControl />
      <UserLocation />
      {selectedAtm ? (
        <ZoomMapOnAtm atm={selectedAtm} setAtm={setSelectedAtm} />
      ) : (
        <MarkerCluster atmsList={atmsList} />
      )}
      <ZoomMapOnCity atmsList={atmsList} />
    </MapContainer>
  );
};

export default Map;
