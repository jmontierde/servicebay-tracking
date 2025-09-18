"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatusProgress } from "./_components/StatusProgress";
import { StatusCard } from "./_components/StatusCard";
import { TechnicianCard } from "@/app/tracker/_components/tracker/TechnicianCard";
import { MapComponent } from "./_components/MapComponent";
import { STATUSES } from "./constants/service-status";
import { Clock } from "lucide-react";
import ServiceBay from "../../assets/service-bay-white.png";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface ServiceStatus {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
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

  const resolvedParams = use(params);

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

  useEffect(() => {
    if (manualRequestId) {
      setIsConnected(true);

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
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [manualRequestId]);

  const handleTrackRequest = () => {
    if (manualRequestId.trim()) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <Image
                src={ServiceBay}
                alt="ServiceBay"
                width={80}
                height={80}
                className="drop-shadow-lg w-16 h-16 sm:w-20 sm:h-20"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  ServiceBay
                </h1>
                <p className="text-base sm:text-lg opacity-90 font-light">
                  Real-time Customer Request Tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {manualRequestId && (
          <Card className="relative -mt-32 z-10 mb-8 md:mb-12 p-6 md:p-8 shadow-2xl bg-white/95 backdrop-blur-sm border-0 mx-2 md:mx-4">
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Request Progress
                </h2>
                <Badge className="bg-blue-100 text-blue-700 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold">
                  {Math.round(currentProgress)}% Complete
                </Badge>
              </div>
              <StatusProgress progress={currentProgress} />
              <div className="text-center text-xs md:text-sm text-gray-600 font-medium">
                Step {currentStatus} of {STATUSES.length}
              </div>
            </div>
          </Card>
        )}

        <Card className="mb-8 md:mb-12 p-6 md:p-8 shadow-2xl bg-gradient-to-br from-white to-blue-50 border-0">
          <div className="space-y-4 md:space-y-6">
            <div>
              <Label
                htmlFor="request-id"
                className="text-base md:text-lg font-semibold text-gray-700"
              >
                Request ID
              </Label>
              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                <Input
                  id="request-id"
                  value={manualRequestId}
                  onChange={(e) => setManualRequestId(e.target.value)}
                  placeholder="Enter your request ID"
                  className="flex-1 h-10 md:h-12 text-base md:text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
                <Button
                  onClick={handleTrackRequest}
                  className="h-10 md:h-12 px-6 md:px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Track Request
                </Button>
              </div>
            </div>

            {isConnected && (
              <div className="flex items-center gap-3 text-xs md:text-sm text-green-600 bg-green-50 p-2 md:p-3 rounded-lg">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Real-time tracking active</span>
              </div>
            )}
          </div>
        </Card>

        {manualRequestId && (
          <>
            {currentStatus >= 3 && <TechnicianCard />}

            {currentStatus >= 4 && (
              <Card className="mb-8 md:mb-12 p-6 md:p-8 shadow-2xl bg-white border-0">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Technician Location
                    </h2>
                    <Badge className="bg-green-100 text-green-700 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold">
                      En Route
                    </Badge>
                  </div>
                  <p className="text-sm md:text-base text-gray-600">
                    Track Jake Thompson&apos;s real-time location as he heads to
                    your service location.
                  </p>
                  <MapComponent
                    technicianLocation={[40.7128, -74.006]} // New York City coordinates (example)
                    customerLocation={[40.7589, -73.9851]} // Times Square coordinates (example)
                    technicianName="Jake Thompson"
                    estimatedArrival="15 minutes"
                  />
                </div>
              </Card>
            )}

            <div className="space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                Status Timeline
              </h2>
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
          <Card className="p-8 md:p-16 text-center shadow-2xl bg-white/80 backdrop-blur-sm border-0">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Clock className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">
              Ready to Track Your Request
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto px-4">
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
