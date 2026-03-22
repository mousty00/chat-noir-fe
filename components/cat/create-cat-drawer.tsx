"use client";

import { useState, useRef } from "react";
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
import { useCategories } from "@/hooks/cat/useCategories";
import { useCreateCat } from "@/hooks/cat/useCreateCat";
import { Category } from "@/types/cat";
import { RiAddLine, RiUploadCloud2Line, RiCheckLine, RiLoader4Line } from "react-icons/ri";
import { toast } from "sonner";

export function CreateCatDrawer() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [sourceName, setSourceName] = useState("");
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { categories, loading: categoriesLoading } = useCategories();
    const { createCat, loading: creating, error } = useCreateCat();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMediaFile(e.target.files[0]);
        }
    };

    const resetForm = () => {
        setName("");
        setColor("");
        setSelectedCategory(null);
        setSourceName("");
        setMediaFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            toast.error("Name is required");
            return;
        }

        const success = await createCat(
            {
                name,
                color,
                category: selectedCategory,
                sourceName,
            },
            mediaFile
        );

        if (success) {
            toast.success("Cat created successfully!");
            setOpen(false);
            resetForm();
        } else if (error) {
            toast.error(error);
        }
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="bg-secondary hover:bg-secondary/80 border-none font-mono uppercase tracking-[0.2em] px-6 py-3 h-auto transition-all group">
                    <RiAddLine className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    New Cat
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-background/95 backdrop-blur-2xl border-border max-w-2xl mx-auto h-[90vh]">
                <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-muted my-4" />

                <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden px-8">
                    <DrawerHeader className="px-0">
                        <DrawerTitle className="text-2xl font-sans font-bold uppercase tracking-widest flex items-center gap-3">
                            <RiAddLine className="text-secondary" />
                            Create New Cat
                        </DrawerTitle>
                        <DrawerDescription className="text-xs font-mono uppercase tracking-widest text-muted-foreground mr-auto">
                            Enter the cat's details below to register it.
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="flex-1 overflow-y-auto py-6 space-y-8 scrollbar-hide">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="create-name">Name</Label>
                                <Input
                                    id="create-name"
                                    placeholder="e.g. Shadow"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-muted/50 border-border h-11 focus:border-secondary transition-all font-mono uppercase text-xs"
                                    disabled={creating}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="create-color">Color</Label>
                                <Input
                                    id="create-color"
                                    placeholder="e.g. Midnight Black"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="bg-muted/50 border-border h-11 focus:border-secondary transition-all font-mono uppercase text-xs"
                                    disabled={creating}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="create-category">Category</Label>
                                <Select
                                    value={selectedCategory?.id ?? ""}
                                    onValueChange={(id) => setSelectedCategory(categories.find(c => c.id === id) ?? null)}
                                    disabled={creating}
                                >
                                    <SelectTrigger id="create-category" className="bg-muted/50 border-border h-11 font-mono uppercase text-xs">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-popover border-border">
                                        {categoriesLoading ? (
                                            <SelectItem value="loading" disabled>Syncing...</SelectItem>
                                        ) : (
                                            categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id} className="font-mono text-xs uppercase cursor-pointer hover:bg-secondary/20">
                                                    {cat.name}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="create-source">Source</Label>
                                <Input
                                    id="create-source"
                                    placeholder="e.g. Neural Link"
                                    value={sourceName}
                                    onChange={(e) => setSourceName(e.target.value)}
                                    className="bg-muted/50 border-border h-11 focus:border-secondary transition-all font-mono uppercase text-xs"
                                    disabled={creating}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label>Media Upload</Label>
                            <div
                                onClick={() => !creating && fileInputRef.current?.click()}
                                className={`
                                        border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all bg-muted/20
                                        ${mediaFile ? 'border-secondary bg-secondary/5' : 'border-border hover:border-secondary/50 hover:bg-muted/50'}
                                        ${creating ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*,video/*"
                                />
                                {mediaFile ? (
                                    <>
                                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary-foreground">
                                            <RiCheckLine className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm font-mono text-foreground text-center break-all">{mediaFile.name}</p>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setMediaFile(null);
                                            }}
                                            className="text-[10px] text-muted-foreground hover:text-red-500 uppercase tracking-widest mt-2"
                                        >
                                            Remove
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <RiUploadCloud2Line className="h-10 w-10 text-muted-foreground group-hover:text-secondary transition-colors" />
                                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest text-center">
                                            Drop media file or click to upload
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <DrawerFooter className="px-0 pb-10 pt-6 flex flex-row gap-4">
                        <DrawerClose asChild>
                            <Button variant="outline" className="flex-1 font-mono uppercase tracking-widest h-12 border-border hover:bg-muted" disabled={creating}>
                                Cancel
                            </Button>
                        </DrawerClose>
                        <Button
                            type="submit"
                            className="flex-2 bg-secondary text-primary-foreground hover:bg-secondary/80 font-mono uppercase tracking-[0.2em] h-12 shadow-lg shadow-secondary/20"
                            disabled={creating}
                        >
                            {creating ? (
                                <RiLoader4Line className="h-5 w-5 animate-spin mr-2" />
                            ) : (
                                <RiCheckLine className="h-5 w-5 mr-2" />
                            )}
                            {creating ? 'Processing...' : 'Create'}
                        </Button>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
}
