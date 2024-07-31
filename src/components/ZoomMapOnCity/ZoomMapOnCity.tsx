import L from "leaflet";
import { useEffect, useContext } from "react";
import { useMap } from "react-leaflet";
import { ATM } from "../../types";
import { isInIsraelBounds } from "../../utils/utils";
import {
  ZOOM_LEVEL_LOCATION,
  ISRAEL_CENTER,
  MAP_ZOOM,
} from "../../constants/constants";
import { StateContext } from "../../context/StateContext";
interface ZoomMapOnCityProps {
  atmsList: ATM[];
}

const ZoomMapOnCity: React.FC<ZoomMapOnCityProps> = ({ atmsList }) => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("StateContext must be used within a StateProvider");
  }
  const { isQueryHaveCity } = context;
  const map = useMap();

  useEffect(() => {
    try {
      if (isQueryHaveCity && atmsList.length > 0) {
        // Calculate bounds  
        const latLngs = atmsList
          .filter((atm) => isInIsraelBounds(atm))
          .map((atm) => L.latLng(atm.X_Coordinate, atm.Y_Coordinate));

        const bounds = L.latLngBounds(latLngs);

        map.flyToBounds(bounds, { maxZoom: ZOOM_LEVEL_LOCATION });
      }else if(!isQueryHaveCity && atmsList.length > 0){
        map.flyTo([ISRAEL_CENTER[0],ISRAEL_CENTER[1]],MAP_ZOOM);
      }
    } catch (error) {
      console.error(error);
    } 
       
  }, [atmsList]);

  return null;
};
export default ZoomMapOnCity;
