"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/cat/useCategories";
import { useDeleteCatMedia } from "@/hooks/cat/useDeleteCatMedia";
import { useUpdateCat } from "@/hooks/cat/useUpdateCat";
import { Cat, Category } from "@/types/cat";
import { useEffect, useState } from "react";
import { RiCheckFill, RiCloseLine, RiEdit2Line, RiLoader4Line, RiUploadCloud2Line } from "react-icons/ri";
import { Label } from "../ui/label";

interface UpdateCatDrawerProps {
    cat: Cat | null;
    isOpen: boolean;
    onClose: () => void;
}

export const UpdateCatDrawer = ({ cat, isOpen, onClose }: UpdateCatDrawerProps) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [category, setCategory] = useState<Category>();
    const [sourceName, setSourceName] = useState("");
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { categories } = useCategories();
    const { updateCat, loading } = useUpdateCat();
    const { deleteCatMedia } = useDeleteCatMedia();

    useEffect(() => {
        if (cat) {
            const timeoutId = setTimeout(() => {
                setName(cat.name);
                setColor(cat.color || "");
                setCategory(cat.category);
                setSourceName(cat.sourceName || "");
                setPreviewUrl(cat.image);
            }, 0);
            return () => clearTimeout(timeoutId);
        }
    }, [cat]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMediaFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const removeFile = async () => {
        if (mediaFile) {
            setMediaFile(null);
            setPreviewUrl(cat?.image || null);
        } else if (cat?.image) {
            if (window.confirm("Are you sure you want to remove this media permanenty from the record?")) {
                const success = await deleteCatMedia(cat.id);
                if (success) {
                    setPreviewUrl(null);
                }
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cat) return;

        const success = await updateCat(
            cat.id,
            {
                name,
                color,
                category: category,
                sourceName,
            },
            mediaFile
        );

        if (success) {
            onClose();
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DrawerContent className="bg-background/95 backdrop-blur-2xl border-border max-w-2xl mx-auto h-[90vh]">
                <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-muted my-4" />

                <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden px-6">
                    <DrawerHeader className="px-0">
                        <DrawerTitle className="text-2xl font-sans font-bold uppercase tracking-widest flex items-center gap-3">
                            <RiEdit2Line className="text-secondary" />
                            Edit Cat Details
                        </DrawerTitle>
                    </DrawerHeader>

                    <div className="flex-1 overflow-y-auto py-6 space-y-8 scrollbar-hide">
                        <div>

                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-4 w-1 bg-secondary rounded-full" />
                                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground">Basic Information</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="E.G. NOIR_UNIT_01"
                                        className="bg-muted/50 border-border h-11 focus:border-secondary transition-all font-mono uppercase text-xs"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="color">Color</Label>
                                    <Input
                                        id="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        placeholder="E.G. JET_BLACK"
                                        className="bg-muted/50 border-border h-11 focus:border-secondary transition-all font-mono uppercase text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-4 w-1 bg-secondary rounded-full" />
                                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground">Category</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={category?.id} onValueChange={(value) => setCategory(categories.find((cat) => cat.id === value))}>
                                        <SelectTrigger className="bg-muted/50 border-border h-11 font-mono uppercase text-xs text-foreground">
                                            <SelectValue placeholder="SELECT CATEGORY" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-popover border-border">
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id} className="font-mono text-xs uppercase hover:bg-secondary/20">
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="source">Source</Label>
                                    <Input
                                        id="source"
                                        value={sourceName}
                                        onChange={(e) => setSourceName(e.target.value)}
                                        placeholder="E.G. ARCHIVE_X"
                                        className="bg-muted/50 border-border h-11 focus:border-secondary transition-all font-mono uppercase text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-4 w-1 bg-secondary rounded-full" />
                                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground">Media</h4>
                            </div>

                            <div className="relative border-2 border-dashed border-border rounded-xl p-8 transition-all hover:border-secondary/30 bg-muted/20 group">
                                <input
                                    type="file"
                                    id="media"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />

                                {previewUrl ? (
                                    <div className="relative flex flex-col items-center gap-4">
                                        <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-border shadow-2xl">
                                            <Image
                                                src={previewUrl}
                                                alt="Preview"
                                                fill
                                                unoptimized
                                                sizes="160px"
                                                className="object-cover"
                                            />
                                            <Button
                                                type="button"
                                                size="icon-xs"
                                                variant="outline"
                                                onClick={removeFile}
                                                className="absolute top-2 right-2 rounded-full backdrop-blur-md"
                                            >
                                                <RiCloseLine className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {mediaFile && (
                                            <span className="text-[10px] font-mono text-secondary uppercase tracking-widest animate-pulse">
                                                File Ready: {mediaFile.name}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <Label
                                        htmlFor="media"
                                        className="flex flex-col items-center gap-4 cursor-pointer"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-muted/20 border border-border flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/30 transition-all duration-500">
                                            <RiUploadCloud2Line className="h-6 w-6 text-foreground/40 group-hover:text-secondary group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-mono uppercase tracking-widest text-foreground mb-1">Select Media File</p>
                                        </div>
                                    </Label>
                                )}
                            </div>
                        </div>
                    </div>

                    <DrawerFooter className="px-0 pb-8 pt-6 flex flex-row gap-3">
                        <DrawerClose asChild>
                            <Button variant="outline" className="flex-1">
                                Cancel
                            </Button>
                        </DrawerClose>
                        <Button
                            type="submit"
                            className="flex-2 group shadow-2xl shadow-secondary/20"
                            disabled={loading}
                        >
                            {loading ? (
                                <RiLoader4Line className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Save Changes
                                    <RiCheckFill className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
};
