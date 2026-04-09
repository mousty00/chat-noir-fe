interface StatsProps {
    itemCount: number;
    totalItems: number;
}

export const Stats = ({
    itemCount,
    totalItems,
}: StatsProps) => {
    return (
        <div className="flex items-center gap-4 px-4 py-2 border border-border bg-muted/40 backdrop-blur-sm rounded-md">
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Total:</span>
                <span className="text-xs font-mono font-bold text-secondary">{totalItems}</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Showing:</span>
                <span className="text-xs font-mono font-bold text-foreground">{itemCount}</span>
            </div>
        </div>
    );
};
