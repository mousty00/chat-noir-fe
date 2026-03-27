"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleSphere = dynamic(
  () =>
    import("@/components/three/particle-sphere").then((m) => ({
      default: m.ParticleSphere,
    })),
  { ssr: false }
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.13,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export const Header = () => {
  return (
    <header className="relative w-full mb-10 flex flex-col items-center justify-center overflow-hidden py-20 md:py-28">
      {/* Three.js particle sphere */}
      <ParticleSphere className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div className="w-[700px] h-[400px] rounded-full bg-secondary/7 blur-[120px]" />
      </div>

      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-5 z-10 text-center px-4">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 text-[10px] font-medium text-secondary tracking-[0.2em] uppercase">
            <span className="w-1 h-1 rounded-full bg-secondary animate-pulse" />
            The Ultimate Cat Archive
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[clamp(3.5rem,11vw,7.5rem)] font-bold tracking-[-0.05em] leading-[0.9] select-none"
        >
          Chat
          <span
            className="font-display italic text-secondary"
            style={{ fontStyle: "italic" }}
          >
            Noir
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[14px] md:text-[15px] text-muted-foreground max-w-[340px] leading-relaxed"
        >
          A curated database of cats across all categories — browsable,
          searchable, and open to the archive.
        </motion.p>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </header>
  );
};
