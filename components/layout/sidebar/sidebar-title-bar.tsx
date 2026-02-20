export function SidebarTitleBar() {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse bg-green-500" />
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white uppercase">
                    Online
                </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
                [v1.0]
            </span>
        </div>
    );
}
