"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarTitleBar } from "./sidebar-title-bar";
import { SidebarIdentity } from "./sidebar-identity";
import { SidebarRoutes } from "./sidebar-routes";
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
                    className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    onClick={closeSidebar}
                />
            )}

            <aside
                className={cn(
                    "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 transition-transform duration-300 lg:translate-x-0 bg-black border-r border-border flex flex-col gap-0 overflow-hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full bg-black">
                    <div className="p-4 border-b border-border">
                        <SidebarTitleBar />
                    </div>
                    <div className="grow overflow-y-auto py-6 px-4">
                        <SidebarIdentity />
                        <SidebarRoutes onNavigate={closeSidebar} />
                    </div>
                </div>
            </aside>
        </>
    );
}
