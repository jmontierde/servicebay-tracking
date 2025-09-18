import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Navigation } from "lucide-react";

interface GPSTrackingMapProps {
  technicianName: string;
  estimatedArrival: string;
}

export const GPSTrackingMap = ({
  technicianName,
  estimatedArrival,
}: GPSTrackingMapProps) => {
  return (
    <Card className="mb-8 p-6 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Navigation className="w-5 h-5 text-servicebay-blue" />
            Live GPS Tracking
          </h3>
          <Badge variant="secondary" className="bg-servicebay-blue text-white">
            En Route
          </Badge>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="w-16 h-16 bg-servicebay-blue/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-8 h-8 text-servicebay-blue" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {technicianName} is currently en route to your location
          </p>
          <div className="flex items-center justify-center gap-2 text-servicebay-blue">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">ETA: {estimatedArrival}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Real-time location updates every 30 seconds
        </div>
      </div>
    </Card>
  );
};
