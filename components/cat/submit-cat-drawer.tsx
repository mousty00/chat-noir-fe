"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/useAuthStore";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/cat/useCategories";
import { useSubmitCat } from "@/hooks/cat/useSubmitCat";
import { Category } from "@/types/cat";
import { RiSendPlaneLine, RiLoader4Line, RiUploadCloud2Line, RiCheckLine } from "react-icons/ri";
import { toast } from "sonner";

export function SubmitCatDrawer() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [sourceName, setSourceName] = useState("");
    const [notes, setNotes] = useState("");
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { categories, loading: categoriesLoading } = useCategories();
    const { submitCat, loading, error } = useSubmitCat();

    const resetForm = () => {
        setName("");
        setColor("");
        setSelectedCategory(null);
        setSourceName("");
        setNotes("");
        setMediaFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMediaFile(file);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) {
            toast.error("Name is required");
            return;
        }
        if (!selectedCategory) {
            toast.error("Category is required");
            return;
        }

        const success = await submitCat({
            name,
            color: color || undefined,
            category: selectedCategory
                ? { id: selectedCategory.id, name: selectedCategory.name, mediaTypeHint: selectedCategory.mediaTypeHint ?? "" }
                : undefined,
            sourceName: sourceName || undefined,
            notes: notes || undefined,
            mediaFile: mediaFile || null,
        });

        if (success) {
            toast.success("Submission sent! An admin will review it soon.");
            resetForm();
            setOpen(false);
        } else if (error) {
            toast.error(error);
        }
    };

    const handleOpenChange = (next: boolean) => {
        if (next && !isAuthenticated) {
            toast.info("Sign in to submit a cat");
            router.push("/login");
            return;
        }
        setOpen(next);
    };

    return (
        <Drawer open={open} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>
                <Button>
                    <RiSendPlaneLine className="h-4 w-4" />
                    Submit a cat
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader>
                        <DrawerTitle>Submit a cat</DrawerTitle>
                        <DrawerDescription>
                            Suggest a cat to add to the collection. You can submit up to 3 per day — an admin will review it.
                        </DrawerDescription>
                    </DrawerHeader>

                    <form onSubmit={handleSubmit} className="px-4 space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="sub-name" className="text-[13px]">Name <span className="text-destructive">*</span></Label>
                            <Input
                                id="sub-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Luna"
                                className="text-[13px]"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="sub-category" className="text-[13px]">Category <span className="text-destructive">*</span></Label>
                            <Select
                                onValueChange={(val) => {
                                    const cat = categories.find((c) => c.id === val);
                                    setSelectedCategory(cat || null);
                                }}
                                disabled={categoriesLoading}
                            >
                                <SelectTrigger className="text-[13px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id} className="text-[13px]">
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="sub-color" className="text-[13px]">Color</Label>
                            <Input
                                id="sub-color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                placeholder="e.g. black, tabby"
                                className="text-[13px]"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="sub-source" className="text-[13px]">Source / origin</Label>
                            <Input
                                id="sub-source"
                                value={sourceName}
                                onChange={(e) => setSourceName(e.target.value)}
                                placeholder="e.g. My neighbor's cat"
                                className="text-[13px]"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="sub-notes" className="text-[13px]">Notes</Label>
                            <Textarea
                                id="sub-notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Anything else the admin should know..."
                                className="text-[13px] resize-none"
                                rows={3}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-[13px]">Photo <span className="text-muted-foreground font-normal">(optional)</span></Label>

                            {previewUrl ? (
                                <div className="relative group cursor-pointer rounded-xl overflow-hidden border border-input bg-muted/30" onClick={() => fileInputRef.current?.click()}>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <RiUploadCloud2Line className="w-5 h-5 text-white" />
                                        <span className="text-[13px] text-white font-medium">Change photo</span>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="flex flex-col items-center justify-center gap-2 px-3 py-8 rounded-xl border border-dashed border-input bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <RiUploadCloud2Line className="w-6 h-6 text-muted-foreground" />
                                    <span className="text-[13px] text-muted-foreground">Click to upload a photo</span>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        <DrawerFooter className="px-0 pt-2">
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? (
                                    <RiLoader4Line className="w-4 h-4 animate-spin" />
                                ) : (
                                    <RiSendPlaneLine className="w-4 h-4" />
                                )}
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline" type="button" onClick={resetForm} className="w-full">
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
