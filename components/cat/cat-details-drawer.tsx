"use client";

import { useCatById } from "@/hooks/cat/useCatById";
import { useCatMediaDownload } from "@/hooks/cat/useCatMediaDownload";
import { useToggleFavorite } from "@/hooks/favorites/useToggleFavorite";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    RiInformationLine,
    RiDownload2Line,
    RiEyeLine,
    RiHashtag,
    RiPaletteLine,
    RiCompassDiscoverLine,
    RiLayout2Line,
    RiLoader4Line,
    RiHeartFill,
    RiHeartLine,
} from "react-icons/ri";

interface CatDetailsDrawerProps {
    catId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export const CatDetailsDrawer = ({ catId, isOpen, onClose }: CatDetailsDrawerProps) => {
    const { cat, loading, error } = useCatById(catId);
    const { downloadMedia, downloadingId } = useCatMediaDownload();
    const { toggleFavorite, loading: toggling } = useToggleFavorite();
    const favorited = useFavoriteStore((s) => s.isFavorite(cat?.id ?? ""));

    const handleDownload = () => cat && downloadMedia(cat.id);
    const handleToggleFavorite = () => cat && toggleFavorite(cat.id);

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DrawerContent className="bg-background/95 backdrop-blur-2xl border-border max-w-2xl mx-auto h-[90vh]">
                <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-muted my-4" />

                <div className="flex flex-col h-full overflow-hidden px-6">
                    <DrawerHeader className="px-0">
                        <DrawerTitle className="text-2xl font-sans font-bold uppercase tracking-widest flex items-center gap-3">
                            <RiInformationLine className="text-secondary" />
                            {cat?.name} Details
                        </DrawerTitle>
                    </DrawerHeader>

                    <div className="flex-1 overflow-y-auto py-6 space-y-8 scrollbar-hide">
                        {loading ? (
                            <div className="space-y-8 animate-pulse">
                                <div className="w-full aspect-video bg-muted/50 rounded-xl" />
                                <div className="space-y-4">
                                    <div className="h-4 w-1/3 bg-muted/50 rounded" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-20 bg-muted/50 rounded-lg" />
                                        <div className="h-20 bg-muted/50 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        ) : cat ? (
                            <>

                                <div className="relative group rounded-xl overflow-hidden border border-border bg-muted/20 shadow-2xl">
                                    {cat.image ? (
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-full h-auto max-h-[400px] object-cover"
                                        />
                                    ) : (
                                        <div className="w-full aspect-video flex flex-col items-center justify-center text-muted-foreground">
                                            <RiLayout2Line className="h-12 w-12 opacity-20 mb-2" />
                                            <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">No Media Available</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-secondary/80 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest px-3 py-1">
                                            {cat.category?.name || "Noir Category"}
                                        </Badge>
                                    </div>
                                </div>


                                <div className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-1 bg-secondary rounded-full" />
                                        <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground">Details</h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DataPoint
                                            icon={<RiHashtag />}
                                            label="ID"
                                            value={cat.id}
                                            mono
                                        />
                                        <DataPoint
                                            icon={<RiInformationLine />}
                                            label="Name"
                                            value={cat.name}
                                        />
                                        <DataPoint
                                            icon={<RiPaletteLine />}
                                            label="Color"
                                            value={cat.color || "Undetermined"}
                                        />
                                        <DataPoint
                                            icon={<RiCompassDiscoverLine />}
                                            label="Source"
                                            value={cat.sourceName || "Unknown"}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/10 flex items-start gap-4">
                                        <div className="p-2 rounded bg-secondary/10 text-secondary">
                                            <RiLayout2Line className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h5 className="text-[10px] font-mono uppercase text-secondary tracking-widest mb-1">Category Info</h5>
                                            <p className="text-xs text-muted-foreground">
                                                This cat is in the <span className="text-foreground font-bold">{cat.category?.name}</span> category.
                                                {cat.category?.mediaTypeHint && ` Optimized for ${cat.category.mediaTypeHint} media.`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="text-red-500 mb-4 opacity-50">
                                    <RiInformationLine className="h-12 w-12" />
                                </div>
                                <p className="text-sm font-mono uppercase text-red-500/80">Loading Error</p>
                                <p className="text-[10px] font-mono text-muted-foreground mt-2">{error.message}</p>
                            </div>
                        ) : null}
                    </div>

                    <div className="py-8 flex gap-3">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12 border-border font-mono uppercase tracking-widest text-[10px] hover:bg-muted"
                        >
                            Close
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleToggleFavorite}
                            disabled={!cat || toggling}
                            className={`h-12 w-12 shrink-0 border font-mono transition-colors ${
                                favorited
                                    ? "border-secondary/50 bg-secondary/10 text-secondary hover:bg-secondary/20"
                                    : "border-border hover:border-secondary/30 hover:text-secondary"
                            }`}
                        >
                            {toggling ? (
                                <RiLoader4Line className="h-4 w-4 animate-spin" />
                            ) : favorited ? (
                                <RiHeartFill className="h-4 w-4" />
                            ) : (
                                <RiHeartLine className="h-4 w-4" />
                            )}
                        </Button>
                        <Button
                            className="flex-1 h-12 bg-secondary text-primary-foreground hover:bg-secondary/90 font-mono uppercase tracking-widest text-[10px] shadow-2xl shadow-secondary/20"
                            onClick={handleDownload}
                            disabled={!cat || downloadingId === cat.id}
                        >
                            {downloadingId === cat?.id ? (
                                <RiLoader4Line className="h-4 w-4 animate-spin" />
                            ) : (
                                <RiDownload2Line className="mr-2 h-4 w-4" />
                            )}
                            Download
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

const DataPoint = ({ icon, label, value, mono = false }: { icon: React.ReactNode, label: string, value: string, mono?: boolean }) => (
    <div className="p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors group">
        <div className="flex items-center gap-2 mb-2">
            <div className="text-secondary/50 group-hover:text-secondary transition-colors">
                {icon}
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-secondary">{label}</span>
        </div>
        <p className={`text-xs uppercase tracking-wide truncate ${mono ? 'font-mono text-[10px]' : 'font-bold text-foreground'}`}>
            {value}
        </p>
    </div>
);
