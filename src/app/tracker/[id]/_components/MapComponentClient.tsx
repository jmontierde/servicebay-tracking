"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Create custom icons for technician and customer
const createTechnicianIcon = (color: string = "#3b82f6") => {
  return L.divIcon({
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: white;
        font-weight: bold;
      ">T</div>
    `,
    className: "custom-technician-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const createCustomerIcon = (color: string = "#10b981") => {
  return L.divIcon({
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: white;
        font-weight: bold;
      ">C</div>
    `,
    className: "custom-customer-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

interface MapComponentClientProps {
  technicianLocation: [number, number];
  customerLocation: [number, number];
  technicianName: string;
  estimatedArrival: string;
}

// Component to handle routing machine
function RoutingMachine({
  technicianLocation,
  customerLocation,
}: {
  technicianLocation: [number, number];
  customerLocation: [number, number];
}) {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!map) return;

    // Debounce the routing control creation to prevent rapid updates
    const timeoutId = setTimeout(() => {
      // Remove existing routing control if it exists
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch (error) {
          console.warn("Error removing existing routing control:", error);
        }
        routingControlRef.current = null;
      }

      // Create new routing control using the global L.Routing
      try {
        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(technicianLocation[0], technicianLocation[1]),
            L.latLng(customerLocation[0], customerLocation[1]),
          ],
          routeWhileDragging: false,
          addWaypoints: false,
          // createMarker: () => null, // We'll use our custom markers
          lineOptions: {
            styles: [
              {
                color: "#3b82f6",
                weight: 6,
                opacity: 0.8,
              },
            ],
            extendToWaypoints: false,
            missingRouteTolerance: 0.1,
          },
          show: true, // Show the routing control panel
          collapsible: true,
          // draggableWaypoints: false,
          fitSelectedRoutes: true,
          showAlternatives: false,
          altLineOptions: {
            styles: [
              {
                color: "#6b7280",
                weight: 4,
                opacity: 0.6,
              },
            ],
            extendToWaypoints: false,
            missingRouteTolerance: 0.1,
          },
        });

        // Add routing control to map
        map.addControl(routingControlRef.current);
      } catch (error) {
        console.warn("Error creating routing control:", error);
      }
    }, 100); // 100ms debounce

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      try {
        if (routingControlRef.current && map) {
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      } catch (error) {
        console.warn("Error removing routing control:", error);
      }
    };
  }, [map, technicianLocation, customerLocation]);

  return null;
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

        {/* Routing Machine for directions */}
        <RoutingMachine
          technicianLocation={technicianLocation}
          customerLocation={customerLocation}
        />

        {/* Customer Location Marker */}
        <Marker
          position={customerLocation}
          icon={createCustomerIcon("#10b981")}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Your Location</h3>
              <p className="text-sm text-gray-600">Service destination</p>
            </div>
          </Popup>
        </Marker>

        {/* Technician Location Marker */}
        <Marker
          position={technicianLocation}
          icon={createTechnicianIcon("#3b82f6")}
        >
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
