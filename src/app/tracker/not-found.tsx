import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              ServiceBay AI
            </h1>
            <p className="text-lg opacity-90">Request Not Found</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card className="p-12 text-center shadow-card">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-muted-foreground" />
          </div>

          <h2 className="text-3xl font-bold mb-4">Request Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The service request you&apos;re looking for doesn&apos;t exist or
            may have been removed.
          </p>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">This could happen if:</p>
              <ul className="text-left max-w-md mx-auto space-y-1">
                <li>• The request ID is incorrect</li>
                <li>• The request has been completed and archived</li>
                <li>• The request was cancelled</li>
                <li>• You don&apos;t have permission to view this request</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild variant="outline">
                <Link href="/tracker" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Tracker
                </Link>
              </Button>
              <Button asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
