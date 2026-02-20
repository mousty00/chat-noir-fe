"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/cat/useCategories";
import { RiArrowDropDownLine } from "react-icons/ri";

interface CategorySelectProps {
    value?: string;
    onValueChange: (value: string) => void;
}

export function CategorySelect({ value, onValueChange }: CategorySelectProps) {
    const { categories, loading } = useCategories();

    return (
        <Select value={value || "all"} onValueChange={(val) => onValueChange(val === "all" ? "" : val)}>
            <SelectTrigger className="w-[180px] bg-black border border-border text-white font-mono uppercase tracking-widest hover:border-secondary transition-colors focus:ring-secondary/50 rounded-md">
                <SelectValue placeholder="SORT BY" />
            </SelectTrigger>
            <SelectContent className="bg-black border border-border text-white font-mono">
                <SelectGroup>
                    <SelectLabel className="text-secondary text-[10px] tracking-widest">CATEGORIES</SelectLabel>
                    <SelectItem value="all" className="focus:bg-secondary focus:text-white">ALL_ARCHIVE</SelectItem>
                    {loading ? (
                        <SelectItem value="loading" disabled className="text-muted-foreground">
                            FETCHING...
                        </SelectItem>
                    ) : (
                        categories.map((category) => (
                            <SelectItem key={category.id} value={category.name} className="focus:bg-secondary focus:text-white uppercase">
                                {category.name}
                            </SelectItem>
                        ))
                    )}
                </SelectGroup>
            </SelectContent>
        </Select >
    );
}
