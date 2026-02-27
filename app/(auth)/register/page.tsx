"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { RiMailLine, RiLockPasswordLine, RiUserLine, RiLoader4Line, RiShieldUserLine } from "react-icons/ri";

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
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="w-full max-w-md relative z-10 transition-all duration-500 animate-in fade-in zoom-in slide-in-from-top-4">
                <div className="flex flex-col items-center mb-8 gap-2">
                    <h1 className="text-4xl font-sans font-bold tracking-tighter text-white uppercase leading-none">
                        CHAT<span className="text-secondary">NOIR</span>
                    </h1>
                </div>

                <Card className="bg-black/40 backdrop-blur-xl border-border/50 shadow-2xl shadow-secondary/5">
                    <CardHeader className="space-y-1 text-center pt-8">
                        <CardTitle className="text-xl font-mono uppercase tracking-widest text-white">Sign in</CardTitle>
                        <CardDescription className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                            Enter your credentials
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 pb-0">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <div className="relative group">
                                    <RiUserLine className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                                    <Input
                                        placeholder="username"
                                        className="bg-black/50 border-border pl-10 h-11 transition-all focus:border-secondary font-mono text-xs uppercase"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative group">
                                    <RiMailLine className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="email"
                                        className="bg-black/50 border-border pl-10 h-11 transition-all focus:border-secondary font-mono text-xs uppercase"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative group">
                                    <RiLockPasswordLine className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="password"
                                        className="bg-black/50 border-border pl-10 h-11 transition-all focus:border-secondary font-mono text-xs uppercase"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-secondary text-white hover:bg-secondary/90 h-11 font-mono uppercase tracking-[0.2em] shadow-lg shadow-secondary/10 group"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <RiLoader4Line className="h-5 w-5 animate-spin" />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Sign in
                                        <RiShieldUserLine className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pb-8 pt-6">
                        <p className="text-[10px] text-center text-muted-foreground font-mono uppercase tracking-widest">
                            You already have an account? {" "}
                            <Link href="/login" className="text-secondary hover:underline transition-all font-bold">
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
