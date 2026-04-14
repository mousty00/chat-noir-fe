"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { animate, stagger, createTimeline } from "animejs";
import { RiLinkedinBoxFill, RiGithubFill, RiInstagramLine } from "react-icons/ri";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/moustapha-ndiaye-a8512334b/",
    Icon: RiLinkedinBoxFill,
  },
  {
    label: "GitHub",
    href: "https://github.com/mousty00",
    Icon: RiGithubFill,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/mousty00",
    Icon: RiInstagramLine,
  },
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const brand = el.querySelector("[data-f='brand']") as HTMLElement | null;
          const legalItems = el.querySelectorAll("[data-f='legal']");
          const socialItems = el.querySelectorAll("[data-f='social']");
          const dividers = el.querySelectorAll("[data-f='divider']");

          const tl = createTimeline({ defaults: { ease: "outExpo" } });

          if (brand) {
            tl.add(brand, { opacity: [0, 1], translateY: [12, 0], duration: 600 });
          }

          if (dividers.length) {
            tl.add(dividers, { opacity: [0, 1], scaleX: [0, 1], duration: 500, delay: stagger(80) }, "-=400");
          }

          if (legalItems.length) {
            tl.add(
              legalItems,
              { opacity: [0, 1], translateY: [10, 0], duration: 500, delay: stagger(60) },
              "-=400"
            );
          }

          if (socialItems.length) {
            tl.add(
              socialItems,
              { opacity: [0, 1], translateY: [10, 0], scale: [0.85, 1], duration: 450, delay: stagger(70) },
              "-=350"
            );
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSocialEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    animate(e.currentTarget, {
      scale: 1.18,
      duration: 280,
      ease: "outBack(2)",
    });
  };

  const handleSocialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      duration: 400,
      ease: "outElastic(1, .6)",
    });
  };

  return (
    <footer ref={footerRef} className="relative w-full mt-auto">
      <div
        data-f="divider"
        className="h-px bg-linear-to-r from-transparent via-border to-transparent"
        style={{ opacity: 0, transformOrigin: "left" }}
      />

      <div
        style={{
          background: "bg-background",
          backdropFilter: "blur(40px) saturate(160%)",
          WebkitBackdropFilter: "blur(40px) saturate(160%)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div
            data-f="brand"
            className="flex flex-col items-center sm:items-start gap-0.5"
            style={{ opacity: 0 }}
          >
            <Link href="/" className="text-[14px] font-semibold tracking-[-0.03em] text-white">
              Chat
              <span className="font-display italic text-secondary">Noir</span>
            </Link>
            <p className="text-[11px] text-zinc-600">
              © {new Date().getFullYear()} — built by{" "}
              <a
                href="https://github.com/mousty00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary/60 hover:text-secondary transition-colors duration-200"
              >
                mousty00
              </a>
            </p>
          </div>

          <nav className="flex items-center gap-5" aria-label="Legal">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                data-f="legal"
                className="text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors duration-200 tracking-wide"
                style={{ opacity: 0 }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <nav className="flex items-center gap-3" aria-label="Social links">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-f="social"
                onMouseEnter={handleSocialEnter}
                onMouseLeave={handleSocialLeave}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-secondary transition-colors duration-200"
                style={{
                  opacity: 0,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
