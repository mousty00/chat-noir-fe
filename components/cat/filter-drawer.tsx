"use client";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/cat/useCategories";
import { useEffect, useState } from "react";
import { RiFilter3Line, RiRestartLine, RiSearch2Line } from "react-icons/ri";

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

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="relative h-11 border-border bg-background/40 backdrop-blur-sm font-mono text-[10px] uppercase tracking-[0.2em] px-6 transition-all hover:border-secondary group">
                    <RiFilter3Line className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                    Filter
                    {activeFiltersCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white rounded-full flex items-center justify-center text-[8px] animate-in zoom-in">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-background/95 backdrop-blur-2xl border-border max-w-xl mx-auto h-[70vh]">
                <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-muted my-4" />

                <div className="flex flex-col h-full overflow-hidden px-8">
                    <DrawerHeader className="px-0">
                        <DrawerTitle className="text-xl font-sans font-bold uppercase tracking-widest flex items-center gap-3">
                            <RiFilter3Line className="text-secondary" />
                            Filters
                        </DrawerTitle>
                    </DrawerHeader>

                    <div className="flex-1 overflow-y-auto py-8 space-y-8 scrollbar-hide">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="filter-name">Cat Name</Label>
                                <div className="relative group">
                                    <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                                    <Input
                                        id="filter-name"
                                        placeholder="enter cat name..."
                                        value={name || ""}
                                        onChange={(e) => setName(e.target.value || undefined)}
                                        className="bg-muted/50 border-border h-11 pl-10 focus:border-secondary transition-all font-mono text-xs"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="filter-color">Color</Label>
                                    <Input
                                        id="filter-color"
                                        placeholder="black/white..."
                                        value={color || ""}
                                        onChange={(e) => setColor(e.target.value || undefined)}
                                        className="bg-muted/50 border-border h-11 focus:border-secondary transition-all font-mono text-xs"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="filter-source">Source</Label>
                                    <Input
                                        id="filter-source"
                                        placeholder="..."
                                        value={source || ""}
                                        onChange={(e) => setSource(e.target.value || undefined)}
                                        className="bg-muted/50 border-border h-11 focus:border-secondary transition-all font-mono text-xs"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="filter-category">Category</Label>
                                <Select value={category || "all"} onValueChange={(val) => setCategory(val === "all" ? undefined : val)}>
                                    <SelectTrigger id="filter-category" className="bg-muted/50 border-border h-11 font-mono text-xs text-foreground">
                                        <SelectValue placeholder="ALL CATEGORIES" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-popover border-border">
                                        <SelectItem value="all" className="font-mono text-xs cursor-pointer">All Categories</SelectItem>
                                        {categories.map((c) => (
                                            <SelectItem key={c.id} value={c.id} className="font-mono text-xs cursor-pointer hover:bg-secondary/20 transition-colors">
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DrawerFooter className="px-0 pb-10 pt-6 flex flex-row gap-4">
                        <Button
                            variant="outline"
                            onClick={handleReset}
                            className="flex-1 h-12 border-border font-mono uppercase tracking-widest text-[10px] hover:bg-muted group"
                        >
                            <RiRestartLine className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                            Reset
                        </Button>
                        <Button
                            onClick={handleApply}
                            className="flex-2 h-12 bg-secondary text-white hover:bg-secondary/90 font-mono uppercase tracking-widest text-[10px] shadow-2xl shadow-secondary/20"
                        >
                            Apply
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
