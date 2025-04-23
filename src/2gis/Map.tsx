// /// <reference types="google.maps" />
// /* global DG */

// import React, { useEffect, useRef } from "react";

// const Map: React.FC = () => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!window.DG || !mapRef.current) return;

//     const address = "Москва, Красная площадь";

//     window.DG.ajax({
//       url: `https://catalog.api.2gis.com/3.0/items/geocode?q=${encodeURIComponent(
//         address
//       )}&key=ВАШ_API_КЛЮЧ`,
//       success: function (result: any) {
//         if (!result.result.items.length) {
//           console.error("Адрес не найден");
//           return;
//         }

//         const { lat, lon } = result.result.items[0].point;

//         const map = window.DG.map(mapRef.current, {
//           center: [lat, lon],
//           zoom: 16,
//         });

//         window.DG.marker([lat, lon]).addTo(map).bindPopup(address);
//       },
//       error: function (err: any) {
//         console.error("Ошибка геокодирования:", err);
//       },
//     });
//   }, []);

//   return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
// };

// export default Map;
