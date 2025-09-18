import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Star } from "lucide-react";

export const TechnicianCard = () => {
  return (
    <Card className="mb-8 md:mb-12 p-6 md:p-8 shadow-2xl bg-gradient-to-br from-white to-blue-50 border-0">
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-3">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Jake Thompson
            </h3>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 px-2 md:px-3 py-1 text-xs md:text-sm font-semibold"
            >
              Assigned
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 text-xs md:text-sm text-gray-600 mb-3">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.9 (127 reviews)</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium">(555) 123-4567</span>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-700 font-medium">
            Senior Diesel Technician • 8 years experience
          </p>
        </div>
      </div>
    </Card>
  );
};
