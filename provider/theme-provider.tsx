"use client";

import { useThemeStore } from "@/hooks/useThemeStore";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useThemeStore((state) => state.theme);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        root.setAttribute("data-theme", theme);

        root.style.colorScheme = theme;
    }, [theme, isHydrated]);

    if (!isHydrated) return <>{children}</>;

    return <>{children}</>;
}
