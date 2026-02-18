import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry: () => void;
}

export const ErrorState = ({
    title = "Something went wrong",
    message,
    onRetry
}: ErrorStateProps) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-red-800 text-lg font-semibold mb-2">
                {title}
            </h2>
            <p className="text-red-600 mb-4">
                {message}
            </p>
            <Button
                onClick={onRetry}
                variant="destructive"
            >
                Try Again
            </Button>
        </div>
    );
};