import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  LayerGroup,
} from "react-leaflet";
import L, { marker, LatLngBoundsLiteral, LatLng } from "leaflet";
import HomeIcon from '@mui/icons-material/Home';
import { ATM } from "./../../types";

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
            atm.X_Coordinate >= 29.5 && atm.X_Coordinate <= 33.5 &&
            atm.Y_Coordinate >= 34.25 && atm.Y_Coordinate <= 35.9 &&
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
// const withdrawalIcon = new L.Icon({
//     iconUrl: './location-orange.png',
//     iconSize: [28, 28],
//   });
//   const informationIcon = new L.Icon({
//     iconUrl: './location-blue.png',
//     iconSize: [28, 28],
//   });
// const MarkerCluster = ({ atmsList }: { atmsList: ATM[] }) => {
//   const map = useMap();
//   const markerClusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

//   useEffect(() => {
//     if (markerClusterGroupRef.current) {
//       map.removeLayer(markerClusterGroupRef.current);
//     }

//     const markers = atmsList.map((atm) => {
//       if (atm.X_Coordinate !== null && atm.Y_Coordinate !== null) {
//         // Check if coordinates are within the expected ranges for Israel

//         if (atm.X_Coordinate >= 29.5 && atm.X_Coordinate <= 33.5 && atm.Y_Coordinate >= 34.25 && atm.Y_Coordinate <= 35.9) {
//           const marker = L.marker([atm.X_Coordinate, atm.Y_Coordinate]);
//           marker.setIcon(atm.ATM_Type === 'משיכת מזומן' ? withdrawalIcon : informationIcon);
//           marker.bindPopup(`${atm.Bank_Name} - ${atm.X_Coordinate} ${atm.Y_Coordinate}, ID: ${atm._id}, Address: ${atm.ATM_Address}`);

//           return marker;
//         }
//       } else {
//         console.error(`Invalid coordinates for ATM: ${atm._id}`);
//       }
//       return null;
//     }).filter((marker): marker is L.Marker => marker !== null);

//     // const markerLayerGroup = L.layerGroup(markers);
//     // map.addLayer(markerLayerGroup);
//     markerClusterGroupRef.current = L.markerClusterGroup();
//     markerClusterGroupRef.current.addLayers(markers);
//     map.addLayer(markerClusterGroupRef.current);

//     return () => {
//       if (markerClusterGroupRef.current) {
//         map.removeLayer(markerClusterGroupRef.current);
//       }
//     };
//   }, [atmsList, map]);

//   return null;
// };

const Map: React.FC<MapProps> = ({ atmsList }) => {
  const withdrawalIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "./orange-pinned.png",
        iconSize: [28, 28],
      }),
    []
  );

  const informationIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "./blue-pinned..png",
        iconSize: [28, 28],
      }),
    []
  );

  const bounds: LatLngBoundsLiteral = useMemo(
    () => [
      [29.5, 34.25], // Southwest corner
      [33.5, 35.9], // Northeast corner
    ],
    []
  );

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
              {`${atm.Bank_Name} - ${atm.X_Coordinate} ${atm.Y_Coordinate}, ID: ${atm._id}, Address: ${atm.ATM_Address}`}
            </Popup>
          </Marker>
        )),
    [atmsList, withdrawalIcon, informationIcon]
  );

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
      {/* <ATMsMap atmsList={atmsList}/> */}
      {/* {markers} */}
    </MapContainer>
  );
};

export default Map;
