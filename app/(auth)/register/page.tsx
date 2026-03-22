"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RiLoader4Line, RiShieldUserLine } from "react-icons/ri";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(username, email, password);
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
                        Create your account
                    </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-2xl shadow-2xl shadow-black/60 p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-medium text-zinc-400 tracking-wide">
                                Username
                            </label>
                            <Input
                                placeholder="choose a username"
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
                                Email
                            </label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                className="bg-white/5 border-white/10 h-11 text-[14px] text-white placeholder:text-zinc-600 focus:border-secondary/60 focus:bg-white/8 rounded-xl transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                autoComplete="email"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[12px] font-medium text-zinc-400 tracking-wide">
                                Password
                            </label>
                            <Input
                                type="password"
                                placeholder="at least 6 characters"
                                className="bg-white/5 border-white/10 h-11 text-[14px] text-white placeholder:text-zinc-600 focus:border-secondary/60 focus:bg-white/8 rounded-xl transition-all"
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
                                className="w-full bg-secondary hover:bg-secondary/90 text-white h-11 text-[14px] font-medium rounded-xl shadow-lg shadow-secondary/20 group transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <RiLoader4Line className="h-4 w-4 animate-spin" />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Create account
                                        <RiShieldUserLine className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>

                <p className="text-center mt-6 text-[13px] text-zinc-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-secondary hover:text-secondary/80 transition-colors font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
