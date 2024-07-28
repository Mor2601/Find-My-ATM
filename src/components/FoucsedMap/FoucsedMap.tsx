import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { ATM } from "../../types";

interface FoucsedMapProps {
    atmsList: ATM[];
    isCityFouced: boolean;
  }
  
  const FoucsedMap: React.FC<FoucsedMapProps> = ({ atmsList,isCityFouced }) => {
    const map = useMap();
  
    useEffect(() => {
      if (isCityFouced && atmsList.length > 0) {
        // Calculate bounds
        const latLngs = atmsList
          .filter(
            (atm) =>
              atm.X_Coordinate !== null &&
              atm.Y_Coordinate !== null &&
              atm.X_Coordinate >= 29.5 &&
              atm.X_Coordinate <= 33.5 &&
              atm.Y_Coordinate >= 34.25 &&
              atm.Y_Coordinate <= 35.9
          )
          .map((atm) => L.latLng(atm.X_Coordinate, atm.Y_Coordinate));
  
        const bounds = L.latLngBounds(latLngs);
        console.log(bounds);
        console.log(bounds.getCenter());
        const center = bounds.getCenter();
        map.flyToBounds(bounds, {maxZoom: 13});
      }
      return () => {
        map.flyTo([31.5, 34.75],
          8);
      }
    }, [atmsList]);
  
    return null;
  };
export default FoucsedMap;