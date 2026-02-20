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
        <nav className="flex flex-col gap-2 grow">
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    onClick={onNavigate}
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 font-bold transition-all text-sm uppercase tracking-tighter",
                        pathname === route.href
                            ? "retro-bevel-inset bg-white text-black translate-x-1"
                            : "retro-button hover:bg-[#d0d0d0] text-black"
                    )}
                >
                    <route.icon className={cn("w-5 h-5", pathname === route.href ? "text-violet-600" : "text-black")} />
                    <span>{route.label}</span>
                </Link>
            ))}
        </nav>
    );
}
