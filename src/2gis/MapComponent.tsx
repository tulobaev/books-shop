import { useEffect, useRef } from "react";

declare global {
  interface Window {
    mapgl: any;
  }
}

const MapComponent = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://mapgl.2gis.com/api/js/v1";
    script.async = true;

    script.onload = () => {
      if (mapContainerRef.current && window.mapgl) {
        mapRef.current = new window.mapgl.Map(mapContainerRef.current, {
          center: [72.82925, 40.492723], // Центр карты
          zoom: 16,
          key: "856b7b49-9a4c-498b-ad64-b0c9962ace3c",
          locale: "ky_KG", // Язык кыргызский
        });

        markerRef.current = new window.mapgl.Marker(mapRef.current, {
          coordinates: [72.82925, 40.492723], // Координаты для маркера
          label: {
            text: "", // Подпись маркера
          },
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (markerRef.current) markerRef.current.destroy();
      if (mapRef.current) mapRef.current.destroy();
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
  );
};

export default MapComponent;
