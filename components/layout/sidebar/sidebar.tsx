"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarTitleBar } from "./sidebar-title-bar";
import { SidebarIdentity } from "./sidebar-identity";
import { SidebarRoutes } from "./sidebar-routes";
import { SidebarSystemInfo } from "./sidebar-system-info";
import { MobileToggle } from "./mobile-toggle";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            <MobileToggle onClick={toggleSidebar} isOpen={isOpen} />

            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]"
                    onClick={closeSidebar}
                />
            )}

            <aside
                className={cn(
                    "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 p-2 transition-transform duration-300 lg:translate-x-0 bg-[#c0c0c0] shadow-[2px_0px_10px_rgba(0,0,0,0.5)] flex flex-col gap-2 overflow-hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="retro-bevel p-2 h-full flex flex-col gap-4 bg-[#c0c0c0]">
                    <SidebarTitleBar />
                    <SidebarIdentity />
                    <SidebarRoutes onNavigate={closeSidebar} />
                    <SidebarSystemInfo />
                </div>
            </aside>
        </>
    );
}
