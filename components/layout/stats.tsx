interface StatsProps {
    itemCount: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

export const Stats = ({ itemCount, totalItems, currentPage, totalPages }: StatsProps) => {
    return (
        <div className="retro-bevel-inset px-2 py-1 text-xs font-bold text-black bg-white min-w-[200px]">
            <span>
                STATUS: {itemCount}/{totalItems} ITEMS
            </span>
        </div>
    );
};