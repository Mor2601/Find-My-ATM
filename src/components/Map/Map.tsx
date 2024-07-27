import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  LayerGroup,
  ScaleControl,
  AttributionControl,
  ZoomControl,
  FeatureGroup,
} from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";
import MarkerClusterGroup from "react-leaflet-cluster";
import L, { marker, LatLngBoundsLiteral, LatLng } from "leaflet";
import HomeIcon from "@mui/icons-material/Home";
import { ATM } from "./../../types";
import { IconButton } from "@mui/material";
import { SvgIcon } from "@mui/material";

interface MapProps {
  atmsList: ATM[];
}
export function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
export const ATMsMap = ({ atmsList }: { atmsList: ATM[] }) => {
  const map = useMap();
  const [bounds, setBounds] = useState<LatLngBoundsLiteral>([
    [map.getBounds().getSouthWest().lat, map.getBounds().getSouthWest().lng],
    [map.getBounds().getNorthEast().lat, map.getBounds().getNorthEast().lng],
  ]);
  const withdrawalIcon = new L.Icon({
    iconUrl: "./location-orange.png",
    iconSize: [28, 28],
  });
  const informationIcon = new L.Icon({
    iconUrl: "./location-blue.png",
    iconSize: [28, 28],
  });
  useEffect(() => {
    const center = map.getBounds().getCenter();
    setBounds([[center.lat, center.lng]]);
  }, [map]);

  const updateBounds = () => {
    const newBounds = map.getBounds();
    setBounds([
      [newBounds.getSouthWest().lat, newBounds.getSouthWest().lng],
      [newBounds.getNorthEast().lat, newBounds.getNorthEast().lng],
    ]);
  };

  useEffect(() => {
    map.on("moveend", updateBounds);
    return () => {
      map.off("moveend", updateBounds);
    };
  }, [map]);

  const markers = useMemo(
    () =>
      atmsList
        .filter(
          (atm) =>
            atm.X_Coordinate !== null &&
            atm.Y_Coordinate !== null &&
            atm.X_Coordinate >= 29.5 &&
            atm.X_Coordinate <= 33.5 &&
            atm.Y_Coordinate >= 34.25 &&
            atm.Y_Coordinate <= 35.9 &&
            bounds[0][0] <= atm.X_Coordinate &&
            atm.X_Coordinate <= bounds[1][0] &&
            bounds[0][1] <= atm.Y_Coordinate &&
            atm.Y_Coordinate <= bounds[1][1]
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
              {`${atm.Bank_Name} - ${atm.X_Coordinate} ${atm.Y_Coordinate}, ID: ${atm._id}, Address: ${atm.ATM_Address}`}
            </Popup>
          </Marker>
        )),
    [atmsList, bounds, withdrawalIcon, informationIcon]
  );

  return <LayerGroup>{markers}</LayerGroup>;
};

// const LocationMarker = () => {
//   const [position, setPosition] = useState<L.LatLng | null>(null);
//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// };
const withdrawalIcon = new L.Icon({
    iconUrl: './orange-pinned.png',
    iconSize: [28, 28],
  });
  const informationIcon = new L.Icon({
    iconUrl: './blue-pinned.png',
    iconSize: [28, 28],
  });
  export const MarkerCluster = ({ atmsList }: { atmsList: ATM[] }) => {
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
            icon={atm.ATM_Type === 'משיכת מזומן' ? withdrawalIcon : informationIcon}
          >
            <Popup>
              {`${atm.Bank_Name} -  City Name: ${atm.City}, Address: ${atm.ATM_Address} atmType: ${atm.ATM_Type}`}
            </Popup>
          </Marker>
        ));
    }, [atmsList]);
  
    return (
      <MarkerClusterGroup>
        {markers}
      </MarkerClusterGroup>
    );
  };

export const CustomZoomControl = () => {
  const map = useMap();

  useEffect(() => {
    // Access the existing zoom control container
    const zoomControlContainer = map.zoomControl.getContainer();

    // Add custom button with HomeIcon
    const customButton = L.DomUtil.create(
      "a",
      "leaflet-control-custom-button",
      zoomControlContainer
    );
    customButton.title = "Home";
    customButton.style.display = "flex";
    customButton.style.alignItems = "center";
    customButton.style.justifyContent = "center";
    const iconElement = document.createElement("div");
    iconElement.style.width = "24px";
    iconElement.style.height = "24px";
    iconElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;
    customButton.appendChild(iconElement);
    if (zoomControlContainer) {
      // Safe to use zoomControlContainer here
      zoomControlContainer.insertBefore(customButton, zoomControlContainer.firstChild);;
    } else {
      console.error("zoomControlContainer is undefined");
    }

    L.DomEvent.on(customButton, "click", () => {
      alert("Custom button clicked!");
      // Add your custom functionality here
    });

    return () => {
      // Remove the custom button when the component is unmounted
      if (customButton.parentNode) {
        customButton.parentNode.removeChild(customButton);
      }
    };
  }, [map]);

  return null;
};

const Map: React.FC<MapProps> = ({ atmsList }) => {


  return (
    <MapContainer
      center={[31.5, 34.75]}
      zoom={8}
      style={{ height: "100vh", width: "100%" }}
      // bounds={bounds}
      // maxBounds={bounds}
      // maxBoundsViscosity={1.0}
      
      
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />

      <CustomZoomControl />
    <MarkerCluster atmsList={atmsList}/>
      {/* <ATMsMap atmsList={atmsList}/> */}
      
      {/* <MarkerClusterGroup>
        {atmsList
        .filter(
          (atm) =>
            atm.X_Coordinate !== null &&
            atm.Y_Coordinate !== null &&
            atm.X_Coordinate >= 29.5 &&
            atm.X_Coordinate <= 33.5 &&
            atm.Y_Coordinate >= 34.25 &&
            atm.Y_Coordinate <= 35.9
        )
        .map((atm) =>(
          <Marker
            key={atm._id}
            position={[atm.X_Coordinate, atm.Y_Coordinate]}
            icon={
              atm.ATM_Type === "משיכת מזומן" ? withdrawalIcon : informationIcon
            }
          >
            <Popup>
              {`${atm.Bank_Name} - ${atm.X_Coordinate} ${atm.Y_Coordinate}, ID: ${atm._id}, Address: ${atm.ATM_Address}`}
            </Popup>
          </Marker>
        ))
          }
      </MarkerClusterGroup> */}
     
    </MapContainer>
  );
};

export default Map;
