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

    useEffect(() => {
        if (!isHydrated) return;

        const publicPaths = ["/login", "/register", "/", "/categories", "/docs", "/settings"];
        const isPublicPath = publicPaths.includes(pathname);

        if (!isAuthenticated && !isPublicPath) {
            router.push("/login");
        }
    }, [isAuthenticated, isHydrated, pathname, router]);

    if (!isHydrated) return null;

    const publicPaths = ["/login", "/register", "/", "/categories", "/docs", "/settings"];
    const isPublicPath = publicPaths.includes(pathname);

    if (!isAuthenticated && !isPublicPath) {
        return null;
    }

    return <>{children}</>;
}
