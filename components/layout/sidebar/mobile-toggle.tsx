"use client";

interface MobileToggleProps {
    onClick: () => void;
    isOpen: boolean;
}

export function MobileToggle({ onClick, isOpen }: MobileToggleProps) {
    return (
        <button
            onClick={onClick}
            className="lg:hidden fixed top-4 left-4 z-50 retro-button flex items-center gap-2 bg-[#c0c0c0] px-3 py-1 shadow-[2px_2px_0px_#000]"
        >
            <div className="w-4 h-4 bg-violet-600 shadow-[1px_1px_0px_white_inset]" />
            <span className="font-bold uppercase tracking-tighter text-xs">
                {isOpen ? "Close" : "Start"}
            </span>
        </button>
    );
}
