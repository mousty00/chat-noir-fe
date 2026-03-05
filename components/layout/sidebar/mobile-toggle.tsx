"use client";

import { RiCloseLine, RiMenuLine } from "react-icons/ri";

interface MobileToggleProps {
    onClick: () => void;
    isOpen: boolean;
}

export function MobileToggle({ onClick, isOpen }: MobileToggleProps) {
    return (
        <button
            onClick={onClick}
            className="lg:hidden fixed top-2 left-2 z-50 retro-button flex items-center gap-2 bg-background px-3 py-1 shadow-[2px_2px_0px_#000]"
        >
            {isOpen ? (
                <RiCloseLine className="h-8 w-8" />
            ) : (
                <RiMenuLine className="h-8 w-8" />
            )}
            <p className="font-bold uppercase tracking-tighter text-xl">
                {isOpen ? "Close" : "Menu"}
            </p>
        </button>
    );
}
