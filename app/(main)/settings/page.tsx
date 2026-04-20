"use client";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useThemeStore } from "@/hooks/useThemeStore";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { RiMoonLine, RiPaletteLine, RiShieldUserLine, RiSunLine, RiDeleteBin6Line, RiAlertLine } from "react-icons/ri";
import { APP_VERSION, APP_BUILD_SHA } from "@/constants/app";

export default function SettingsPage() {
    const { theme, setTheme } = useThemeStore();
    const [mounted, setMounted] = useState(false);
    const { user } = useAuthStore();
    const { deleteAccount, isLoading } = useAuth();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [confirmInput, setConfirmInput] = useState("");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-2xl text-center font-semibold tracking-tight">Settings</h1>
                <p className="text-[13px] text-center text-muted-foreground mt-1">Configure your preferences.</p>
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
                </div>


                <div className="space-y-6">
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <RiShieldUserLine className="text-secondary h-5 w-5" />
                            <h2 className="text-sm font-bold uppercase tracking-widest">Role</h2>
                        </div>
                        <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20 flex flex-col items-center text-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-secondary to-secondary/40 p-1 shadow-xl shadow-secondary/20">
                                <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-2xl font-black text-foreground">
                                    {user?.isAdmin ? "AD" : "US"}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold uppercase tracking-tighter text-foreground">{user?.isAdmin ? "Admin" : "User"}</p>
                            </div>
                        </div>
                    </section>

                    <div className="p-4 rounded-xl border border-border bg-muted/50">
                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
                            Version: v{APP_VERSION}<br />
                            Build: {APP_BUILD_SHA}<br />
                            Architecture: Next.js<br />
                            Protocol: GraphQL<br />
                            Theme: {theme.toUpperCase()}
                        </p>
                    </div>
                </div>
            </div>

            {user && (
                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <RiAlertLine className="text-destructive h-5 w-5" />
                        <h2 className="text-sm font-bold uppercase tracking-widest text-destructive">Danger Zone</h2>
                    </div>

                    <div className="p-6 rounded-2xl border border-destructive/30 bg-destructive/5 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="font-bold text-sm uppercase tracking-widest">Delete Account</p>
                                <p className="text-xs text-muted-foreground font-mono mt-1">
                                    Permanently delete your account and all associated data. This action cannot be undone.
                                </p>
                            </div>
                            {!showDeleteConfirm && (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-destructive/50 text-destructive text-sm font-bold uppercase tracking-widest hover:bg-destructive hover:text-white transition-all duration-200 shrink-0"
                                >
                                    <RiDeleteBin6Line className="h-4 w-4" />
                                    Delete
                                </button>
                            )}
                        </div>

                        {showDeleteConfirm && (
                            <div className="space-y-4 pt-2 border-t border-destructive/20 animate-in fade-in slide-in-from-top-2 duration-300">
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                                    Type <span className="text-foreground font-bold">{user.username}</span> to confirm deletion
                                </p>
                                <input
                                    type="text"
                                    value={confirmInput}
                                    onChange={(e) => setConfirmInput(e.target.value)}
                                    placeholder={user.username}
                                    className="w-full px-4 py-2 rounded-xl bg-background border border-destructive/30 focus:border-destructive focus:outline-none text-sm font-mono transition-colors"
                                />
                                <div className="flex gap-3">
                                    <button
                                        onClick={async () => {
                                            const ok = await deleteAccount();
                                            if (!ok) setConfirmInput("");
                                        }}
                                        disabled={confirmInput !== user.username || isLoading}
                                        className={cn(
                                            "flex-1 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200",
                                            confirmInput === user.username && !isLoading
                                                ? "bg-destructive text-white hover:bg-destructive/90"
                                                : "bg-muted text-muted-foreground cursor-not-allowed"
                                        )}
                                    >
                                        {isLoading ? "Deleting..." : "Confirm Delete"}
                                    </button>
                                    <button
                                        onClick={() => { setShowDeleteConfirm(false); setConfirmInput(""); }}
                                        className="px-4 py-2 rounded-xl border border-border text-sm font-bold uppercase tracking-widest hover:bg-muted transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}
