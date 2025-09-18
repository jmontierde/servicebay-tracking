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
          "p-6 transition-all duration-300 ease-smooth",
          status.active &&
            "shadow-elevated border-servicebay-blue bg-servicebay-blue-light/20 animate-pulse-soft",
          status.completed &&
            "bg-servicebay-green-light/20 border-servicebay-green",
          !status.active && !status.completed && "opacity-60"
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
              status.completed && "bg-servicebay-green text-white",
              status.active &&
                "bg-servicebay-blue text-white animate-pulse-soft",
              !status.active &&
                !status.completed &&
                "bg-muted text-muted-foreground"
            )}
          >
            <Icon className="w-6 h-6" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3
                className={cn(
                  "font-semibold transition-colors duration-300",
                  status.active && "text-servicebay-blue",
                  status.completed && "text-servicebay-green"
                )}
              >
                {status.title}
              </h3>

              <div className="flex items-center gap-2">
                {status.timestamp && (
                  <span className="text-xs text-muted-foreground">
                    {status.timestamp}
                  </span>
                )}
                {status.completed && (
                  <Badge
                    variant="secondary"
                    className="bg-servicebay-green text-white"
                  >
                    Complete
                  </Badge>
                )}
                {status.active && (
                  <Badge
                    variant="secondary"
                    className="bg-servicebay-blue text-white animate-pulse-soft"
                  >
                    In Progress
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-foreground leading-relaxed">
              {status.description}
            </p>

            {status.details && (
              <p className="text-sm text-muted-foreground">{status.details}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Connection line to next status */}
      {!isLast && (
        <div className="absolute left-10 top-20 w-0.5 h-8 bg-border transition-colors duration-300" />
      )}
    </div>
  );
};
