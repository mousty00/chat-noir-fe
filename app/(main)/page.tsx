"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { animate } from "animejs";
import { RiArrowRightLine } from "react-icons/ri";

export default function LandingPage() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  // Entrance animation
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    animate(el, {
      opacity: [0, 1],
      translateY: [28, 0],
      delay: 700,
      duration: 900,
      ease: "outExpo",
    });
    if (hintRef.current) {
      animate(hintRef.current, {
        opacity: [0, 0.5],
        delay: 1200,
        duration: 600,
        ease: "outSine",
      });
    }
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
    animate(btn, { translateX: x, translateY: y, duration: 350, ease: "outExpo" });
  };

  const handleMouseLeave = () => {
    animate(ctaRef.current!, {
      translateX: 0,
      translateY: 0,
      duration: 700,
      ease: "outElastic(1, .5)",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] w-full">
      <Header />

      <div
        className="relative z-10 -mt-8 flex flex-col items-center gap-6"
        style={{ opacity: 0 }}
        ref={ctaRef}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
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

                  {/* Shimmer sweep */}
                  <div className="btn-shimmer absolute inset-0 pointer-events-none" />

                  <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Button>
            </Link>
          </div>

          <p
            ref={hintRef}
            style={{ opacity: 0 }}
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground"
          >
            Click to discover
          </p>
        </div>

        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-secondary/15 dark:bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
      </div>
    </div>
  );
}
