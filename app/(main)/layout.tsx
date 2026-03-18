"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { useFavoritesSync } from "@/hooks/favorites/useFavoritesSync";

function MainLayoutInner({ children }: { children: React.ReactNode }) {
    useFavoritesSync();

    return (
        <div className="main-layout ">
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
