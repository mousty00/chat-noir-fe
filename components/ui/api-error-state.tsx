import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ApiErrorStateProps {
  message?: string;
  status?: number;
  onRetry: () => void;
}

export const ApiErrorState = ({
  message = "Unknown error occurred",
  status,
  onRetry
}: ApiErrorStateProps) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto text-center">
      <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
      <h2 className="text-yellow-800 text-lg font-semibold mb-2">
        API returned an error
      </h2>
      <p className="text-yellow-600 mb-2">
        {message}
      </p>
      {status && (
        <p className="text-sm text-yellow-500 mb-4">
          Status: {status}
        </p>
      )}
      <Button
        onClick={onRetry}
        variant="outline"
        className="border-yellow-500 text-yellow-700 hover:bg-yellow-100"
      >
        Try Again
      </Button>
    </div>
  );
};