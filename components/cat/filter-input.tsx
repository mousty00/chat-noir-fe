"use client";

import { Input } from "@/components/ui/input";
import { RiFilter3Line } from "react-icons/ri";

interface FilterInputProps {
    value: string | undefined;
    onSearch: (value: string) => void;
    placeholder: string;
    icon?: React.ReactNode;
}

export const FilterInput = ({ value, onSearch, placeholder, icon }: FilterInputProps) => {
    return (
        <div className="relative group w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary transition-colors duration-300">
                {icon || <RiFilter3Line className="h-4 w-4" />}
            </div>
            <Input
                placeholder={placeholder}
                className="bg-background/40 backdrop-blur-sm border-border h-11 pl-10 pr-4 w-full focus:border-secondary transition-all duration-300 font-mono text-[10px] uppercase tracking-widest placeholder:text-muted-foreground/50"
                value={value || ""}
                onChange={(e) => onSearch(e.target.value)}
            />
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-secondary group-focus-within:w-full transition-all duration-500" />
        </div>
    );
};
