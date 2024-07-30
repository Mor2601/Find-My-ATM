import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "./CustomZoomControl.css"; // Import the CSS file
const HOME_ICON=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;
const CustomZoomControl: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const zoomControlContainer = map.zoomControl.getContainer();

    if (!zoomControlContainer) {
      console.error("zoomControlContainer is undefined");
      return;
    }

    const customButton = L.DomUtil.create(
      "a",
      "leaflet-control-custom-button",
      zoomControlContainer
    );
    customButton.title = "Home";

    const iconElement = document.createElement("div");
    iconElement.innerHTML = HOME_ICON;
    customButton.appendChild(iconElement);

    zoomControlContainer.insertBefore(customButton, zoomControlContainer.firstChild);

    const handleButtonClick = () => {
      map.locate();
    };

    L.DomEvent.on(customButton, "click", handleButtonClick);

    return () => {
      if (customButton.parentNode) {
        customButton.parentNode.removeChild(customButton);
      }
      L.DomEvent.off(customButton, "click", handleButtonClick);
    };
  }, [map]);

  return null;
};

export default CustomZoomControl;
