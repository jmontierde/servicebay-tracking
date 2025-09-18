"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Truck, Clock, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ServiceBayBlue from "../assets/service-bay-blue.png";

const Index = () => {
  const [requestId, setRequestId] = useState("");
  const router = useRouter();
  const handleTrackRequest = () => {
    if (requestId.trim()) {
      router.push(`/tracker/${requestId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center gap-6 text-center max-w-4xl mx-auto">
            <Image
              src={ServiceBayBlue}
              alt="ServiceBay"
              width={80}
              height={80}
            />
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                ServiceBay AI
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Real-time Customer Request Tracking
              </p>
            </div>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Track your service request in real-time from initial dispatch to
              completion. Get live updates on technician assignment, arrival,
              diagnosis, and repair progress.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Quick Track Section */}
        <Card className="p-8 mb-16 shadow-elevated bg-gradient-card">
          <div className="text-center mb-8">
            <Search className="w-12 h-12 mx-auto mb-4 text-servicebay-blue" />
            <h2 className="text-2xl font-bold mb-2">
              Track Your Service Request
            </h2>
            <p className="text-muted-foreground">
              Enter your request ID to start real-time tracking
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <div>
              <Label htmlFor="quick-track" className="text-base font-medium">
                Request ID
              </Label>
              <Input
                id="quick-track"
                value={requestId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRequestId(e.target.value)
                }
                placeholder="e.g., SB-2024-001234"
                className="mt-2"
                onKeyPress={(e: React.KeyboardEvent) =>
                  e.key === "Enter" && handleTrackRequest()
                }
              />
            </div>
            <Button
              onClick={handleTrackRequest}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              size="lg"
            >
              Start Tracking
            </Button>
          </div>
        </Card>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center shadow-card">
            <Truck className="w-12 h-12 mx-auto mb-4 text-servicebay-blue" />
            <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
            <p className="text-muted-foreground text-sm">
              Live tracking from request to completion with instant
              notifications
            </p>
          </Card>

          <Card className="p-6 text-center shadow-card">
            <Clock className="w-12 h-12 mx-auto mb-4 text-servicebay-orange" />
            <h3 className="text-lg font-semibold mb-2">ETA Tracking</h3>
            <p className="text-muted-foreground text-sm">
              Know exactly when your technician will arrive and complete the
              work
            </p>
          </Card>

          <Card className="p-6 text-center shadow-card">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-servicebay-green" />
            <h3 className="text-lg font-semibold mb-2">Status Transparency</h3>
            <p className="text-muted-foreground text-sm">
              Complete visibility into every step of your service process
            </p>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="p-8 shadow-card">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-servicebay-blue text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Receive SMS Link</h3>
                  <p className="text-sm text-muted-foreground">
                    After your dispatcher call, you'll receive a text message
                    with your tracking link
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-servicebay-blue text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor all 13 status stages from request to completion in
                    real-time
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-servicebay-green text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive automatic updates for technician assignment,
                    arrival, and completion
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-semibold mb-4 text-center">
                Sample URL Format:
              </h4>
              <div className="bg-background p-3 rounded border text-sm font-mono text-center">
                servicebay.ai/tracker/SB-2024-001234
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
