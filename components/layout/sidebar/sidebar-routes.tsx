"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiGalleryLine,
  RiBookOpenLine,
  RiSettings4Line,
  RiHeartLine,
  RiSendPlaneLine,
  RiHomeLine,
  RiListCheck3,
  RiUserHeartLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { useRef, useEffect } from "react";
import { animate } from "animejs";

const routes = [
  { label: "Home", icon: RiHomeLine, href: "/", requiresAuth: false },
  { label: "Cats", icon: RiGalleryLine, href: "/cats", requiresAuth: false },
  { label: "Categories", icon: RiListCheck3, href: "/categories", requiresAuth: false },
  { label: "Favorites", icon: RiHeartLine, href: "/favorites", requiresAuth: true },
  { label: "Friends", icon: RiUserHeartLine, href: "/friends", requiresAuth: true },
  { label: "Submissions", icon: RiSendPlaneLine, href: "/submissions", requiresAuth: true },
  { label: "Docs", icon: RiBookOpenLine, href: "/docs", requiresAuth: false },
  { label: "Settings", icon: RiSettings4Line, href: "/settings", requiresAuth: false },
];

interface SidebarRoutesProps {
  onNavigate?: () => void;
}

function NavItem({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    if (!ref.current || isActive) return;
    animate(ref.current, {
      scale: [1, 1.04],
      duration: 200,
      ease: "outQuad",
    });
  };

  const onLeave = () => {
    if (!ref.current || isActive) return;
    animate(ref.current, {
      scale: [1.04, 1],
      duration: 300,
      ease: "outElastic(1, .6)",
    });
  };

  return (
    <div ref={ref} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

export function SidebarRoutes({ onNavigate }: SidebarRoutesProps) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const unseenCount = useNotificationStore((s) => s.unseenCount);
  const navRef = useRef<HTMLElement>(null);

  // Entrance stagger
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".nav-item");
    animate(items, {
      opacity: [0, 1],
      translateY: [-6, 0],
      delay: (_, i) => i * 50 + 80,
      duration: 400,
      ease: "outExpo",
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="flex flex-col gap-0.5 grow lg:flex-row lg:items-center lg:gap-1 lg:grow-0"
    >
      {routes.map((route) => {
        const isActive = pathname === route.href;
        const isLocked = route.requiresAuth && !isAuthenticated;

        if (!isLocked) {
          return (
            <NavItem key={route.href} isActive={isActive}>
              <Link
                href={route.href}
                onClick={onNavigate}
                className={cn(
                  "nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150",
                  "lg:w-auto lg:py-1.5 lg:px-4 lg:rounded-full lg:gap-2",
                  "opacity-0",
                  isActive
                    ? "bg-secondary/10 text-secondary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <route.icon className="w-4 h-4 shrink-0 lg:w-3.5 lg:h-3.5" />
                <span>{route.label}</span>
                {route.href === "/submissions" && unseenCount > 0 && (
                  <span className="ml-auto lg:ml-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-primary-foreground text-[10px] font-bold leading-none">
                    {unseenCount > 9 ? "9+" : unseenCount}
                  </span>
                )}
              </Link>
            </NavItem>
          );
        }
      })}
    </nav>
  );
}
