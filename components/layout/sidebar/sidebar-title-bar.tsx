export function SidebarTitleBar() {
  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="text-[15px] font-bold tracking-[-0.03em] text-foreground">
        Chat
        <span className="font-display italic text-secondary" style={{ fontStyle: "italic" }}>
          Noir
        </span>
      </h2>
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
        </span>
        <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
          Online
        </span>
      </div>
    </div>
  );
}
