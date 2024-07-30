import { useMemo } from "react";
import { ATM } from "../../types";
import MarkerClusterGroup from "react-leaflet-cluster";
import {
  Marker,
  Popup
} from "react-leaflet";
import { isInIsraelBounds, createMarkerIcons } from "../../utils/utils";
interface MarkerClusterProps {
    atmsList: ATM[];
  }

const MarkerCluster: React.FC<MarkerClusterProps> = ({ atmsList }) => {
  const { withdrawalIcon, informationIcon } = createMarkerIcons();
  /**
   * Momoized the markers to prevent re-rendering since there lots of markers 
   */
    const markers = useMemo(() => {
      return atmsList
        .filter(
          (atm) =>
            isInIsraelBounds(atm)
        )
        .map((atm) => (
          <Marker
            key={atm._id}
            position={[atm.X_Coordinate, atm.Y_Coordinate]}
            icon={
              atm.ATM_Type === "משיכת מזומן" ? withdrawalIcon : informationIcon
            }
          >
            <Popup >
            <strong >{atm.Bank_Name}</strong>
            <br/>
          {atm.ATM_Address}
          {atm.City} | {atm.ATM_Type}
            </Popup>
          </Marker>
        ));
    }, [atmsList]);
  
    return <MarkerClusterGroup>{markers}</MarkerClusterGroup>;
  };

export default MarkerCluster;


