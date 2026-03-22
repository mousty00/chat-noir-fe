"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface NameSearchProps {
    onSearch: (value: string) => void;
    placeholder?: string;
    initialValue?: string;
}

export function NameSearch({ onSearch, placeholder = "Search collection...", initialValue = "" }: NameSearchProps) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(value);
        }, 500);

        return () => clearTimeout(timer);
    }, [value, onSearch]);

    return (
        <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary transition-colors" />
            <Input
                type="search"
                placeholder={placeholder}
                className="pl-10 h-10 bg-background border border-border text-foreground text-[13px] placeholder:text-muted-foreground/50 focus:border-secondary transition-all rounded-xl"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
