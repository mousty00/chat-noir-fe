"use client";

import { Badge } from "@/components/ui/badge";
import { RiCloseLine } from "react-icons/ri";

interface FilterChipsProps {
    category?: string;
    name?: string;
    color?: string;
    source?: string;
    categories: { id: string; name: string }[];
    onRemove: (type: "category" | "name" | "color" | "source") => void;
    onClearAll: () => void;
}

export const FilterChips = ({
    category,
    name,
    color,
    source,
    categories,
    onRemove,
    onClearAll,
}: FilterChipsProps) => {
    const activeCategory = categories.find((c) => c.id === category);

    const hasFilters = category || name || color || source;

    if (!hasFilters) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6 px-2 md:px-0 animate-in fade-in slide-in-from-top-2 duration-500">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mr-2">Active Protocols:</span>

            {name && (
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 h-7 px-3 gap-2 hover:bg-secondary/20 transition-all font-mono text-[10px] uppercase group">
                    Name: {name}
                    <button onClick={() => onRemove("name")} className="hover:text-foreground transition-colors">
                        <RiCloseLine className="h-3 w-3" />
                    </button>
                </Badge>
            )}

            {category && (
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 h-7 px-3 gap-2 hover:bg-secondary/20 transition-all font-mono text-[10px] uppercase group">
                    Category: {activeCategory?.name || category}
                    <button onClick={() => onRemove("category")} className="hover:text-foreground transition-colors">
                        <RiCloseLine className="h-3 w-3" />
                    </button>
                </Badge>
            )}

            {color && (
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 h-7 px-3 gap-2 hover:bg-secondary/20 transition-all font-mono text-[10px] uppercase group">
                    Color: {color}
                    <button onClick={() => onRemove("color")} className="hover:text-foreground transition-colors">
                        <RiCloseLine className="h-3 w-3" />
                    </button>
                </Badge>
            )}

            {source && (
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 h-7 px-3 gap-2 hover:bg-secondary/20 transition-all font-mono text-[10px] uppercase group">
                    Source: {source}
                    <button onClick={() => onRemove("source")} className="hover:text-foreground transition-colors">
                        <RiCloseLine className="h-3 w-3" />
                    </button>
                </Badge>
            )}

            <button
                onClick={onClearAll}
                className="text-[9px] font-mono text-muted-foreground uppercase tracking-tighter hover:text-red-500 transition-colors ml-2 underline underline-offset-4"
            >
                Clear All Matrix Filters
            </button>
        </div>
    );
};
