"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

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

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] w-full">
      <Header />

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 -mt-8 flex flex-col items-center gap-6"
      >
        <div className="flex flex-col items-center gap-4">
          <Link href="/cats">
            <Button
              size="lg"
              className="group relative overflow-hidden px-8 h-14 rounded-full bg-secondary text-secondary-foreground hover:scale-105 transition-all duration-300"
              asChild
            >
              <div>
                <span className="relative z-10 flex items-center gap-2">
                  Explore the Archive
                  <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>

                <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Button>
          </Link>

          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/50 animate-pulse">
            Click to discover
          </p>
        </div>

        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
      </motion.div>
    </div>
  );
}
