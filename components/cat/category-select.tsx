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
            <SelectTrigger className="bg-[#c0c0c0] text-black font-bold retro-button">
                <RiArrowDropDownLine className="mr-2 w-8 h-8 opacity-50 text-black" />
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="all">All Categories</SelectItem>
                    {loading ? (
                        <SelectItem value="loading" disabled>
                            Loading...
                        </SelectItem>
                    ) : (
                        categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                                {category.name}
                            </SelectItem>
                        ))
                    )}
                </SelectGroup>
            </SelectContent>
        </Select >
    );
}
