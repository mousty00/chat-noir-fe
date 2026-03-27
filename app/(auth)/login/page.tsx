"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { RiGoogleFill, RiLoader4Line, RiArrowRightLine } from "react-icons/ri";

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

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

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
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-secondary/4 rounded-full blur-[100px] pointer-events-none" />

      {/* Card */}
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
          className="flex flex-col items-center mb-9 gap-1.5"
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
            Sign in to your account
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
                  type="text"
                  placeholder="your username"
                  className="bg-white/[0.04] border-white/[0.08] h-11 text-[14px] text-white placeholder:text-zinc-700 focus:border-secondary/40 focus:bg-white/[0.06] rounded-xl transition-all duration-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-zinc-500 tracking-[0.06em] uppercase">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/[0.04] border-white/[0.08] h-11 text-[14px] text-white placeholder:text-zinc-700 focus:border-secondary/40 focus:bg-white/[0.06] rounded-xl transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
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
                      Sign in
                      <RiArrowRightLine className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                    </span>
                  )}
                </Button>
              </div>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-transparent px-3 text-[11px] text-zinc-600">
                  or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              className="w-full h-11 border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 hover:text-white text-[14px] font-medium rounded-xl transition-all duration-200"
              onClick={loginWithGoogle}
              disabled={isLoading}
            >
              <RiGoogleFill className="h-4 w-4 text-secondary" />
              Continue with Google
            </Button>
          </div>
        </motion.div>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mt-5 text-[12px] text-zinc-600"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-secondary hover:text-secondary/80 transition-colors font-medium"
          >
            Create one
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
