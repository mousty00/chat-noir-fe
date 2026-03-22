"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const PUBLIC_PATHS = ["/login", "/register", "/", "/categories", "/docs", "/settings", "/oauth2/callback"];

    useEffect(() => {
        if (!isHydrated) return;

        const isPublicPath = PUBLIC_PATHS.includes(pathname);

        if (!isAuthenticated && !isPublicPath) {
            router.back();
        }
    }, [isAuthenticated, isHydrated, pathname, router]);

    if (!isHydrated) return null;

    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    if (!isAuthenticated && !isPublicPath) {
        return null;
    }

    return <>{children}</>;
}
