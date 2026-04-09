"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { RiArrowRightLine, RiEyeLine, RiEyeOffLine, RiLoader4Line } from "react-icons/ri";

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

function PasswordInput({ value, onChange, placeholder, disabled }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "••••••••"}
        disabled={disabled}
        className="bg-white/[0.04] border-white/[0.08] h-11 text-[14px] text-white placeholder:text-zinc-700 focus:border-secondary/40 focus:bg-white/[0.06] rounded-xl transition-all duration-200 pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
        tabIndex={-1}
      >
        {show ? <RiEyeOffLine className="h-4 w-4" /> : <RiEyeLine className="h-4 w-4" />}
      </button>
    </div>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { resetPassword, isLoading } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) setError("Invalid or missing reset token. Please request a new reset link.");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    await resetPassword(token, newPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-zinc-500 tracking-[0.06em] uppercase">
          New Password
        </label>
        <PasswordInput
          value={newPassword}
          onChange={setNewPassword}
          placeholder="min. 6 characters"
          disabled={isLoading || !token}
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-zinc-500 tracking-[0.06em] uppercase">
          Confirm Password
        </label>
        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          disabled={isLoading || !token}
        />
      </div>

      {error && (
        <p className="text-[12px] text-red-400 font-mono">{error}</p>
      )}

      <div className="pt-1">
        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary/90 text-white h-11 text-[14px] font-medium rounded-xl transition-all duration-200 group"
          style={{ boxShadow: "0 4px 24px rgba(167,139,250,0.25)" }}
          disabled={isLoading || !token}
        >
          {isLoading ? (
            <RiLoader4Line className="h-4 w-4 animate-spin" />
          ) : (
            <span className="flex items-center justify-center gap-2">
              Reset Password
              <RiArrowRightLine className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-150" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
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
          <p className="text-[12px] text-zinc-500 tracking-[0.04em]">Choose a new password</p>
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
            <Suspense fallback={<div className="h-32 flex items-center justify-center text-zinc-600 text-sm">Loading...</div>}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </motion.div>

        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-5 text-[12px] text-zinc-600">
          Back to{" "}
          <Link href="/login" className="text-secondary hover:text-secondary/80 transition-colors font-medium">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
