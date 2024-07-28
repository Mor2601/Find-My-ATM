import L from "leaflet";
import { useState, useRef, useEffect } from "react";
import { useMap } from "react-leaflet";

const CustomZoomControl: React.FC = () => {
  const map = useMap();
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const zoomControlContainer = map.zoomControl.getContainer();
    
    // Add styles to the zoom control container
    if (zoomControlContainer) {
      zoomControlContainer.style.opacity = "0.6";
      
    } else {
      console.error("zoomControlContainer is undefined");
    }

    const customButton = L.DomUtil.create(
      "a",
      "leaflet-control-custom-button",
      zoomControlContainer
    );
    customButton.title = "Home";
    customButton.style.display = "flex";
    customButton.style.alignItems = "center";
    customButton.style.justifyContent = "center";
    customButton.style.cursor = "pointer"; // Add cursor pointer style

    const iconElement = document.createElement("div");
    iconElement.style.width = "24px";
    iconElement.style.height = "24px";
    iconElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;
    customButton.appendChild(iconElement);

    if (zoomControlContainer) {
      zoomControlContainer.insertBefore(customButton, zoomControlContainer.firstChild);
    } else {
      console.error("zoomControlContainer is undefined");
    }

    const handleLocationFound = (e: L.LocationEvent) => {
      setPosition(e.latlng);
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      markerRef.current = L.marker(e.latlng).addTo(map);
      map.flyTo(e.latlng, 13);
    };

    const handleButtonClick = () => {
      map.locate();
    };

    const handleZoomEnd = () => {
      if (map.getZoom() < 13 && markerRef.current) {
        map.removeLayer(markerRef.current);
      }
    };

    map.on("locationfound", handleLocationFound);
    map.on("zoomend", handleZoomEnd);
    L.DomEvent.on(customButton, "click", handleButtonClick);

    return () => {
      if (customButton.parentNode) {
        customButton.parentNode.removeChild(customButton);
      }
      map.off("locationfound", handleLocationFound);
      map.off("zoomend", handleZoomEnd);
    };
  }, [map]);

  return null;
};

export default CustomZoomControl;
