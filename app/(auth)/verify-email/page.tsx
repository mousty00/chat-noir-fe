"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { RiCheckboxCircleLine, RiErrorWarningLine, RiArrowRightLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

const ParticleSphere = dynamic(
  () =>
    import("@/components/three/particle-sphere").then((m) => ({
      default: m.ParticleSphere,
    })),
  { ssr: false }
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const message = searchParams.get("message") || (success ? "Email verified successfully" : "Failed to verify email");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] p-4 relative overflow-hidden">
      <ParticleSphere
        className="absolute inset-0 w-full h-full pointer-events-none"
        count={1200}
        opacity={0.3}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-secondary/6 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="w-full max-w-[400px] relative z-10"
      >
        <div
          className="rounded-2xl overflow-hidden card-depth"
          style={{
            background: "rgba(12, 12, 12, 0.85)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="p-8 text-center">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex justify-center mb-6"
            >
              {success ? (
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <RiCheckboxCircleLine className="w-8 h-8 text-secondary" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <RiErrorWarningLine className="w-8 h-8 text-red-500" />
                </div>
              )}
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-2xl font-bold text-white mb-3"
            >
              {success ? "Email Verified" : "Verification Failed"}
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-zinc-500 text-[14px] leading-relaxed mb-8"
            >
              {message}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Link href="/login" className="block w-full">
                <Button
                  className="w-full bg-secondary hover:bg-secondary/90 text-white h-11 text-[14px] font-medium rounded-xl transition-all duration-200 group"
                  style={{ boxShadow: "0 4px 24px rgba(167,139,250,0.25)" }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {success ? "Continue to Sign in" : "Back to Sign in"}
                    <RiArrowRightLine className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
