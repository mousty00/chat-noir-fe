"use client";

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useCategories } from "@/hooks/cat/useCategories";
import { useEffect, useState } from "react";
import { RiCloseLine, RiEqualizerLine, RiSearch2Line } from "react-icons/ri";
import { cn } from "@/lib/utils";

interface FilterDrawerProps {
    initialFilters: {
        category?: string;
        name?: string;
        color?: string;
        source?: string;
    };
    onApply: (filters: {
        category?: string;
        name?: string;
        color?: string;
        source?: string;
    }) => void;
}

export const FilterDrawer = ({ initialFilters, onApply }: FilterDrawerProps) => {
    const [category, setCategory] = useState<string | undefined>(initialFilters.category);
    const [name, setName] = useState<string | undefined>(initialFilters.name);
    const [color, setColor] = useState<string | undefined>(initialFilters.color);
    const [source, setSource] = useState<string | undefined>(initialFilters.source);
    const [isOpen, setIsOpen] = useState(false);

    const { categories } = useCategories();

    useEffect(() => {
        setCategory(initialFilters.category);
        setName(initialFilters.name);
        setColor(initialFilters.color);
        setSource(initialFilters.source);
    }, [initialFilters]);

    const handleApply = () => {
        onApply({ category, name, color, source });
        setIsOpen(false);
    };

    const handleReset = () => {
        setCategory(undefined);
        setName(undefined);
        setColor(undefined);
        setSource(undefined);
    };

    const activeFiltersCount = Object.values(initialFilters).filter(Boolean).length;
    const pendingCount = [category, name, color, source].filter(Boolean).length;

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <button className="relative inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition-all text-[13px] font-medium text-muted-foreground hover:text-foreground">
                    <RiEqualizerLine className="h-3.5 w-3.5" />
                    <span>Filter</span>
                    {activeFiltersCount > 0 && (
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-secondary text-white text-[10px] font-medium animate-in zoom-in duration-200">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>
            </DrawerTrigger>

            <DrawerContent className="bg-background/98 backdrop-blur-3xl border-border max-w-lg mx-auto">
                <div className="mx-auto w-8 h-1 shrink-0 rounded-full bg-muted mt-4 mb-0" />

                <div className="px-6 pb-8">
                    <div className="flex items-center justify-between py-5 border-b border-border/50">
                        <div className="flex items-center gap-3">
                            <DrawerTitle className="text-[15px] font-semibold">Filters</DrawerTitle>
                            {pendingCount > 0 && (
                                <span className="text-[12px] text-secondary font-medium animate-in fade-in duration-200">
                                    {pendingCount} active
                                </span>
                            )}
                        </div>
                        {pendingCount > 0 && (
                            <button
                                onClick={handleReset}
                                className="inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors font-medium"
                            >
                                <RiCloseLine className="h-3.5 w-3.5" />
                                Reset
                            </button>
                        )}
                    </div>

                    <div className="divide-y divide-border/40">
                        <div className="py-5">
                            <label className="block text-[11px] font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                                Name
                            </label>
                            <div className="relative flex items-center">
                                <RiSearch2Line className="absolute left-0 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                                <input
                                    placeholder="Search by name..."
                                    value={name || ""}
                                    onChange={(e) => setName(e.target.value || undefined)}
                                    className="w-full bg-transparent pl-6 pb-2 border-b border-border focus:border-foreground outline-none text-[14px] text-foreground placeholder:text-muted-foreground/40 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="py-5 grid grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[11px] font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                                    Color
                                </label>
                                <input
                                    placeholder="e.g. black"
                                    value={color || ""}
                                    onChange={(e) => setColor(e.target.value || undefined)}
                                    className="w-full bg-transparent pb-2 border-b border-border focus:border-foreground outline-none text-[14px] text-foreground placeholder:text-muted-foreground/40 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                                    Source
                                </label>
                                <input
                                    placeholder="Origin..."
                                    value={source || ""}
                                    onChange={(e) => setSource(e.target.value || undefined)}
                                    className="w-full bg-transparent pb-2 border-b border-border focus:border-foreground outline-none text-[14px] text-foreground placeholder:text-muted-foreground/40 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="py-5">
                            <label className="block text-[11px] font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                                Category
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setCategory(undefined)}
                                    className={cn(
                                        "h-7 px-3.5 rounded-full text-[12px] font-medium border transition-all",
                                        !category
                                            ? "bg-foreground text-background border-foreground"
                                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                                    )}
                                >
                                    All
                                </button>
                                {categories.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => setCategory(category === c.name ? undefined : c.name)}
                                        className={cn(
                                            "h-7 px-3.5 rounded-full text-[12px] font-medium border transition-all",
                                            category === c.name
                                                ? "bg-secondary text-white border-secondary"
                                                : "border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground"
                                        )}
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleApply}
                        className="mt-4 w-full h-11 rounded-xl bg-foreground text-background text-[14px] font-medium hover:opacity-90 active:scale-[0.99] transition-all"
                    >
                        {pendingCount > 0 ? `Apply ${pendingCount} filter${pendingCount > 1 ? "s" : ""}` : "Apply"}
                    </button>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
