"use client";

import { Cat } from "@/types/cat";
import { CatCard } from "./cat-card";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { RiSearchLine } from "react-icons/ri";

interface CatGridProps {
  cats: Cat[];
  onDownload: (cat: Cat) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDetails: (id: string) => void;
  downloadingId: string | null;
}

export const CatGrid = ({
  cats,
  onDownload,
  onView,
  onEdit,
  onDelete,
  onDetails,
  downloadingId,
}: CatGridProps) => {
  const gridRef = useRef<HTMLElement>(null);
  const emptyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || cats.length === 0) return;

    const cards = grid.querySelectorAll(".cat-card-item");
    if (!cards.length) return;

    animate(cards, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.96, 1],
      delay: stagger(35),
      duration: 480,
      ease: "outExpo",
    });
  }, [cats]);

  useEffect(() => {
    const el = emptyRef.current;
    if (!el || cats.length > 0) return;

    animate(el, {
      opacity: [0, 1],
      scale: [0.97, 1],
      duration: 400,
      ease: "outExpo",
    });
  }, [cats.length]);

  if (cats.length === 0) {
    return (
      <section
        ref={emptyRef}
        style={{ opacity: 0 }}
        className="flex flex-col items-center justify-center text-center py-24"
      >
        <div className="w-14 h-14 rounded-2xl bg-muted/60 border border-border/50 flex items-center justify-center mb-5">
          <RiSearchLine className="h-6 w-6 text-muted-foreground/40" />
        </div>
        <p className="text-[15px] font-semibold text-foreground mb-1">
          No cats found
        </p>
        <p className="text-[13px] text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </section>
    );
  }

  return (
    <section
      ref={gridRef}
      className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full"
    >
      {cats.map((cat) => (
        <div
          key={cat.id}
          className="cat-card-item"
          style={{ opacity: 0 }}
        >
          <CatCard
            cat={cat}
            onDownload={onDownload}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onDetails={onDetails}
            isDownloading={downloadingId === cat.id}
          />
        </div>
      ))}
    </section>
  );
};
