import L from "leaflet";
import { useRef, useEffect } from "react";
import { useMap } from "react-leaflet";
import { ATM } from "../../types";
import { createMarkerIcons } from "../../utils/utils";
import {
  ZOOM_LEVEL_LOCATION,
  ZOOM_LEVEL_ATM_LOCATION,
} from "../../constants/constants";
interface ZoomMapOnAtmProps {
  atm: ATM;
  setAtm: (atm: ATM | null) => void;
}

const ZoomMapOnAtm: React.FC<ZoomMapOnAtmProps> = ({ atm, setAtm }) => {
  const { withdrawalIcon, informationIcon } = createMarkerIcons();
  const map = useMap();
  const focusedMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (atm) {
      if (focusedMarkerRef.current) {
        map.removeLayer(focusedMarkerRef.current);
      }

      focusedMarkerRef.current = L.marker(
        [atm.X_Coordinate, atm.Y_Coordinate],
        {
          icon:
            atm.ATM_Type === "משיכת מזומן" ? withdrawalIcon : informationIcon,
        }
      ).addTo(map).bindPopup(`
          <strong >${atm.Bank_Name}</strong><br/>
          ${atm.ATM_Address}
          ${atm.City} | 
          ${atm.ATM_Type}
        `);

      // Fly to the marker
      map.flyTo([atm.X_Coordinate, atm.Y_Coordinate], ZOOM_LEVEL_ATM_LOCATION);
      // Show only the focused marker and hide clusters
      const showFocusedMarker = () => {
        if (map.getZoom() <= ZOOM_LEVEL_LOCATION) {
          setAtm(null);
          if (focusedMarkerRef.current) {
            map.removeLayer(focusedMarkerRef.current);
          }
        }
      };

      map.on("zoomend", showFocusedMarker);

      return () => {
        map.off("zoomend", showFocusedMarker);
        if (focusedMarkerRef.current) {
          map.removeLayer(focusedMarkerRef.current);
        }
      };
    }
  }, [atm, map]);

  return null;
};
export default ZoomMapOnAtm;
