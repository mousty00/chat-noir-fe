"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface NameSearchProps {
    onSearch: (value: string) => void;
    placeholder?: string;
    initialValue?: string;
}

export function NameSearch({ onSearch, placeholder = "SEARCH_COLLECTION...", initialValue = "" }: NameSearchProps) {
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
                placeholder={placeholder.toUpperCase()}
                className="pl-10 h-10 bg-black border border-border text-white font-mono text-xs uppercase tracking-widest placeholder:text-muted-foreground/50 focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all rounded-md"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
