"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsHydrated(true);
    }, []);

    const PUBLIC_PATHS = useMemo(() => ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email", "/", "/cats", "/categories", "/docs", "/settings", "/oauth2/callback"], []);
    const AUTH_ONLY_PATHS = useMemo(() => ["/login", "/register", "/forgot-password"], []);

    useEffect(() => {
        if (!isHydrated) return;

        const isPublicPath = PUBLIC_PATHS.includes(pathname);
        const isAuthOnlyPath = AUTH_ONLY_PATHS.includes(pathname);

        if (!isAuthenticated && !isPublicPath) {
            router.push("/login");
        } else if (isAuthenticated && isAuthOnlyPath) {
            router.push("/");
        }
    }, [isAuthenticated, isHydrated, pathname, router, PUBLIC_PATHS, AUTH_ONLY_PATHS]);

    if (!isHydrated) return null;

    const isPublicPath = PUBLIC_PATHS.includes(pathname);
    const isAuthOnlyPath = AUTH_ONLY_PATHS.includes(pathname);

    if (!isAuthenticated && !isPublicPath) return null;
    if (isAuthenticated && isAuthOnlyPath) return null;

    return <>{children}</>;
}
