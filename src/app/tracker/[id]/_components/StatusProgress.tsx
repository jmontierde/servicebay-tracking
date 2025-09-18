import { Progress } from "@/components/ui/progress";

interface StatusProgressProps {
  progress: number;
}

export const StatusProgress = ({ progress }: StatusProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Progress value={progress} className="h-3 bg-muted" />
        <div
          className="absolute top-0 left-0 h-3 bg-gradient-status rounded-full transition-all duration-500 ease-smooth"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
