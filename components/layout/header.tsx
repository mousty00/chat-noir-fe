"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { stagger, createTimeline } from "animejs";
import { useThemeStore } from "@/hooks/useThemeStore";

const ParticleSphere = dynamic(
  () =>
    import("@/components/three/particle-sphere").then((m) => ({
      default: m.ParticleSphere,
    })),
  { ssr: false }
);

const CHAT = "Chat".split("");
const NOIR = "Noir".split("");

export const Header = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();
  const particleColor = theme === "dark" ? "#a78bfa" : "#8b5cf6";

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const badge = el.querySelector("[data-a='badge']") as HTMLElement | null;
    const chars = el.querySelectorAll("[data-a='char']");
    const subtitle = el.querySelector("[data-a='subtitle']") as HTMLElement | null;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    if (badge) {
      tl.add(badge, { opacity: [0, 1], translateY: [20, 0], duration: 700 });
    }

    if (chars.length) {
      tl.add(
        chars,
        {
          opacity: [0, 1],
          translateY: [48, 0],
          rotateX: [-80, 0],
          scale: [0.8, 1],
          delay: stagger(55),
          duration: 900,
        },
        "-=500"
      );
    }

    if (subtitle) {
      tl.add(subtitle, { opacity: [0, 1], translateY: [14, 0], duration: 700 }, "-=600");
    }
  }, []);

  return (
    <header className="relative w-full mb-10 flex flex-col items-center justify-center overflow-hidden py-20 md:py-28">
      {/* Three.js particle sphere */}
      <ParticleSphere 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
        color={particleColor}
        opacity={theme === "dark" ? 0.7 : 0.45}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div className="w-[700px] h-[400px] rounded-full bg-secondary/15 dark:bg-secondary/7 blur-[120px]" />
      </div>

      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      {/* Content */}
      <div
        ref={wrapperRef}
        className="relative flex flex-col items-center gap-5 z-10 text-center px-4"
      >
        <div data-a="badge" style={{ opacity: 0 }}>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-[10px] font-medium text-secondary tracking-[0.2em] uppercase">
            <span className="w-1 h-1 rounded-full bg-secondary animate-pulse" />
            The Ultimate Cat Archive
          </span>
        </div>

        <h1
          className="text-[clamp(3.5rem,11vw,7.5rem)] font-bold tracking-[-0.05em] leading-[0.9] select-none"
          style={{ perspective: "900px" }}
        >
          {/* "Chat" characters */}
          {CHAT.map((char, i) => (
            <span
              key={`chat-${i}`}
              data-a="char"
              style={{
                display: "inline-block",
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              {char}
            </span>
          ))}

          {/* "Noir" characters */}
          <span
            className="font-display italic text-secondary"
            style={{ display: "inline-block", perspective: "900px" }}
          >
            {NOIR.map((char, i) => (
              <span
                key={`noir-${i}`}
                data-a="char"
                style={{
                  display: "inline-block",
                  opacity: 0,
                  fontStyle: "italic",
                  willChange: "transform, opacity",
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p
          data-a="subtitle"
          style={{ opacity: 0 }}
          className="text-[14px] md:text-[15px] text-muted-foreground max-w-[340px] leading-relaxed"
        >
          A curated database of cats across all categories — browsable,
          searchable, and open to the archive.
        </p>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </header>
  );
};
