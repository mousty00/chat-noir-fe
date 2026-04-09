"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { useFavoritesSync } from "@/hooks/favorites/useFavoritesSync";

function MainLayoutInner({ children }: { children: React.ReactNode }) {
    useFavoritesSync();

    return (
        <div className="main-layout">
            <CursorGlow />
            <Sidebar />
            <main className="main-container">
                {children}
            </main>
        </div>
    );
}

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayoutInner>{children}</MainLayoutInner>;
}
