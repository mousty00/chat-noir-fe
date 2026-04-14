"use client";

import { useState } from "react";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useCategories } from "@/hooks/cat/useCategories";
import { useDeleteCategory } from "@/hooks/cat/useDeleteCategory";
import { CategoryDrawer } from "@/components/category/category-drawer";
import { Category } from "@/types/cat";
import { Button } from "@/components/ui/button";
import {
    RiAddLine,
    RiEditLine,
    RiDeleteBin6Line,
    RiLoader4Line,
    RiListCheck3,
    RiImageLine,
    RiVideoLine,
    RiFileGifLine,
} from "react-icons/ri";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MEDIA_HINT_CONFIG: Record<string, { label: string; icon: React.ElementType; className: string }> = {
    IMAGE: { label: "Image", icon: RiImageLine, className: "bg-sky-500/10 text-sky-500 border-sky-500/20" },
    VIDEO: { label: "Video", icon: RiVideoLine, className: "bg-violet-500/10 text-violet-500 border-violet-500/20" },
    GIF: { label: "GIF", icon: RiFileGifLine, className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
};

function MediaHintBadge({ hint }: { hint: string }) {
    const config = MEDIA_HINT_CONFIG[hint];
    if (!config) {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border bg-muted/50 text-muted-foreground border-border">
                {hint}
            </span>
        );
    }
    const Icon = config.icon;
    return (
        <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border", config.className)}>
            <Icon className="w-3 h-3" />
            {config.label}
        </span>
    );
}

function CategoryCard({
    category,
    isAdmin,
    onEdit,
    onDelete,
    deleting,
}: {
    category: Category;
    isAdmin: boolean;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
    deleting: boolean;
}) {
    return (
        <div className="rounded-xl border border-border bg-background/60 p-4 flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0">
                    <span className="text-secondary font-bold text-sm uppercase">
                        {category.name.charAt(0)}
                    </span>
                </div>
                <div className="min-w-0">
                    <p className="text-[14px] font-semibold truncate">{category.name}</p>
                    {category.mediaTypeHint ? (
                        <div className="mt-1">
                            <MediaHintBadge hint={category.mediaTypeHint} />
                        </div>
                    ) : (
                        <p className="text-[12px] text-muted-foreground mt-0.5">No media hint</p>
                    )}
                </div>
            </div>

            {isAdmin && (
                <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => onEdit(category)}
                        disabled={deleting}
                    >
                        <RiEditLine className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => onDelete(category)}
                        disabled={deleting}
                    >
                        {deleting ? (
                            <RiLoader4Line className="w-4 h-4 animate-spin" />
                        ) : (
                            <RiDeleteBin6Line className="w-4 h-4" />
                        )}
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default function CategoriesPage() {
    const { user } = useAuthStore();
    const isAdmin = user?.isAdmin ?? false;

    const { categories, loading } = useCategories();
    const { deleteCategory, loading: deleting } = useDeleteCategory();

    const [editTarget, setEditTarget] = useState<Category | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleEdit = (category: Category) => {
        setEditTarget(category);
        setEditOpen(true);
    };

    const handleDelete = async (category: Category) => {
        if (!window.confirm(`Delete category "${category.name}"? This cannot be undone.`)) return;

        setDeletingId(category.id);
        const ok = await deleteCategory(category.id);
        setDeletingId(null);

        if (ok) {
            toast.success(`"${category.name}" deleted.`);
        } else {
            toast.error("Failed to delete category.");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl text-center font-semibold tracking-tight">Categories</h1>
                    <p className="text-[13px] text-muted-foreground mt-1">
                        {isAdmin
                            ? "Manage content categories and their media type hints."
                            : "Browse all available content categories."}
                    </p>
                </div>

                {isAdmin && <CategoryDrawer />}
            </div>

            {loading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-xl border border-border bg-background/60 p-4 h-[72px] animate-pulse" />
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <div className="rounded-xl border border-border bg-background/60 p-12 text-center space-y-3">
                    <RiListCheck3 className="w-10 h-10 text-muted-foreground mx-auto" />
                    <p className="text-[13px] text-muted-foreground">No categories yet.</p>
                    {isAdmin && (
                        <CategoryDrawer
                            trigger={
                                <Button size="sm" className="mt-2 mx-auto">
                                    <RiAddLine className="mr-2 h-4 w-4" />
                                    Create first category
                                </Button>
                            }
                        />
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] text-muted-foreground">
                            {categories.length} {categories.length === 1 ? "category" : "categories"}
                        </span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                isAdmin={isAdmin}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                deleting={deleting && deletingId === category.id}
                            />
                        ))}
                    </div>
                </div>
            )}

            {editTarget && (
                <CategoryDrawer
                    category={editTarget}
                    open={editOpen}
                    onOpenChange={(open) => {
                        setEditOpen(open);
                        if (!open) setEditTarget(null);
                    }}
                />
            )}
        </div>
    );
}
