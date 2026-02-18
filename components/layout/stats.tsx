interface StatsProps {
    itemCount: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

export const Stats = ({ itemCount, totalItems, currentPage, totalPages }: StatsProps) => {
    return (
        <div className="text-sm text-gray-600">
            <span>
                Showing {itemCount} of {totalItems} cats
                {totalPages > 1 && ` (Page ${currentPage + 1} of ${totalPages})`}
            </span>
        </div>
    );
};