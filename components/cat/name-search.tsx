"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface NameSearchProps {
    onSearch: (value: string) => void;
    placeholder?: string;
    initialValue?: string;
}

export function NameSearch({ onSearch, placeholder = "Search cats...", initialValue = "" }: NameSearchProps) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(value);
        }, 500);

        return () => clearTimeout(timer);
    }, [value, onSearch]);

    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                className="pl-8"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
