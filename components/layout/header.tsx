export const Header = () => {
    return (
        <header className="relative w-full mb-12 flex flex-col items-center justify-center overflow-hidden py-14 md:py-20">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
                <div className="w-[600px] h-[300px] rounded-full bg-secondary/8 blur-[80px] opacity-60" />
            </div>

            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="relative flex flex-col items-center gap-5 z-10">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-border" />
                    <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-muted-foreground/60 select-none">
                        est. 2024
                    </span>
                    <div className="h-px w-8 bg-border" />
                </div>

                <div className="relative">
                    <h1 className="text-[clamp(3rem,10vw,6rem)] font-sans font-bold tracking-[-0.02em] text-foreground uppercase leading-[0.9] text-center select-none">
                        CHAT<span className="text-secondary">NOIR</span>
                    </h1>
                </div>

                <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border/60 bg-muted/30 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/70 shrink-0" />
                    <p className="text-[10px] md:text-[11px] text-muted-foreground font-mono uppercase tracking-[0.28em]">
                        The Ultimate Cat Database
                    </p>
                </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </header>
    );
};
