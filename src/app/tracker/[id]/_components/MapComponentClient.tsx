"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Create custom arrow icon for direction
const createArrowIcon = (color: string = "#3b82f6") => {
  return L.divIcon({
    html: `
      <div style="
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 16px solid ${color};
        transform: rotate(45deg);
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      "></div>
    `,
    className: "custom-arrow-icon",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

interface MapComponentClientProps {
  technicianLocation: [number, number];
  customerLocation: [number, number];
  technicianName: string;
  estimatedArrival: string;
}

// Component to update map center when technician location changes
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 13);
  }, [map, center]);

  return null;
}

export default function MapComponentClient({
  technicianLocation,
  customerLocation,
  technicianName,
  estimatedArrival,
}: MapComponentClientProps) {
  const mapRef = useRef<L.Map>(null);

  // Calculate center point between technician and customer
  const centerLat = (technicianLocation[0] + customerLocation[0]) / 2;
  const centerLng = (technicianLocation[1] + customerLocation[1]) / 2;
  const center: [number, number] = [centerLat, centerLng];

  // Calculate midpoint for direction arrow (closer to technician)
  const arrowLat =
    technicianLocation[0] + (customerLocation[0] - technicianLocation[0]) * 0.3;
  const arrowLng =
    technicianLocation[1] + (customerLocation[1] - technicianLocation[1]) * 0.3;
  const arrowPosition: [number, number] = [arrowLat, arrowLng];

  return (
    <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Direction line from technician to customer */}
        <Polyline
          positions={[technicianLocation, customerLocation]}
          pathOptions={{
            color: "#3b82f6",
            weight: 4,
            opacity: 0.8,
            dashArray: "10, 10",
          }}
        />

        {/* Direction arrow marker */}
        <Marker position={arrowPosition} icon={createArrowIcon("#3b82f6")}>
          <Popup>
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600">
                Direction to Customer
              </p>
            </div>
          </Popup>
        </Marker>

        {/* Customer Location Marker */}
        <Marker position={customerLocation}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Your Location</h3>
              <p className="text-sm text-gray-600">Service destination</p>
            </div>
          </Popup>
        </Marker>

        {/* Technician Location Marker */}
        <Marker position={technicianLocation}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-blue-600">{technicianName}</h3>
              <p className="text-sm text-gray-600">Technician</p>
              <p className="text-xs text-green-600 font-medium">
                ETA: {estimatedArrival}
              </p>
            </div>
          </Popup>
        </Marker>

        <MapUpdater center={center} />
      </MapContainer>
    </div>
  );
}
