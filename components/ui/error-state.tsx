import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry: () => void;
}

export const ErrorState = ({
    title = "System Error",
    message,
    onRetry
}: ErrorStateProps) => {
    return (
        <div className="bg-black border border-red-900/50 p-8 max-w-md mx-auto text-center font-mono">
            <div className="relative inline-block mb-6">
                <AlertCircle className="h-16 w-16 text-red-600 mx-auto" />
                <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full" />
            </div>

            <h2 className="text-white text-xl font-bold mb-4 uppercase tracking-[0.2em]">
                {title.toUpperCase().replace(/\s/g, '_')}
            </h2>

            <p className="text-muted-foreground mb-8 text-sm leading-relaxed border-t border-b border-border py-4">
                ERRORCODE: 500<br />
                MSG: {message}
            </p>

            <Button
                onClick={onRetry}
                variant="outline"
                className="w-full h-12 rounded-none border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest font-bold"
            >
                Rescue_System
            </Button>
        </div>
    );
};