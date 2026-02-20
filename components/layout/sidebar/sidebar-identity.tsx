export function SidebarIdentity() {
    return (
        <div className="retro-bevel-inset bg-white p-4 flex flex-col items-center gap-2 mb-4">
            <div className="w-16 h-16 bg-violet-600/10 flex items-center justify-center retro-bevel">
                <span className="text-2xl font-black text-black italic">CN</span>
            </div>
            <span className="text-xs font-bold text-black uppercase tracking-widest text-center">
                Chat Noir Terminal
            </span>
        </div>
    );
}
