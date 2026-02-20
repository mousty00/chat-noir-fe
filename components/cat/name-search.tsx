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
        <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                className="pl-8 retro-bevel-inset text-black placeholder:text-gray-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
