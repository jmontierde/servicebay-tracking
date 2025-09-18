"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface MapComponentProps {
  technicianLocation: [number, number];
  customerLocation: [number, number];
  technicianName: string;
  estimatedArrival: string;
}

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(() => import("./MapComponentClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

export const MapComponent = ({
  technicianLocation,
  customerLocation,
  technicianName,
  estimatedArrival,
}: MapComponentProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <DynamicMap
      technicianLocation={technicianLocation}
      customerLocation={customerLocation}
      technicianName={technicianName}
      estimatedArrival={estimatedArrival}
    />
  );
};
