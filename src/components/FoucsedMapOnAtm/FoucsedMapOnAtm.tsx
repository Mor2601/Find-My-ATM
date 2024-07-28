import L from "leaflet";
import { useRef, useEffect } from "react";
import { useMap } from "react-leaflet";
import { ATM } from "../../types";

interface FoucsedMapOnAtmProps {
    atm: ATM;
    setAtm: (atm: ATM | null) => void;
  }
  const withdrawalIcon = new L.Icon({
    iconUrl: "./orange-pinned.png",
    iconSize: [28, 28],
  });
  const informationIcon = new L.Icon({
    iconUrl: "./blue-pinned.png",
    iconSize: [28, 28],
  });
  const FoucsedMapOnAtm: React.FC<FoucsedMapOnAtmProps> = ({ atm, setAtm }) => {
    const map = useMap();
    const focusedMarkerRef = useRef<L.Marker | null>(null);
  
    useEffect(() => {
      if (atm) {
        // Create and add the focused marker
        if (focusedMarkerRef.current) {
          map.removeLayer(focusedMarkerRef.current);
        }
        
        focusedMarkerRef.current = L.marker(
          [atm.X_Coordinate, atm.Y_Coordinate],
          {
            icon: atm.ATM_Type === "משיכת מזומן" ? withdrawalIcon : informationIcon
          }
        ).addTo(map);
  
        // Fly to the marker
        map.flyTo([atm.X_Coordinate, atm.Y_Coordinate], 18);
  
        // Show only the focused marker and hide clusters
        const showFocusedMarker = () => {
          if (map.getZoom() <= 13) {
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
export default FoucsedMapOnAtm;