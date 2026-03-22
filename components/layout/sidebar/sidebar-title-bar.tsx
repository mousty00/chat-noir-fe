export function SidebarTitleBar() {
    return (
        <div className="flex items-center justify-between w-full">
            <h2 className="text-[15px] font-bold tracking-[-0.02em] text-foreground">
                Chat<span className="text-secondary">Noir</span>
            </h2>
            <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] text-muted-foreground font-medium">Online</span>
            </div>
        </div>
    );
}
