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
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPrevious}
                aria-label="Previous page"
                className="retro-button p-0 h-8 w-8 text-black"
            >
                <RiArrowLeftSLine className="h-4 w-4" />
            </Button>

            <span className="text-sm min-w-[40px] text-center">
                {currentPage + 1} / {totalPages}
            </span>

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNext}
                aria-label="Next page"
                className="retro-button p-0 h-8 w-8 text-black"
            >
                <RiArrowRightSLine className="h-4 w-4" />
            </Button>
        </div>
    );
};