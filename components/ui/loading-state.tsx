export const LoadingState = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-black">
            <div className="relative w-16 h-16 mb-8 mt-20">
                <div className="absolute inset-0 border-2 border-secondary/20 rounded-full" />
                <div className="absolute inset-0 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-4 bg-secondary/10 rounded-full blur-xl animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <p className="font-mono text-sm text-white uppercase tracking-[0.5em] animate-pulse">
                    Initializing_Archive...
                </p>
                <span className="font-mono text-[10px] text-muted-foreground uppercase opacity-50">
                    Decrypting_Cat_Metadata
                </span>
            </div>
        </div>
    );
};