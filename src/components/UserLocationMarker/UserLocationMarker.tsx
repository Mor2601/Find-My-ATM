import L from "leaflet";
import { useState } from "react";
import { useMapEvent, Marker, Popup } from "react-leaflet";
import { ZOOM_LEVEL_LOCATION } from "../../constants/constants";

const UserLocation: React.FC = () => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvent("locationfound", (e: L.LocationEvent) => {
    setPosition(e.latlng);
    e.target.flyTo(e.latlng, ZOOM_LEVEL_LOCATION);
  });

  useMapEvent("zoomend", (e:L.LeafletEvent) => {
    const map = e.target;
    if (map.getZoom() < ZOOM_LEVEL_LOCATION) {
      setPosition(null);
    }
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>המיקום שלך</Popup>
    </Marker>
  );
};

export default UserLocation;
