import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Star } from "lucide-react";

export const TechnicianCard = () => {
  return (
    <Card className="mb-8 p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-servicebay-blue rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold">Jake Thompson</h3>
            <Badge
              variant="secondary"
              className="bg-servicebay-green text-white"
            >
              Assigned
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.9 (127 reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>(555) 123-4567</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            Senior Diesel Technician • 8 years experience
          </p>
        </div>
      </div>
    </Card>
  );
};
