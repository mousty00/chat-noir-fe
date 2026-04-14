"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { RiLoader4Line, RiArrowRightLine, RiCheckboxCircleLine } from "react-icons/ri";

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

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(username, email, password);
    if (success) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
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
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <RiCheckboxCircleLine className="w-8 h-8 text-secondary" />
                </div>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-2xl font-bold text-white mb-3"
              >
                Check your email
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-zinc-500 text-[14px] leading-relaxed mb-8"
              >
                We&apos;ve sent a verification link to <span className="text-white font-medium">{email}</span>. Please click the link to activate your account.
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
                      Back to Sign in
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] p-4 relative overflow-hidden">
      {/* Three.js background */}
      <ParticleSphere
        className="absolute inset-0 w-full h-full pointer-events-none"
        count={1200}
        opacity={0.3}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-secondary/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-secondary/4 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="w-full max-w-[360px] relative z-10"
      >
        {/* Logo */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col items-center mb-9 gap-2.5"
        >
          <h1 className="text-[2.6rem] font-bold tracking-[-0.05em] text-white leading-none">
            Chat
            <span
              className="font-display italic text-secondary"
              style={{ fontStyle: "italic" }}
            >
              Noir
            </span>
          </h1>
          <p className="text-[12px] text-zinc-500 tracking-[0.04em]">
            Create your account
          </p>
        </motion.div>

        {/* Form panel */}
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-zinc-500 tracking-[0.06em] uppercase">
                  Username
                </label>
                <Input
                  placeholder="choose a username"
                  className="bg-white/4 border-white/8 h-11 text-[14px] text-white placeholder:text-zinc-700 focus:border-secondary/40 focus:bg-white/6 rounded-xl transition-all duration-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-zinc-500 tracking-[0.06em] uppercase">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="bg-white/4 border-white/8 h-11 text-[14px] text-white placeholder:text-zinc-700 focus:border-secondary/40 focus:bg-white/6 rounded-xl transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-zinc-500 tracking-[0.06em] uppercase">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="at least 6 characters"
                  className="bg-white/4 border-white/8 h-11 text-[14px] text-white placeholder:text-zinc-700 focus:border-secondary/40 focus:bg-white/6 rounded-xl transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
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
                      Create account
                      <RiArrowRightLine className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mt-5 text-[12px] text-zinc-600"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-secondary hover:text-secondary/80 transition-colors font-medium"
          >
            Sign in
          </Link>
        </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mt-3 text-[11px] text-zinc-700"
        >
          By creating an account you agree to our{" "}
          <Link href="/privacy-policy" className="text-zinc-500 hover:text-zinc-400 transition-colors underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookie-policy" className="text-zinc-500 hover:text-zinc-400 transition-colors underline underline-offset-2">
            Cookie Policy
          </Link>
          .
        </motion.p>
      </motion.div>
    </div>
  );
}
