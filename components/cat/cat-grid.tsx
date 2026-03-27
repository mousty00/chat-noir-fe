"use client";

import { Cat } from "@/types/cat";
import { CatCard } from "./cat-card";
import { motion } from "framer-motion";
import { RiSearchLine } from "react-icons/ri";

interface CatGridProps {
  cats: Cat[];
  onDownload: (id: string) => void;
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
  if (cats.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center text-center py-24"
      >
        <div className="w-14 h-14 rounded-2xl bg-muted/60 border border-border/50 flex items-center justify-center mb-5">
          <RiSearchLine className="h-6 w-6 text-muted-foreground/40" />
        </div>
        <p className="text-[15px] font-semibold text-foreground mb-1">No cats found</p>
        <p className="text-[13px] text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </motion.section>
    );
  }

  return (
    <section className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
      {cats.map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: Math.min(i * 0.04, 0.32),
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
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
        </motion.div>
      ))}
    </section>
  );
};
