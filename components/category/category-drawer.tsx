"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
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
import { useCreateCategory } from "@/hooks/cat/useCreateCategory";
import { useUpdateCategory } from "@/hooks/cat/useUpdateCategory";
import { Category } from "@/types/cat";
import {
    RiAddLine,
    RiCheckLine,
    RiLoader4Line,
    RiEditLine,
} from "react-icons/ri";
import { toast } from "sonner";

const MEDIA_TYPE_HINTS = [
    { value: "IMAGE", label: "Image" },
    { value: "VIDEO", label: "Video" },
    { value: "GIF", label: "GIF" },
];

interface CategoryDrawerProps {
    category?: Category;
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function CategoryDrawer({ category, trigger, open: controlledOpen, onOpenChange }: CategoryDrawerProps) {
    const isEdit = !!category;
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [mediaTypeHint, setMediaTypeHint] = useState("");

    const { createCategory, loading: creating, error: createError } = useCreateCategory();
    const { updateCategory, loading: updating, error: updateError } = useUpdateCategory();

    const loading = creating || updating;
    const error = createError || updateError;

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : open;
    const setIsOpen = isControlled ? (onOpenChange ?? setOpen) : setOpen;

    useEffect(() => {
        if (isOpen) {
            setName(category?.name ?? "");
            setMediaTypeHint(category?.mediaTypeHint ?? "");
        }
    }, [isOpen, category]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        const input = { name: name.trim(), mediaTypeHint: mediaTypeHint || null };
        const success = isEdit
            ? await updateCategory(category.id, input)
            : await createCategory(input);

        if (success) {
            toast.success(isEdit ? "Category updated." : "Category created.");
            setIsOpen(false);
        } else if (error) {
            toast.error(error);
        }
    };

    const content = (
        <DrawerContent className="bg-background/95 backdrop-blur-2xl border-border max-w-lg mx-auto">
            <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-muted my-4" />

            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden px-8">
                <DrawerHeader className="px-0">
                    <DrawerTitle className="text-2xl font-sans font-bold uppercase tracking-widest flex items-center gap-3">
                        {isEdit ? (
                            <RiEditLine className="text-secondary" />
                        ) : (
                            <RiAddLine className="text-secondary" />
                        )}
                        {isEdit ? "Edit Category" : "New Category"}
                    </DrawerTitle>
                    <DrawerDescription className="text-xs font-mono uppercase tracking-widest text-muted-foreground mr-auto">
                        {isEdit ? "Update the category details below." : "Define a new content category."}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="py-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="category-name">Name <span className="text-destructive">*</span></Label>
                        <Input
                            id="category-name"
                            placeholder="e.g. Funny"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-muted/50 border-border h-11 focus:border-secondary transition-all font-mono uppercase text-xs"
                            disabled={loading}
                            autoFocus
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category-media-hint">
                            Media Type Hint
                            <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                        </Label>
                        <Select
                            value={mediaTypeHint || "__none__"}
                            onValueChange={(v) => setMediaTypeHint(v === "__none__" ? "" : v)}
                            disabled={loading}
                        >
                            <SelectTrigger
                                id="category-media-hint"
                                className="bg-muted/50 border-border h-11 font-mono uppercase text-xs"
                            >
                                <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                                <SelectItem value="__none__" className="font-mono text-xs uppercase cursor-pointer">
                                    None
                                </SelectItem>
                                {MEDIA_TYPE_HINTS.map((hint) => (
                                    <SelectItem
                                        key={hint.value}
                                        value={hint.value}
                                        className="font-mono text-xs uppercase cursor-pointer hover:bg-secondary/20"
                                    >
                                        {hint.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="text-[11px] text-muted-foreground font-mono">
                            Indicates the preferred media format for this category.
                        </p>
                    </div>
                </div>

                <DrawerFooter className="px-0 pb-10 pt-2 flex flex-row gap-4">
                    <DrawerClose asChild>
                        <Button variant="outline" className="flex-1" disabled={loading}>
                            Cancel
                        </Button>
                    </DrawerClose>
                    <Button
                        type="submit"
                        className="flex-2 shadow-lg shadow-secondary/20"
                        disabled={loading}
                    >
                        {loading ? (
                            <RiLoader4Line className="h-5 w-5 animate-spin mr-2" />
                        ) : (
                            <RiCheckLine className="h-5 w-5 mr-2" />
                        )}
                        {loading ? "Saving..." : isEdit ? "Update" : "Create"}
                    </Button>
                </DrawerFooter>
            </form>
        </DrawerContent>
    );

    if (isControlled) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            {trigger ? (
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            ) : (
                <DrawerTrigger asChild>
                    <Button className="group">
                        <RiAddLine className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                        New Category
                    </Button>
                </DrawerTrigger>
            )}
            {content}
        </Drawer>
    );
}
