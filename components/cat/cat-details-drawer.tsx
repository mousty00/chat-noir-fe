"use client";

import { useCatById } from "@/hooks/cat/useCatById";
import { useCatMediaDownload } from "@/hooks/cat/useCatMediaDownload";
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
    RiLoader4Line
} from "react-icons/ri";
import { Skeleton } from "@/components/ui/skeleton";

interface CatDetailsDrawerProps {
    catId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export const CatDetailsDrawer = ({ catId, isOpen, onClose }: CatDetailsDrawerProps) => {
    const { cat, loading, error } = useCatById(catId);
    const { downloadMedia, viewMedia, downloadingId } = useCatMediaDownload();

    const handleDownload = () => cat && downloadMedia(cat.id);
    const handleView = () => cat && viewMedia(cat.id);

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DrawerContent className="bg-black/95 backdrop-blur-2xl border-white/5 max-w-2xl mx-auto h-[90vh]">
                <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-white/10 my-4" />

                <div className="flex flex-col h-full overflow-hidden px-6">
                    <DrawerHeader className="px-0">
                        <DrawerTitle className="text-2xl font-sans font-bold uppercase tracking-widest flex items-center gap-3">
                            <RiInformationLine className="text-secondary" />
                            Archive Intelligence
                        </DrawerTitle>
                        <DrawerDescription className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                            Deep-level data inspection for feline entity
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="flex-1 overflow-y-auto py-6 space-y-8 scrollbar-hide">
                        {loading ? (
                            <div className="space-y-8 animate-pulse">
                                <div className="w-full aspect-video bg-white/5 rounded-xl" />
                                <div className="space-y-4">
                                    <div className="h-4 w-1/3 bg-white/5 rounded" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-20 bg-white/5 rounded-lg" />
                                        <div className="h-20 bg-white/5 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        ) : cat ? (
                            <>
                                {/* Visual Representation */}
                                <div className="relative group rounded-xl overflow-hidden border border-white/5 bg-white/2 shadow-2xl">
                                    {cat.image ? (
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-full h-auto max-h-[400px] object-cover"
                                        />
                                    ) : (
                                        <div className="w-full aspect-video flex flex-col items-center justify-center text-muted-foreground">
                                            <RiLayout2Line className="h-12 w-12 opacity-20 mb-2" />
                                            <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">No Visual Matrix Available</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-secondary/80 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest px-3 py-1">
                                            {cat.category?.name || "Noir Category"}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Data Matrix */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-1 bg-secondary rounded-full" />
                                        <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white">Neural Identification</h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DataPoint
                                            icon={<RiHashtag />}
                                            label="Identity Code"
                                            value={cat.id}
                                            mono
                                        />
                                        <DataPoint
                                            icon={<RiInformationLine />}
                                            label="Designation"
                                            value={cat.name}
                                        />
                                        <DataPoint
                                            icon={<RiPaletteLine />}
                                            label="Spectral Color"
                                            value={cat.color || "Undetermined"}
                                        />
                                        <DataPoint
                                            icon={<RiCompassDiscoverLine />}
                                            label="Origin Source"
                                            value={cat.sourceName || "Unknown Nexus"}
                                        />
                                    </div>
                                </div>

                                {/* Classification Context */}
                                <div className="space-y-4 pt-4">
                                    <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/10 flex items-start gap-4">
                                        <div className="p-2 rounded bg-secondary/10 text-secondary">
                                            <RiLayout2Line className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h5 className="text-[10px] font-mono uppercase text-secondary tracking-widest mb-1">Category Insights</h5>
                                            <p className="text-xs text-muted-foreground">
                                                This entity is classified under <span className="text-white font-bold">{cat.category?.name}</span>.
                                                {cat.category?.mediaTypeHint && ` Metadata optimizations are tuned for ${cat.category.mediaTypeHint} stream protocols.`}
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
                                <p className="text-sm font-mono uppercase text-red-500/80">Transmission Error</p>
                                <p className="text-[10px] font-mono text-muted-foreground mt-2">{error.message}</p>
                            </div>
                        ) : null}
                    </div>

                    <div className="py-8 flex gap-3">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12 border-white/10 font-mono uppercase tracking-widest text-[10px] hover:bg-white/5"
                        >
                            Close
                        </Button>
                        <div className="flex-2 flex gap-3">
                            <Button
                                className="flex-1 h-12 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono uppercase tracking-widest text-[10px]"
                                onClick={handleView}
                                disabled={!cat || downloadingId === cat.id}
                            >
                                <RiEyeLine className="mr-2 h-4 w-4" />
                                Inspect Stream
                            </Button>
                            <Button
                                className="flex-1 h-12 bg-secondary text-white hover:bg-secondary/90 font-mono uppercase tracking-widest text-[10px] shadow-2xl shadow-secondary/20"
                                onClick={handleDownload}
                                disabled={!cat || downloadingId === cat.id}
                            >
                                {downloadingId === cat?.id ? (
                                    <RiLoader4Line className="h-4 w-4 animate-spin" />
                                ) : (
                                    <RiDownload2Line className="mr-2 h-4 w-4" />
                                )}
                                Acquire Payload
                            </Button>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

const DataPoint = ({ icon, label, value, mono = false }: { icon: React.ReactNode, label: string, value: string, mono?: boolean }) => (
    <div className="p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 transition-colors group">
        <div className="flex items-center gap-2 mb-2">
            <div className="text-secondary/50 group-hover:text-secondary transition-colors">
                {icon}
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-secondary">{label}</span>
        </div>
        <p className={`text-xs uppercase tracking-wide truncate ${mono ? 'font-mono text-[10px]' : 'font-bold text-white'}`}>
            {value}
        </p>
    </div>
);
