import { Button } from "@/components/ui/button";
import { RiRefreshLine } from "react-icons/ri";

interface RefreshButtonProps {
    onRefresh: () => void;
    isRefreshing: boolean;
}

export const RefreshButton = ({ onRefresh, isRefreshing }: RefreshButtonProps) => {
    return (
        <Button
            variant="default"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-[#c0c0c0] text-black font-bold retro-button"
            title={isRefreshing ? "Refreshing..." : "Refresh"}
        >
            {isRefreshing ? (
                <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
                <RiRefreshLine className="h-4 w-4" />
            )}
        </Button>
    );
};