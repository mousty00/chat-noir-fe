"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiGalleryLine, RiPriceTag3Line, RiBookOpenLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

const routes = [
    {
        label: "Cats",
        icon: RiGalleryLine,
        href: "/",
    },
    {
        label: "Categories",
        icon: RiPriceTag3Line,
        href: "/categories",
    },
    {
        label: "Docs",
        icon: RiBookOpenLine,
        href: "/docs",
    },
];

interface SidebarRoutesProps {
    onNavigate?: () => void;
}

export function SidebarRoutes({ onNavigate }: SidebarRoutesProps) {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-1 grow">
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    onClick={onNavigate}
                    className={cn(
                        "group flex items-center gap-3 px-3 py-2 transition-all duration-200 font-mono text-xs uppercase tracking-[0.1em]",
                        pathname === route.href
                            ? "text-secondary"
                            : "text-muted-foreground hover:text-white"
                    )}
                >
                    <div className={cn(
                        "w-1 h-4 transition-all duration-300",
                        pathname === route.href ? "bg-secondary" : "bg-transparent group-hover:bg-secondary/30"
                    )} />
                    <route.icon className={cn("w-4 h-4 transition-colors", pathname === route.href ? "text-secondary" : "text-muted-foreground group-hover:text-white")} />
                    <span>{route.label}</span>
                </Link>
            ))}
        </nav>
    );
}
