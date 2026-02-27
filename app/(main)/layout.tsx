"use client";

import { Sidebar } from "@/components/layout/sidebar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="main-layout ">
            <Sidebar />
            <main className="main-container">
                {children}
            </main>
        </div>
    );
}
