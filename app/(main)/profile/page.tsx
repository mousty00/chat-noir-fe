"use client";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useAuth } from "@/hooks/useAuth";
import { useUploadProfileImage } from "@/hooks/user/useUploadProfileImage";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
    RiMailLine,
    RiCalendarLine,
    RiShieldUserLine,
    RiLockPasswordLine,
    RiEyeLine,
    RiEyeOffLine,
    RiCheckLine,
    RiUserLine,
    RiCameraLine,
    RiLoader4Line,
} from "react-icons/ri";

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-4 py-4 border-b border-border/50 last:border-0">
            <div className="h-9 w-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="text-sm font-medium truncate">{value}</p>
            </div>
        </div>
    );
}

function PasswordField({
    label,
    value,
    onChange,
    placeholder,
    disabled,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    disabled?: boolean;
}) {
    const [show, setShow] = useState(false);
    return (
        <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
            <div className="relative">
                <Input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder ?? "••••••••"}
                    disabled={disabled}
                    className="pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                >
                    {show ? <RiEyeOffLine className="h-4 w-4" /> : <RiEyeLine className="h-4 w-4" />}
                </button>
            </div>
        </div>
    );
}

function AvatarUpload() {
    const { user } = useAuthStore();
    const { upload, uploading } = useUploadProfileImage();
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const initials = user?.username.slice(0, 2).toUpperCase() ?? "??";
    const src = preview ?? user?.image ?? null;

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        const ok = await upload(file);
        setPreview(null);
        URL.revokeObjectURL(objectUrl);
        e.target.value = "";
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <button
                type="button"
                onClick={() => !uploading && fileRef.current?.click()}
                className="relative group focus:outline-none"
                title="Change profile picture"
                disabled={uploading}
            >
                <div className="h-24 w-24 rounded-full bg-linear-to-tr from-secondary to-secondary/40 p-1 shadow-xl shadow-secondary/20">
                    {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={src}
                            alt={user?.username}
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-2xl font-black text-foreground">
                            {initials}
                        </div>
                    )}
                </div>

                {/* Hover overlay */}
                <div className={cn(
                    "absolute inset-0 rounded-full flex items-center justify-center transition-opacity duration-200",
                    "bg-black/50",
                    uploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                    {uploading
                        ? <RiLoader4Line className="h-5 w-5 text-white animate-spin" />
                        : <RiCameraLine className="h-5 w-5 text-white" />
                    }
                </div>
            </button>

            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                {uploading ? "Uploading..." : "Click to change"}
            </p>

            <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleFile}
            />
        </div>
    );
}

export default function ProfilePage() {
    const { user } = useAuthStore();
    const { changePassword, isLoading } = useAuth();
    const [mounted, setMounted] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted || !user) return null;

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPwError("");
        setPwSuccess(false);

        if (newPassword !== confirmPassword) {
            setPwError("New passwords do not match.");
            return;
        }
        if (newPassword.length < 6) {
            setPwError("New password must be at least 6 characters.");
            return;
        }

        const ok = await changePassword(currentPassword, newPassword);
        if (ok) {
            setPwSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-2xl text-center font-semibold tracking-tight">Profile</h1>
                <p className="text-[13px] text-center text-muted-foreground mt-1">Your account details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20 flex flex-col items-center text-center gap-4">
                        <AvatarUpload />
                        <div className="space-y-1">
                            <p className="text-lg font-bold tracking-tight">{user.username}</p>
                            <p className="text-xs text-muted-foreground font-mono">{user.email}</p>
                        </div>
                        <div className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                            user.isAdmin
                                ? "bg-secondary/20 text-secondary"
                                : "bg-muted text-muted-foreground"
                        )}>
                            {user.isAdmin ? "Admin" : "User"}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border bg-muted/50">
                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
                            Role: {user.isAdmin ? "ADMIN" : "USER"}<br />
                            Status: Member<br />
                            Roles: {user.roles.join(", ")}
                        </p>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-8">
                    <section className="space-y-2">
                        <div className="flex items-center gap-2 mb-4">
                            <RiShieldUserLine className="text-secondary h-5 w-5" />
                            <h2 className="text-sm font-bold uppercase tracking-widest">Account Info</h2>
                        </div>
                        <div className="rounded-2xl border border-border bg-muted/30 px-6">
                            <InfoRow
                                icon={<RiUserLine className="h-4 w-4" />}
                                label="Username"
                                value={user.username}
                            />
                            <InfoRow
                                icon={<RiMailLine className="h-4 w-4" />}
                                label="Email"
                                value={user.email}
                            />
                            <InfoRow
                                icon={<RiShieldUserLine className="h-4 w-4" />}
                                label="Role"
                                value={user.isAdmin ? "Administrator" : "Standard User"}
                            />
                            <InfoRow
                                icon={<RiCalendarLine className="h-4 w-4" />}
                                label="Plan"
                                value={user.roles.includes("PREMIUM") ? "Premium" : "Free"}
                            />
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-2">
                            <RiLockPasswordLine className="text-secondary h-5 w-5" />
                            <h2 className="text-sm font-bold uppercase tracking-widest">Change Password</h2>
                        </div>

                        <div className="p-6 rounded-2xl border border-border bg-muted/30">
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <PasswordField
                                    label="Current Password"
                                    value={currentPassword}
                                    onChange={setCurrentPassword}
                                    disabled={isLoading}
                                />
                                <PasswordField
                                    label="New Password"
                                    value={newPassword}
                                    onChange={setNewPassword}
                                    placeholder="min. 6 characters"
                                    disabled={isLoading}
                                />
                                <PasswordField
                                    label="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={setConfirmPassword}
                                    disabled={isLoading}
                                />

                                {pwError && (
                                    <p className="text-xs text-destructive font-mono">{pwError}</p>
                                )}
                                {pwSuccess && (
                                    <p className="text-xs text-green-500 font-mono flex items-center gap-1.5">
                                        <RiCheckLine className="h-3.5 w-3.5" />
                                        Password updated successfully.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
                                    className={cn(
                                        "w-full px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200",
                                        !isLoading && currentPassword && newPassword && confirmPassword
                                            ? "bg-secondary text-white hover:bg-secondary/90"
                                            : "bg-muted text-muted-foreground cursor-not-allowed"
                                    )}
                                >
                                    {isLoading ? "Saving..." : "Update Password"}
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
