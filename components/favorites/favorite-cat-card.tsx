"use client";

import { useToggleFavorite } from "@/hooks/favorites/useToggleFavorite";
import { useCatMediaDownload } from "@/hooks/cat/useCatMediaDownload";
import { Cat } from "@/types/cat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import {
  RiDownload2Fill,
  RiEyeLine,
  RiHeartFill,
  RiLoader4Line,
} from "react-icons/ri";

interface FavoriteCatCardProps {
  cat: Cat;
  onView: (id: string) => void;
}

export const FavoriteCatCard = ({ cat, onView }: FavoriteCatCardProps) => {
  const { toggleFavorite, loading: toggling } = useToggleFavorite();
  const { downloadMedia, downloadingId } = useCatMediaDownload();
  const [imageError, setImageError] = useState(false);

  const imageSrc = imageError || !cat.image ? "/images/no-image.png" : cat.image;
  const isDownloading = downloadingId === cat.id;

  return (
    <div
      className="group flex flex-col gap-4 w-full max-w-sm rounded-xl p-2 transition-all hover:bg-secondary/5 cursor-pointer"
      onClick={() => onView(cat.id)}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-muted border border-border group-hover:border-secondary transition-all duration-500 rounded-lg">
        <Image
          src={imageSrc}
          alt={cat.name}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 384px"
          className="object-cover transition-all duration-700 scale-[1.01] group-hover:scale-110"
          onError={() => setImageError(true)}
          onContextMenu={(e) => e.preventDefault()}
        />

        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4">
            <Button
              size="icon"
              rounded
              className="h-10 w-10 md:h-16 md:w-16"
              onClick={(e) => { e.stopPropagation(); onView(cat.id); }}
              variant="default"
            >
              <RiEyeLine className="h-6 w-6 md:h-10 md:w-10" />
            </Button>
            <Button
              size="icon"
              rounded
              className="h-10 w-10 md:h-16 md:w-16"
              onClick={(e) => { e.stopPropagation(); downloadMedia(cat.id); }}
              disabled={isDownloading}
              variant="default"
            >
              {isDownloading ? (
                <RiLoader4Line className="h-6 w-6 md:h-10 md:w-10 animate-spin" />
              ) : (
                <RiDownload2Fill className="h-6 w-6 md:h-10 md:w-10" />
              )}
            </Button>
            <Button
              size="icon"
              rounded
              className="h-10 w-10 md:h-16 md:w-16"
              onClick={(e) => { e.stopPropagation(); toggleFavorite(cat.id); }}
              disabled={toggling}
              variant="danger"
            >
              {toggling ? (
                <RiLoader4Line className="h-6 w-6 md:h-10 md:w-10 animate-spin" />
              ) : (
                <RiHeartFill className="h-6 w-6 md:h-10 md:w-10" />
              )}
            </Button>
          </div>
        </div>

        <div className="absolute top-3 left-3">
          <Badge className="bg-background/80 backdrop-blur-md border border-border text-[9px] text-foreground rounded-md px-2 py-0.5 font-mono uppercase tracking-[0.2em] group-hover:border-secondary/50 group-hover:text-secondary transition-colors">
            {cat.category?.name || "Noir"}
          </Badge>
        </div>

        <div className="absolute top-3 right-3">
          <div className="p-1.5 rounded-full bg-background/80 backdrop-blur-md border border-secondary/50">
            <RiHeartFill className="h-3 w-3 text-secondary" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-foreground group-hover:text-secondary transition-colors duration-300">
            {cat.name}
          </h3>
        </div>
        <div className="h-px w-full bg-border group-hover:bg-secondary/50 transition-all duration-500" />
        <div className="flex justify-between items-center mt-1">
          <span className="text-[9px] font-mono text-muted-foreground uppercase">
            {cat.color || "Unknown color"}
          </span>
          <span className="text-[9px] font-mono text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
            Full Details →
          </span>
        </div>
      </div>
    </div>
  );
};
