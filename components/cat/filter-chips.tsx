"use client";

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

const Chip = ({
    label,
    value,
    onRemove,
}: {
    label: string;
    value: string;
    onRemove: () => void;
}) => (
    <span className="group inline-flex items-center gap-0 h-7 rounded-full border border-border bg-muted/40 overflow-hidden animate-in fade-in zoom-in-95 duration-200 hover:border-secondary/30 transition-all">
        <span className="pl-3 pr-2 text-[9px] font-mono uppercase tracking-widest text-muted-foreground select-none">
            {label}
        </span>
        <span className="w-px h-3.5 bg-border/80 shrink-0" />
        <span className="px-2 text-[10px] font-mono text-foreground">
            {value}
        </span>
        <button
            onClick={onRemove}
            aria-label={`Remove ${label} filter`}
            className="mr-1.5 flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:bg-secondary/15 hover:text-secondary transition-all duration-150"
        >
            <RiCloseLine className="h-2.5 w-2.5" />
        </button>
    </span>
);

export const FilterChips = ({
    category,
    name,
    color,
    source,
    categories,
    onRemove,
    onClearAll,
}: FilterChipsProps) => {
    const activeCategory = categories.find((c) => c.name === category);
    const hasFilters = category || name || color || source;

    if (!hasFilters) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6 px-2 md:px-0 animate-in fade-in slide-in-from-top-2 duration-300">
            {name && (
                <Chip label="name" value={name} onRemove={() => onRemove("name")} />
            )}
            {category && (
                <Chip
                    label="category"
                    value={activeCategory?.name || category}
                    onRemove={() => onRemove("category")}
                />
            )}
            {color && (
                <Chip label="color" value={color} onRemove={() => onRemove("color")} />
            )}
            {source && (
                <Chip label="source" value={source} onRemove={() => onRemove("source")} />
            )}

            <button
                onClick={onClearAll}
                className="inline-flex items-center gap-1 h-7 px-2 text-[9px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-150 ml-1"
            >
                <RiCloseLine className="h-3 w-3" />
                Clear all
            </button>
        </div>
    );
};
