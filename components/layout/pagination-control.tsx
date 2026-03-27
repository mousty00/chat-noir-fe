import { Button } from "@/components/ui/button";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
    onPageChange: (page: number) => void;
}

export const PaginationControls = ({
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    onPageChange,
}: PaginationControlsProps) => {
    return (
        <div className="flex items-center gap-4 bg-muted/40 border border-border px-3 py-1 rounded-md">
            <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPrevious}
                aria-label="Previous page"
                className="hover:text-secondary disabled:opacity-30"
            >
                <RiArrowLeftSLine className="h-5 w-5" />
            </Button>

            <div className="flex flex-col items-center">
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest leading-none mb-0.5">
                    Page
                </span>
                <span className="text-xs font-mono font-bold text-foreground min-w-[40px] text-center">
                    {currentPage + 1} / {totalPages}
                </span>
            </div>

            <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNext}
                aria-label="Next page"
                className="hover:text-secondary disabled:opacity-30"
            >
                <RiArrowRightSLine className="h-5 w-5" />
            </Button>
        </div>
    );
};