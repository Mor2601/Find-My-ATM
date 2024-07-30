import L from "leaflet";
import { ATM } from "../types";
/**
 * Check if the ATM location is whitin Israel bounds
 * @param atm 
 * @returns {boolean}
 */
export const isInIsraelBounds = (atm: ATM): boolean => {
    return (
      atm.X_Coordinate !== null &&
      atm.Y_Coordinate !== null &&
      atm.X_Coordinate >= 29.5 &&
      atm.X_Coordinate <= 33.5 &&
      atm.Y_Coordinate >= 34.25 &&
      atm.Y_Coordinate <= 35.9
    );
  };
/**
 * Create two different icons for the markers
 * withdrawalIcon - orange
 * informationIcon - blue
 * @returns {L.Icon} withdrawalIcon, informationIcon
 */
export const createMarkerIcons = () => {
    const withdrawalIcon = new L.Icon({
      iconUrl: "./orange-pinned.png",
      iconSize: [28, 28],
    });
    const informationIcon = new L.Icon({
      iconUrl: "./blue-pinned.png",
      iconSize: [28, 28],
    });
    return { withdrawalIcon, informationIcon };
  };