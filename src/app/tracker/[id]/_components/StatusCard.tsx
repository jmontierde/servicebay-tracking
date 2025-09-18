import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ServiceStatus } from "../page";

interface StatusCardProps {
  status: ServiceStatus;
  isLast: boolean;
}

export const StatusCard = ({ status, isLast }: StatusCardProps) => {
  const Icon = status.icon;

  return (
    <div className="relative">
      <Card
        className={cn(
          "p-6 transition-all duration-500 ease-out shadow-lg hover:shadow-xl",
          status.active &&
            "shadow-2xl border-blue-300 bg-gradient-to-r from-blue-50 to-blue-100 ring-2 ring-blue-200 animate-pulse-soft",
          status.completed &&
            "bg-gradient-to-r from-green-50 to-green-100 border-green-300",
          !status.active &&
            !status.completed &&
            "opacity-60 bg-white border-gray-200"
        )}
      >
        <div className="flex items-start gap-4 md:gap-6">
          <div
            className={cn(
              "flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg",
              status.completed &&
                "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-green-200",
              status.active &&
                "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-200 animate-pulse-soft",
              !status.active && !status.completed && "bg-gray-200 text-gray-500"
            )}
          >
            <Icon className="w-5 h-5 md:w-7 md:h-7" />
          </div>

          <div className="flex-1 space-y-2 md:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3
                className={cn(
                  "text-base md:text-lg font-bold transition-colors duration-300",
                  status.active && "text-blue-700",
                  status.completed && "text-green-700",
                  !status.active && !status.completed && "text-gray-500"
                )}
              >
                {status.title}
              </h3>

              <div className="flex items-center gap-2 md:gap-3">
                {status.timestamp && (
                  <span className="text-xs md:text-sm text-gray-500 font-medium">
                    {status.timestamp}
                  </span>
                )}
                {status.completed && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 px-2 md:px-3 py-1 text-xs md:text-sm font-semibold"
                  >
                    Complete
                  </Badge>
                )}
                {status.active && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 px-2 md:px-3 py-1 text-xs md:text-sm font-semibold animate-pulse-soft"
                  >
                    In Progress
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {status.description}
            </p>

            {status.details && (
              <p className="text-xs md:text-sm text-gray-500 bg-gray-50 p-2 md:p-3 rounded-lg">
                {status.details}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Connection line to next status */}
      {!isLast && (
        <div className="absolute left-8 md:left-12 top-20 md:top-24 w-0.5 md:w-1 h-8 md:h-12 bg-gradient-to-b from-gray-200 to-gray-300 transition-colors duration-300" />
      )}
    </div>
  );
};
