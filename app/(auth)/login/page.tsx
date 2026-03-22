"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RiGoogleFill, RiLoader4Line, RiArrowRightLine } from "react-icons/ri";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, loginWithGoogle, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black p-4 relative overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-sm relative z-10 animate-in fade-in slide-in-from-bottom-3 duration-700">

                <div className="flex flex-col items-center mb-10 gap-1.5">
                    <h1 className="text-[2.75rem] font-bold tracking-[-0.04em] text-white leading-none">
                        Chat<span className="text-secondary">Noir</span>
                    </h1>
                    <p className="text-[13px] text-zinc-500 tracking-wide">
                        Sign in to your account
                    </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-2xl shadow-2xl shadow-black/60 p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-medium text-zinc-400 tracking-wide">
                                Username
                            </label>
                            <Input
                                type="text"
                                placeholder="your username"
                                className="bg-white/5 border-white/10 h-11 text-[14px] text-white placeholder:text-zinc-600 focus:border-secondary/60 focus:bg-white/8 rounded-xl transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isLoading}
                                autoComplete="username"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[12px] font-medium text-zinc-400 tracking-wide">
                                Password
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="bg-white/5 border-white/10 h-11 text-[14px] text-white placeholder:text-zinc-600 focus:border-secondary/60 focus:bg-white/8 rounded-xl transition-all"
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
                                className="w-full bg-secondary hover:bg-secondary/90 text-white h-11 text-[14px] font-medium rounded-xl shadow-lg shadow-secondary/20 group transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <RiLoader4Line className="h-4 w-4 animate-spin" />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Sign in
                                        <RiArrowRightLine className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/8" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-transparent px-3 text-[11px] text-zinc-600">or</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        className="w-full h-11 border-white/10 bg-white/4 hover:bg-white/8 text-zinc-300 hover:text-white text-[14px] font-medium rounded-xl transition-all"
                        onClick={loginWithGoogle}
                        disabled={isLoading}
                    >
                        <RiGoogleFill className="h-4 w-4 text-secondary" />
                        Continue with Google
                    </Button>
                </div>

                <p className="text-center mt-6 text-[13px] text-zinc-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-secondary hover:text-secondary/80 transition-colors font-medium">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
