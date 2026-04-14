"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiSettings4Line, RiShieldCheckLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useCookieConsentStore, CookieCategory } from "@/hooks/useCookieConsentStore";
import Link from "next/link";

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "relative inline-flex h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 focus-visible:outline-none",
        disabled
          ? "cursor-not-allowed border-white/10 bg-secondary/30"
          : checked
            ? "cursor-pointer border-secondary/40 bg-secondary/70"
            : "cursor-pointer border-white/10 bg-white/8",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none inline-block h-4 w-4 translate-y-px rounded-full shadow transition-transform duration-200",
          checked ? "translate-x-4 bg-white" : "translate-x-0.5 bg-zinc-500",
        ].join(" ")}
      />
    </button>
  );
}

interface Category {
  id: CookieCategory;
  label: string;
  description: string;
  required: boolean;
}

const CATEGORIES: Category[] = [
  {
    id: "essential",
    label: "Essential",
    description:
      "Required for authentication and core functionality. These cannot be disabled.",
    required: true,
  },
  {
    id: "functional",
    label: "Functional",
    description:
      "Remembers your preferences such as theme and UI settings across sessions.",
    required: false,
  },
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Helps us understand how the site is used to improve the experience. Currently not active.",
    required: false,
  },
];

export function CookieConsentBanner() {
  const { hasConsented, consent, acceptAll, rejectAll, saveConsent, updateConsent } =
    useCookieConsentStore();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!hasConsented) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, [hasConsented]);

  if (hasConsented) return null;

  const handleSaveCustom = () => {
    saveConsent(consent);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-200 w-full max-w-lg px-4"
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10, 10, 10, 0.92)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.06)",
            }}
          >
            <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/20 shrink-0">
                  <RiShieldCheckLine className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white tracking-[-0.01em]">
                    Privacy &amp; Cookies
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    We use local storage to keep you signed in and remember your preferences.
                  </p>
                </div>
              </div>
              <button
                onClick={() => rejectAll()}
                aria-label="Close and reject optional cookies"
                className="text-zinc-600 hover:text-zinc-400 transition-colors mt-0.5 shrink-0"
              >
                <RiCloseLine className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 space-y-3">
                    <div
                      className="rounded-xl p-px"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      {CATEGORIES.map((cat, i) => (
                        <div
                          key={cat.id}
                          className={[
                            "flex items-start justify-between gap-3 p-3.5",
                            i < CATEGORIES.length - 1
                              ? "border-b border-white/4"
                              : "",
                          ].join(" ")}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12px] font-medium text-white">
                                {cat.label}
                              </span>
                              {cat.required && (
                                <span className="text-[10px] text-secondary/70 font-medium tracking-wide">
                                  REQUIRED
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                              {cat.description}
                            </p>
                          </div>
                          <div className="shrink-0 mt-0.5">
                            <Toggle
                              checked={consent[cat.id]}
                              onChange={(v) => updateConsent(cat.id, v)}
                              disabled={cat.required}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed">
                      Read our{" "}
                      <Link href="/privacy-policy" className="text-secondary/70 hover:text-secondary underline underline-offset-2 transition-colors">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/cookie-policy" className="text-secondary/70 hover:text-secondary underline underline-offset-2 transition-colors">
                        Cookie Policy
                      </Link>{" "}
                      to learn more.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="px-5 pb-5 flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={acceptAll}
                  className="flex-1 h-9 bg-secondary hover:bg-secondary/90 text-white text-[12px] font-medium rounded-xl transition-all duration-200"
                  style={{ boxShadow: "0 2px 16px rgba(124,58,237,0.3)" }}
                >
                  Accept all
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={rejectAll}
                  className="flex-1 h-9 border-white/8 bg-white/3 hover:bg-white/6 text-zinc-400 hover:text-white text-[12px] font-medium rounded-xl transition-all duration-200"
                >
                  Reject all
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setExpanded((v) => !v)}
                  className="flex-1 h-8 text-zinc-500 hover:text-zinc-300 text-[11px] font-medium rounded-xl transition-all duration-200 gap-1.5"
                >
                  <RiSettings4Line className="h-3.5 w-3.5" />
                  {expanded ? "Hide options" : "Customize"}
                </Button>
                {expanded && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSaveCustom}
                    className="flex-1 h-8 text-secondary/70 hover:text-secondary text-[11px] font-medium rounded-xl transition-all duration-200"
                  >
                    Save preferences
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
