import { Button } from "@/components/ui/button";
import { RiRefreshLine } from "react-icons/ri";

interface RefreshButtonProps {
    onRefresh: () => void;
    isRefreshing: boolean;
}

export const RefreshButton = ({ onRefresh, isRefreshing }: RefreshButtonProps) => {
    return (
        <Button
            variant="secondary"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="uppercase tracking-[0.2em] px-6 py-3 h-auto flex items-center gap-2 text-foreground font-mono hover:text-secondary group transition-all"
            title={isRefreshing ? "Refreshing..." : "Refresh"}
        >
            {isRefreshing ? (
                <div className="h-5 w-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
            ) : (
                <RiRefreshLine className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            )}
            <span className="hidden md:inline">{isRefreshing ? 'Syncing' : 'Refresh'}</span>
        </Button>
    );
};