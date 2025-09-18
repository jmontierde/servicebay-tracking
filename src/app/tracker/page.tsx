"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Truck, Clock, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ServiceBay from "../assets/service-bay-white.png";

const Index = () => {
  const router = useRouter();
  const [requestId, setRequestId] = useState<string>("");
  const handleTrackRequest = () => {
    if (requestId.trim()) {
      router.push(`/tracker/${requestId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col items-center gap-6 md:gap-8 text-center max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-4">
              <Image
                src={ServiceBay}
                alt="ServiceBay"
                width={100}
                height={100}
                className="drop-shadow-lg w-16 h-16 sm:w-20 sm:h-20"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  ServiceBay
                </h1>
                <p className="text-base sm:text-lg md:text-xl opacity-90 font-light">
                  Real-time Customer Request Tracking
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed px-4">
              Track your service request in real-time from initial dispatch to
              completion. Get live updates on technician assignment, arrival,
              diagnosis, and repair progress.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
        {/* Quick Track Section - Overlapping Card */}
        <Card className="relative -mt-16 md:-mt-32 z-10 p-6 md:p-8 mb-12 md:mb-20 shadow-2xl bg-white/95 backdrop-blur-sm border-0 mx-2 md:mx-4">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Search className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-900">
              Track Your Service Request
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Enter your request ID to start real-time tracking and get instant
              updates on your service progress
            </p>
          </div>

          <div className="w-full mx-auto space-y-4 md:space-y-6">
            <div>
              <Label
                htmlFor="quick-track"
                className="text-sm md:text-base font-semibold text-gray-700"
              >
                Request ID
              </Label>
              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                <Input
                  id="quick-track"
                  value={requestId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRequestId(e.target.value)
                  }
                  placeholder="e.g., SB-2024-001234"
                  className="flex-1 h-10 md:h-12 text-base md:text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  onKeyPress={(e: React.KeyboardEvent) =>
                    e.key === "Enter" && handleTrackRequest()
                  }
                />
                <Button
                  onClick={handleTrackRequest}
                  className="h-10 md:h-12 px-6 md:px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Track
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          <Card className="p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-0 group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-blue-200 transition-colors">
              <Truck className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900">
              Real-time Updates
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Live tracking from request to completion with instant
              notifications and status updates
            </p>
          </Card>

          <Card className="p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-0 group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-orange-200 transition-colors">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900">
              ETA Tracking
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Know exactly when your technician will arrive and complete the
              work with accurate ETAs
            </p>
          </Card>

          <Card className="p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-0 group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-green-200 transition-colors">
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900">
              Status Transparency
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Complete visibility into every step of your service process with
              detailed progress tracking
            </p>
          </Card>
        </div>

        <Card className="p-6 md:p-12 shadow-xl bg-gradient-to-br from-white to-blue-50 border-0">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                    Receive SMS Link
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    After your dispatcher call, you&apos;ll receive a text
                    message with your personalized tracking link
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                    Track Progress
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Monitor all status stages from request to completion in
                    real-time with live updates
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                    Get Updates
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Receive automatic updates for technician assignment,
                    arrival, and completion via SMS and email
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-center text-gray-900">
                Sample URL Format:
              </h4>
              <div className="bg-gray-100 p-3 md:p-4 rounded-xl text-center">
                <code className="text-xs md:text-sm font-mono text-gray-700 break-all">
                  servicebay.ai/tracker/SB-2024-001234
                </code>
              </div>
              <div className="mt-4 md:mt-6 text-center">
                <p className="text-xs md:text-sm text-gray-500">
                  Your unique tracking link will be sent via SMS
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
