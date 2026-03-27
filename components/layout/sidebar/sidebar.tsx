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

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "glass-panel",
          // Mobile styles
          "h-screen w-64 flex flex-col overflow-hidden border-r border-white/5",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop styles
          "lg:translate-x-0 lg:h-14 lg:w-full lg:flex-row lg:items-center lg:border-r-0 lg:border-b lg:px-8 lg:gap-8"
        )}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-secondary/20 to-transparent lg:hidden" />

        <div className="flex flex-col gap-4 h-full lg:flex-row lg:items-center lg:w-full lg:justify-between lg:max-w-[1400px] lg:mx-auto">
          <div className="px-4 py-4 border-b border-white/4 lg:border-b-0 lg:px-0 lg:py-0 shrink-0">
            <SidebarTitleBar />
          </div>

          <div className="grow overflow-y-auto scrollbar-hide py-5 px-3 lg:overflow-visible lg:py-0 lg:px-0 lg:flex lg:items-center lg:gap-8 lg:grow">
            <SidebarRoutes onNavigate={closeSidebar} />
            <div className="lg:ml-auto">
              <SidebarIdentity />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
