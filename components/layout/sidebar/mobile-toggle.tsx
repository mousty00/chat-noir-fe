"use client";

import { RiCloseLine, RiMenuLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

interface MobileToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

export function MobileToggle({ onClick, isOpen }: MobileToggleProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon-sm"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="lg:hidden fixed top-3 left-3 z-50 glass-panel border border-border/50 text-foreground transition-all duration-200 active:scale-95 hover:bg-white/5 shadow-none"
    >
      <span
        className="transition-all duration-200"
        style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
      >
        {isOpen ? (
          <RiCloseLine className="h-[18px] w-[18px]" />
        ) : (
          <RiMenuLine className="h-[18px] w-[18px]" />
        )}
      </span>
    </Button>
  );
}
