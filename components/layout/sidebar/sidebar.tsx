"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarTitleBar } from "./sidebar-title-bar";
import { SidebarIdentity } from "./sidebar-identity";
import { SidebarRoutes } from "./sidebar-routes";
import { MobileToggle } from "./mobile-toggle";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((v) => !v);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <MobileToggle onClick={toggleSidebar} isOpen={isOpen} />

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64",
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:translate-x-0",
          "glass-panel border-r border-white/[0.05]",
          "flex flex-col overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Top border accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

        <div className="flex flex-col h-full">
          <div className="px-4 py-4 border-b border-white/[0.04]">
            <SidebarTitleBar />
          </div>
          <div className="grow overflow-y-auto scrollbar-hide py-5 px-3">
            <SidebarIdentity />
            <SidebarRoutes onNavigate={closeSidebar} />
          </div>
        </div>
      </aside>
    </>
  );
}
