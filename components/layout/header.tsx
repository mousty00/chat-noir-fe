export const Header = () => {
    return (
        <header className="relative w-full mb-10 flex flex-col items-center justify-center overflow-hidden py-16 md:py-24">
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
            >
                <div className="w-[700px] h-[350px] rounded-full bg-secondary/6 blur-[100px]" />
            </div>

            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

            <div className="relative flex flex-col items-center gap-4 z-10 text-center px-4">
                <span className="text-[11px] font-medium text-secondary tracking-[0.2em] uppercase">
                    The Ultimate Cat Archive
                </span>

                <h1 className="text-[clamp(3.5rem,12vw,7rem)] font-bold tracking-[-0.04em] text-foreground leading-[0.92] select-none">
                    Chat<span className="text-secondary">Noir</span>
                </h1>

                <p className="text-[15px] text-muted-foreground max-w-md leading-relaxed tracking-normal">
                    A curated database of cats across all categories — browsable, searchable, and open to the archive.
                </p>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        </header>
    );
};
