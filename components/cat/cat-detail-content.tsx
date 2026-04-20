"use client";

import Image from "next/image";
import Link from "next/link";
import { useCatById } from "@/hooks/cat/useCatById";
import { useCatMediaDownload } from "@/hooks/cat/useCatMediaDownload";
import { useToggleFavorite } from "@/hooks/favorites/useToggleFavorite";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RiArrowLeftLine,
  RiDownload2Line,
  RiHashtag,
  RiHeartFill,
  RiHeartLine,
  RiLoader4Line,
  RiPaletteLine,
  RiCompassDiscoverLine,
  RiLayout2Line,
  RiInformationLine,
  RiShareLine,
} from "react-icons/ri";
import { toast } from "sonner";

interface CatDetailContentProps {
  id: string;
}

export const CatDetailContent = ({ id }: CatDetailContentProps) => {
  const { cat, loading, error } = useCatById(id);
  const { downloadMedia, downloadingId } = useCatMediaDownload();
  const { toggleFavorite, loading: toggling } = useToggleFavorite();
  const favorited = useFavoriteStore((s) => s.isFavorite(id));

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: cat?.name ?? "Chat Noir", url });
      } catch {
        // user dismissed
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto animate-pulse space-y-6">
        <div className="w-full aspect-[4/3] bg-muted/50 rounded-2xl" />
        <div className="space-y-3">
          <div className="h-6 w-1/3 bg-muted/50 rounded" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-muted/40 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !cat) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
        <RiInformationLine className="h-12 w-12 text-red-500/50" />
        <p className="text-sm font-mono uppercase text-red-500/80">
          {error?.message ?? "Cat not found"}
        </p>
        <Link href="/cats">
          <Button variant="outline" size="sm">
            <RiArrowLeftLine className="mr-2 h-4 w-4" />
            Back to cats
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back + actions bar */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/cats">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <RiArrowLeftLine className="h-4 w-4" />
            <span className="text-[12px] font-mono uppercase tracking-widest">Back</span>
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-xs"
            className="rounded-xl"
            onClick={handleShare}
            title="Share"
          >
            <RiShareLine className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon-xs"
            className={`rounded-xl transition-colors ${
              favorited
                ? "border-secondary/50 bg-secondary/10 text-secondary hover:bg-secondary/20"
                : "hover:border-secondary/30 hover:text-secondary"
            }`}
            onClick={() => toggleFavorite(cat.id)}
            disabled={toggling}
            title={favorited ? "Unfavorite" : "Favorite"}
          >
            {toggling ? (
              <RiLoader4Line className="h-3.5 w-3.5 animate-spin" />
            ) : favorited ? (
              <RiHeartFill className="h-3.5 w-3.5" />
            ) : (
              <RiHeartLine className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            size="sm"
            className="h-8 bg-secondary text-primary-foreground hover:bg-secondary/90 font-mono uppercase tracking-widest text-[10px] shadow-lg shadow-secondary/20 gap-2"
            onClick={() => downloadMedia(cat)}
            disabled={downloadingId === cat.id}
          >
            {downloadingId === cat.id ? (
              <RiLoader4Line className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RiDownload2Line className="h-3.5 w-3.5" />
            )}
            Download
          </Button>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-muted/20 shadow-2xl">
        {cat.image ? (
          <Image
            src={cat.image}
            alt={cat.name}
            width={1200}
            height={800}
            unoptimized
            priority
            className="w-full h-auto max-h-[520px] object-cover"
          />
        ) : (
          <div className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <RiLayout2Line className="h-12 w-12 opacity-20" />
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">No Image</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge className="bg-secondary/80 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest px-3 py-1">
            {cat.category?.name ?? "Noir"}
          </Badge>
        </div>
        {favorited && (
          <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-red-400/30">
            <RiHeartFill className="h-3.5 w-3.5 text-red-400" />
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{cat.name}</h1>
        {cat.category?.name && (
          <p className="text-sm text-muted-foreground mt-1">{cat.category.name}</p>
        )}
      </div>

      {/* Details grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1 bg-secondary rounded-full" />
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground">Details</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DataPoint icon={<RiHashtag />} label="ID" value={cat.id} mono />
          <DataPoint icon={<RiInformationLine />} label="Name" value={cat.name} />
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

      {/* Category info */}
      <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10 flex items-start gap-4">
        <div className="p-2 rounded bg-secondary/10 text-secondary shrink-0">
          <RiLayout2Line className="h-5 w-5" />
        </div>
        <div>
          <h5 className="text-[10px] font-mono uppercase text-secondary tracking-widest mb-1">Category Info</h5>
          <p className="text-xs text-muted-foreground">
            This cat is in the{" "}
            <span className="text-foreground font-bold">{cat.category?.name}</span> category.
            {cat.category?.mediaTypeHint && ` Optimized for ${cat.category.mediaTypeHint} media.`}
          </p>
        </div>
      </div>
    </div>
  );
};

const DataPoint = ({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) => (
  <div className="p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors group">
    <div className="flex items-center gap-2 mb-2">
      <div className="text-secondary/50 group-hover:text-secondary transition-colors">{icon}</div>
      <span className="text-[9px] font-mono uppercase tracking-widest text-secondary">{label}</span>
    </div>
    <p className={`text-xs uppercase tracking-wide truncate ${mono ? "font-mono text-[10px]" : "font-bold text-foreground"}`}>
      {value}
    </p>
  </div>
);
