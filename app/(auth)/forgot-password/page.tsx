"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { RiArrowLeftLine, RiArrowRightLine, RiLoader4Line, RiMailSendLine } from "react-icons/ri";

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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await forgotPassword(email);
    if (ok) setSubmitted(true);
  };

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
        className="w-full max-w-[360px] relative z-10"
      >
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col items-center mb-9 gap-1.5">
          <h1 className="text-[2.6rem] font-bold tracking-[-0.05em] text-white leading-none">
            Chat<span className="font-display italic text-secondary">Noir</span>
          </h1>
          <p className="text-[12px] text-zinc-500 tracking-[0.04em]">Reset your password</p>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="rounded-2xl overflow-hidden card-depth"
          style={{
            background: "rgba(12, 12, 12, 0.85)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="p-7">
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center">
                  <RiMailSendLine className="h-7 w-7 text-secondary" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Check your inbox</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    If an account with <span className="text-zinc-300">{email}</span> exists,
                    we sent a password reset link. Check your spam folder too.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="text-[12px] text-secondary hover:text-secondary/80 transition-colors font-medium flex items-center gap-1.5 mt-2"
                >
                  <RiArrowLeftLine className="h-3.5 w-3.5" />
                  Back to sign in
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-zinc-500 text-[12px] leading-relaxed mb-2">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-zinc-500 tracking-[0.06em] uppercase">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-white/[0.04] border-white/[0.08] h-11 text-[14px] text-white placeholder:text-zinc-700 focus:border-secondary/40 focus:bg-white/[0.06] rounded-xl transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>
                <div className="pt-1">
                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-white h-11 text-[14px] font-medium rounded-xl transition-all duration-200 group"
                    style={{ boxShadow: "0 4px 24px rgba(167,139,250,0.25)" }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RiLoader4Line className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send reset link
                        <RiArrowRightLine className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {!submitted && (
          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-5 text-[12px] text-zinc-600">
            Remembered it?{" "}
            <Link href="/login" className="text-secondary hover:text-secondary/80 transition-colors font-medium">
              Sign in
            </Link>
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
