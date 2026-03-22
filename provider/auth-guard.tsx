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

    const PUBLIC_PATHS = useMemo(() => ["/login", "/register", "/", "/categories", "/docs", "/settings", "/oauth2/callback"], []);

    useEffect(() => {
        if (!isHydrated) return;

        const isPublicPath = PUBLIC_PATHS.includes(pathname);

        if (!isAuthenticated && !isPublicPath) {
            router.back();
        }
    }, [isAuthenticated, isHydrated, pathname, router, PUBLIC_PATHS]);

    if (!isHydrated) return null;

    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    if (!isAuthenticated && !isPublicPath) {
        return null;
    }

    return <>{children}</>;
}
