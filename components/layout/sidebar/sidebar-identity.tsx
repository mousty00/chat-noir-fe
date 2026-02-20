export function SidebarIdentity() {
    return (
        <div className="flex flex-col items-start gap-3 mb-8 px-2">
            <div className="group relative flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-md flex items-center justify-center transition-all duration-300 group-hover:bg-white">
                    <span className="text-xl font-black text-black">CN</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-white uppercase tracking-[0.2em]">
                        Chat Noir
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                        System v1.0.4
                    </span>
                </div>
            </div>
        </div>
    );
}
