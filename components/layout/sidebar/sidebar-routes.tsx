"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiGalleryLine, RiBookOpenLine, RiSettings4Line, RiHeartLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

const routes = [
    { label: "Cats",      icon: RiGalleryLine,  href: "/" },
    { label: "Favorites", icon: RiHeartLine,    href: "/favorites" },
    { label: "Docs",      icon: RiBookOpenLine, href: "/docs" },
    { label: "Settings",  icon: RiSettings4Line, href: "/settings" },
];

interface SidebarRoutesProps {
    onNavigate?: () => void;
}

export function SidebarRoutes({ onNavigate }: SidebarRoutesProps) {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-0.5 grow">
            {routes.map((route) => {
                const isActive = pathname === route.href;
                return (
                    <Link
                        key={route.href}
                        href={route.href}
                        onClick={onNavigate}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150",
                            isActive
                                ? "bg-secondary/10 text-secondary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <route.icon className="w-4 h-4 shrink-0" />
                        <span>{route.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
