import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-rotate"; 

// Credit to https://github.com/BubbleDK/bub-mdt/blob/8ab498051dce3a77c5e7469e0a7ef6720f7b4ed6/web/src/layers/mdt/components/Dispatch/components/Map.tsx#L5


const MapHandler = ({ mapType }: { mapType: string }) => {
  const map = useMap();

  const Layer = L.tileLayer(
    `https://s.rsg.sc/sc/images/games/GTAV/map/${mapType}/{z}/{x}/{y}.jpg`, 
    {
      maxZoom: 6,
      minZoom: 3.5,
      bounds: L.latLngBounds(L.latLng(0.0, 128.0), L.latLng(-192.0, 0.0)),
    }
  );
  const bounds = L.latLngBounds(L.latLng(0.0, 128.0), L.latLng(-192.0, 0.0));

  map.setMaxBounds(bounds);
  map.attributionControl.setPrefix(false);
  map.setView([0, 0], 0);
  map.addLayer(Layer);

  return null;
};

export default MapHandler;
