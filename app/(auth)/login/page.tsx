"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { RiGoogleFill, RiUserLine, RiLockPasswordLine, RiLoader4Line, RiArrowRightLine } from "react-icons/ri";

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
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="w-full max-w-md relative z-10 transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-4">
                <div className="flex flex-col items-center mb-8 gap-2">
                    <h1 className="text-4xl font-sans font-bold tracking-tighter text-white uppercase leading-none">
                        CHAT<span className="text-secondary">NOIR</span>
                    </h1>
                </div>

                <Card className="bg-black/40 backdrop-blur-xl border-border/50 shadow-2xl shadow-secondary/5">
                    <CardHeader className="space-y-1 text-center">
                        <CardDescription className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                            Provide your credentials
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 pb-0">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <div className="relative group">
                                    <RiUserLine className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                                    <Input
                                        type="text"
                                        placeholder="username"
                                        className="bg-black/50 border-border pl-10 h-11 transition-all focus:border-secondary font-mono text-xs"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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
                                        className="bg-black/50 border-border pl-10 h-11 transition-all focus:border-secondary font-mono text-xs"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-secondary text-white hover:bg-secondary/90 h-11 font-mono uppercase tracking-[0.2em] shadow-lg shadow-secondary/10 group overflow-hidden relative"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <RiLoader4Line className="h-5 w-5 animate-spin" />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Login
                                        <RiArrowRightLine className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
                                <span className="bg-[#0c0c0e] px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            type="button"
                            className="w-full border-border hover:bg-white/5 h-11 font-mono uppercase tracking-[0.2em] text-xs transition-colors"
                            onClick={loginWithGoogle}
                            disabled={isLoading}
                        >
                            <RiGoogleFill className="mr-2 h-4 w-4 text-secondary" />
                            Login with Google
                        </Button>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pb-8 pt-6">
                        <p className="text-[10px] text-center text-muted-foreground font-mono uppercase tracking-widest">
                            No authorization? {" "}
                            <Link href="/register" className="text-secondary hover:underline transition-all">
                                Create new account
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
