"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiGalleryLine, RiBookOpenLine, RiSettings4Line, RiHeartLine, RiSendPlaneLine, RiLockLine } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/hooks/useAuthStore";
import { toast } from "sonner";

const routes = [
    { label: "Cats",        icon: RiGalleryLine,   href: "/",            requiresAuth: false },
    { label: "Favorites",   icon: RiHeartLine,     href: "/favorites",   requiresAuth: true  },
    { label: "Submissions", icon: RiSendPlaneLine, href: "/submissions", requiresAuth: true  },
    { label: "Docs",        icon: RiBookOpenLine,  href: "/docs",        requiresAuth: false },
    { label: "Settings",    icon: RiSettings4Line, href: "/settings",    requiresAuth: false },
];

interface SidebarRoutesProps {
    onNavigate?: () => void;
}

export function SidebarRoutes({ onNavigate }: SidebarRoutesProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    return (
        <nav className="flex flex-col gap-0.5 grow lg:flex-row lg:items-center lg:gap-1 lg:grow-0">
            {routes.map((route) => {
                const isActive = pathname === route.href;
                const isLocked = route.requiresAuth && !isAuthenticated;

                if (isLocked) {
                    return (
                        <button
                            key={route.href}
                            onClick={() => {
                                toast.info("Sign in to access this feature");
                                router.push("/login");
                                onNavigate?.();
                            }}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 w-full text-left",
                                "lg:w-auto lg:py-1.5 lg:px-4 lg:rounded-full lg:gap-2",
                                "text-muted-foreground/50 hover:bg-muted hover:text-muted-foreground"
                            )}
                        >
                            <route.icon className="w-4 h-4 shrink-0 lg:w-3.5 lg:h-3.5" />
                            <span className="flex-1 lg:flex-none">{route.label}</span>
                            <RiLockLine className="w-3 h-3 shrink-0 opacity-50 lg:w-2.5 lg:h-2.5" />
                        </button>
                    );
                }

                return (
                    <Link
                        key={route.href}
                        href={route.href}
                        onClick={onNavigate}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150",
                            "lg:w-auto lg:py-1.5 lg:px-4 lg:rounded-full lg:gap-2",
                            isActive
                                ? "bg-secondary/10 text-secondary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <route.icon className="w-4 h-4 shrink-0 lg:w-3.5 lg:h-3.5" />
                        <span>{route.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
