// Remove the duplicate import statement
import { useMemo, Component } from "react";
import { ATM } from "../../types";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvents,
    LayerGroup,
  } from "react-leaflet";
interface MarkerClusterProps {
    atmsList: ATM[];
  }



const withdrawalIcon = new L.Icon({
  iconUrl: "./orange-pinned.png",
  iconSize: [28, 28],
});
const informationIcon = new L.Icon({
  iconUrl: "./blue-pinned.png",
  iconSize: [28, 28],
});

const MarkerCluster: React.FC<MarkerClusterProps> = ({ atmsList }) => {
    const markers = useMemo(() => {
      return atmsList
        .filter(
          (atm) =>
            atm.X_Coordinate !== null &&
            atm.Y_Coordinate !== null &&
            atm.X_Coordinate >= 29.5 &&
            atm.X_Coordinate <= 33.5 &&
            atm.Y_Coordinate >= 34.25 &&
            atm.Y_Coordinate <= 35.9
        )
        .map((atm) => (
          <Marker
            key={atm._id}
            position={[atm.X_Coordinate, atm.Y_Coordinate]}
            icon={
              atm.ATM_Type === "משיכת מזומן" ? withdrawalIcon : informationIcon
            }
          >
            <Popup>
              {`${atm.Bank_Name} - City Name: ${atm.City}, Address: ${atm.ATM_Address} atmType: ${atm.ATM_Type}`}
            </Popup>
          </Marker>
        ));
    }, [atmsList]);
  
    return <MarkerClusterGroup>{markers}</MarkerClusterGroup>;
  };

export default MarkerCluster;