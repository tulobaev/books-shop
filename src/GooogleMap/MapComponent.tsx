import React, { useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "450px",
};

const center = {
  lat: 40.5145,
  lng: 72.8015,
};

const MapComponent: React.FC = () => {
  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    console.log("Клик по карте:", e.latLng?.toString());
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyC5QUDSQ90WFVxRPCnU_6oF0ajr1OYAtTY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={onMapClick}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
