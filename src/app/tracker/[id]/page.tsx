"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatusProgress } from "./_components/StatusProgress";
import { StatusCard } from "./_components/StatusCard";
import { TechnicianCard } from "@/app/tracker/_components/tracker/TechnicianCard";
// import { GPSTrackingMap } from "@/app/tracker/_components/tracker/GPSTrackingMap";
import { STATUSES } from "./constants/service-status";
import {
  CheckCircle,
  Clock,
  MapPin,
  Wrench,
  FileText,
  CreditCard,
  User,
  AlertCircle,
  Badge,
} from "lucide-react";
import ServiceBayBlue from "../../assets/service-bay-blue.png";
import Image from "next/image";

export interface ServiceStatus {
  id: number;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
  active: boolean;
  timestamp?: string;
  details?: string;
}

interface TrackerProps {
  params: Promise<{ id: string }>;
}

const Tracker = ({ params }: TrackerProps) => {
  const searchParams = useSearchParams();
  const [manualRequestId, setManualRequestId] = useState("");
  const [statuses, setStatuses] = useState<ServiceStatus[]>(STATUSES);
  const [currentStatus, setCurrentStatus] = useState(1);
  const [isConnected, setIsConnected] = useState(false);

  // Unwrap the params Promise
  const resolvedParams = use(params);

  // Extract request ID from URL or search params
  useEffect(() => {
    if (resolvedParams.id) {
      setManualRequestId(resolvedParams.id);
    } else {
      const id = searchParams.get("id");
      if (id) {
        setManualRequestId(id);
      }
    }
  }, [resolvedParams.id, searchParams]);

  // Simulate WebSocket connection and status updates
  useEffect(() => {
    if (manualRequestId) {
      setIsConnected(true);

      // Simulate status progression
      const interval = setInterval(() => {
        setCurrentStatus((prev) => {
          if (prev < STATUSES.length) {
            const newStatus = prev + 1;

            setStatuses((prevStatuses) =>
              prevStatuses.map((status, index) => ({
                ...status,
                completed: index < newStatus - 1,
                active: index === newStatus - 1,
                timestamp:
                  index === newStatus - 1
                    ? new Date().toLocaleTimeString()
                    : status.timestamp,
              }))
            );

            if (newStatus <= STATUSES.length) {
            }

            return newStatus;
          }
          return prev;
        });
      }, 3000); // Update every 3 seconds for demo

      return () => clearInterval(interval);
    }
  }, [manualRequestId]);

  const handleTrackRequest = () => {
    if (manualRequestId.trim()) {
      // Reset tracking
      setCurrentStatus(1);
      setStatuses(
        STATUSES.map((status, index) => ({
          ...status,
          completed: false,
          active: index === 0,
          timestamp: index === 0 ? new Date().toLocaleTimeString() : undefined,
        }))
      );

      setIsConnected(true);
    }
  };

  const currentProgress = ((currentStatus - 1) / STATUSES.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-servicebay-gradient-blue  text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <Image
              src={ServiceBayBlue}
              alt="ServiceBay"
              width={60}
              height={60}
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                ServiceBay AI
              </h1>
              <p className="text-lg opacity-90">Customer Request Tracker</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Request ID Input */}
        <Card className="mb-8 p-6 shadow-card">
          <div className="space-y-4">
            <div>
              <Label htmlFor="request-id" className="text-base font-medium">
                Request ID
              </Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="request-id"
                  value={manualRequestId}
                  onChange={(e) => setManualRequestId(e.target.value)}
                  placeholder="Enter your request ID"
                  className="flex-1"
                />
                <Button
                  onClick={handleTrackRequest}
                  className="bg-servicebay-blue hover:bg-servicebay-blue/90"
                >
                  Track Request
                </Button>
              </div>
            </div>

            {isConnected && (
              <div className="flex items-center gap-2 text-sm text-servicebay-green">
                <div className="w-2 h-2 bg-servicebay-green rounded-full animate-pulse-soft"></div>
                Real-time tracking active
              </div>
            )}
          </div>
        </Card>

        {manualRequestId && (
          <>
            {/* Progress Overview */}
            <Card className="mb-8 p-6 shadow-card bg-gradient-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Request Progress</h2>
                  <Badge className="bg-servicebay-blue-light text-servicebay-blue">
                    {Math.round(currentProgress)}% Complete
                  </Badge>
                </div>
                <StatusProgress progress={currentProgress} />
                <div className="text-center text-sm text-muted-foreground">
                  Step {currentStatus} of {STATUSES.length}
                </div>
              </div>
            </Card>

            {/* Technician Card - Show when technician is assigned */}
            {currentStatus >= 2 && <TechnicianCard />}

            {/* GPS Tracking Map - Show when technician is en route */}
            {/* {currentStatus >= 3 && currentStatus < 4 && (
              <GPSTrackingMap
                technicianName="Jake"
                estimatedArrival="15 mins"
              />
            )} */}

            {/* Status Timeline */}
            <div className="space-y-4">
              {statuses.map((status, index) => (
                <StatusCard
                  key={status.id}
                  status={status}
                  isLast={index === statuses.length - 1}
                />
              ))}
            </div>
          </>
        )}

        {!manualRequestId && (
          <Card className="p-12 text-center shadow-card">
            <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">
              Ready to Track Your Request
            </h2>
            <p className="text-muted-foreground">
              Enter your request ID above to start real-time tracking of your
              service request.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Tracker;
