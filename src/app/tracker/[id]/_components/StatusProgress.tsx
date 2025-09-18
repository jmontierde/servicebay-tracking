// import { Progress } from "@/components/ui/progress";

interface StatusProgressProps {
  progress: number;
}

export const StatusProgress = ({ progress }: StatusProgressProps) => {
  return (
    <div className="space-y-3">
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full transition-all duration-1000 ease-out opacity-50 blur-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Started</span>
        <span className="font-semibold">{Math.round(progress)}%</span>
        <span>Complete</span>
      </div>
    </div>
  );
};
