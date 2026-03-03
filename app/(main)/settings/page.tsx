"use client";

import { useThemeStore } from "@/hooks/useThemeStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RiMoonLine, RiSunLine, RiSettings4Line, RiShieldUserLine, RiNotification3Line, RiPaletteLine } from "react-icons/ri";
import { useState } from "react";

export default function SettingsPage() {
    const { theme, setTheme } = useThemeStore();
    const [mounted, setMounted] = useState(false);

    useState(() => {
        setMounted(true);
    });

    if (!mounted) return null;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-sans font-black uppercase tracking-tighter flex items-center gap-3">
                    <RiSettings4Line className="text-secondary animate-spin-slow" />
                    Settings
                </h1>
                <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">Configure your preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-2 space-y-6">
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <RiPaletteLine className="text-secondary h-5 w-5" />
                            <h2 className="text-sm font-bold uppercase tracking-widest">Theme</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => setTheme("dark")}
                                className={cn(
                                    "relative flex flex-col items-start p-6 rounded-2xl border transition-all duration-300 group overflow-hidden",
                                    theme === "dark"
                                        ? "bg-secondary/10 border-secondary shadow-lg shadow-secondary/10"
                                        : "bg-muted border-border hover:border-secondary/30"
                                )}
                            >
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <RiMoonLine className="h-24 w-24 rotate-12" />
                                </div>
                                <RiMoonLine className={cn("h-6 w-6 mb-4 transition-colors", theme === "dark" ? "text-secondary" : "text-muted-foreground")} />
                                <span className="font-bold uppercase tracking-widest text-sm mb-1">Dark Mode</span>
                                {theme === "dark" && (
                                    <div className="absolute top-4 right-4 h-2 w-2 bg-secondary rounded-full animate-pulse" />
                                )}
                            </button>

                            <button
                                onClick={() => setTheme("light")}
                                className={cn(
                                    "relative flex flex-col items-start p-6 rounded-2xl border transition-all duration-300 group overflow-hidden",
                                    theme === "light"
                                        ? "bg-secondary/10 border-secondary shadow-lg shadow-secondary/10"
                                        : "bg-muted border-border hover:border-secondary/30"
                                )}
                            >
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <RiSunLine className="h-24 w-24 -rotate-12" />
                                </div>
                                <RiSunLine className={cn("h-6 w-6 mb-4 transition-colors", theme === "light" ? "text-secondary" : "text-muted-foreground")} />
                                <span className="font-bold uppercase tracking-widest text-sm mb-1">Light Mode</span>
                                {theme === "light" && (
                                    <div className="absolute top-4 right-4 h-2 w-2 bg-secondary rounded-full animate-pulse" />
                                )}
                            </button>
                        </div>
                    </section>

                    <section className="space-y-4 pt-4">
                        <div className="flex items-center gap-2 mb-4">
                            <RiNotification3Line className="text-secondary h-5 w-5" />
                            <h2 className="text-sm font-bold uppercase tracking-widest">Interface Protocols</h2>
                        </div>
                        <Card className="bg-muted/50 border-border">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase tracking-widest text-foreground">Animations</p>
                                        <p className="text-[10px] font-mono text-muted-foreground uppercase">Enable smooth transitions.</p>
                                    </div>
                                    <div className="h-6 w-11 rounded-full bg-secondary p-1 flex items-center justify-end">
                                        <div className="h-4 w-4 rounded-full bg-primary-foreground shadow-sm" />
                                    </div>
                                </div>
                                <div className="h-px w-full bg-border" />
                                <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase tracking-widest text-foreground">Sound Feedback</p>
                                        <p className="text-[10px] font-mono text-muted-foreground uppercase">Audio simulation.</p>
                                    </div>
                                    <div className="h-6 w-11 rounded-full bg-muted p-1 flex items-center justify-start">
                                        <div className="h-4 w-4 rounded-full bg-foreground/20 shadow-sm" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>


                <div className="space-y-6">
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <RiShieldUserLine className="text-secondary h-5 w-5" />
                            <h2 className="text-sm font-bold uppercase tracking-widest">User Identity</h2>
                        </div>
                        <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20 flex flex-col items-center text-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-linear-to-tr from-secondary to-purple-400 p-1 shadow-xl shadow-secondary/20">
                                <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-2xl font-black text-foreground">
                                    AD
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold uppercase tracking-tighter text-foreground">Admin operative</p>
                                <p className="text-[10px] font-mono text-secondary uppercase tracking-widest">Clearance: Level 05</p>
                            </div>
                            <Button variant="outline" className="w-full h-10 text-[10px] uppercase font-mono tracking-widest border-border hover:bg-secondary hover:text-primary-foreground transition-all">
                                Update Credentials
                            </Button>
                        </div>
                    </section>

                    <div className="p-4 rounded-xl border border-border bg-muted/50">
                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
                            Architecture: Next.js 15.0<br />
                            Protocol: GraphQL Sync<br />
                            Theme: {theme.toUpperCase()} (STABLE)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
