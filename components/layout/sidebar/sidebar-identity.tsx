import { useAuthStore } from "@/hooks/useAuthStore";
import { useAuth } from "@/hooks/useAuth";
import { RiLoginBoxLine, RiLogoutCircleLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SidebarIdentity() {
    const { user } = useAuthStore();
    const { logout } = useAuth();

    if (!user) return (
        <div className="mb-6 px-1 lg:mb-0 lg:px-0">
            <Link href="/login">
                <Button className="w-full lg:w-auto lg:h-8 lg:px-4 lg:text-[12px]">
                    <RiLoginBoxLine className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
                    Sign in
                </Button>
            </Link>
            <div className="h-px w-full bg-border/50 mt-5 lg:hidden" />
        </div>
    );

    const initials = user.username
        ? user.username.substring(0, 2).toUpperCase()
        : user.email.substring(0, 2).toUpperCase();

    return (
        <div className="mb-6 px-1 lg:mb-0 lg:px-0">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-secondary/15 border border-secondary/25 rounded-xl flex items-center justify-center text-secondary overflow-hidden shrink-0 lg:w-8 lg:h-8 lg:rounded-lg">
                    {user.image ? (
                        <img src={user.image} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-[12px] font-bold lg:text-[10px]">{initials}</span>
                    )}
                </div>
                <div className="flex flex-col flex-1 min-w-0 lg:hidden xl:flex">
                    <span className="text-[13px] font-semibold text-foreground truncate">
                        {user.username}
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate lg:hidden">
                        {user.email}
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={logout}
                    title="Sign out"
                    className="text-muted-foreground hover:text-foreground lg:w-8 lg:h-8"
                >
                    <RiLogoutCircleLine className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
                </Button>
            </div>
            <div className="h-px w-full bg-border/50 mt-5 lg:hidden" />
        </div>
    );
}
