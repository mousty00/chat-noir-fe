export const Header = () => {
    return (
        <header className="w-full mb-16 flex flex-col items-center justify-center border-b border-border py-16 bg-black">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <h1 className="relative text-5xl md:text-6xl font-sans font-bold tracking-tight text-white uppercase text-center leading-none">
                        CHAT<span className="text-secondary">NOIR</span>
                    </h1>
                </div>

                <p className="text-[10px] md:text-xs text-muted-foreground font-mono uppercase tracking-[0.3em] text-center border px-3 py-1 border-border rounded-full">
                    The Ultimate Cat Database
                </p>
            </div>
        </header>
    );
};