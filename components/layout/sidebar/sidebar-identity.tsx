import { useAuthStore } from "@/hooks/useAuthStore";
import { useAuth } from "@/hooks/useAuth";
import { RiLogoutCircleLine } from "react-icons/ri";

export function SidebarIdentity() {
    const { user } = useAuthStore();
    const { logout } = useAuth();

    if (!user) return null;

    const initials = user.username
        ? user.username.substring(0, 2).toUpperCase()
        : user.email.substring(0, 2).toUpperCase();

    return (
        <div className="flex flex-col items-start gap-3 mb-8 px-2">
            <div className="group relative flex items-center gap-3 w-full">
                <div className="w-10 h-10 bg-secondary/20 border border-secondary/30 rounded-md flex items-center justify-center transition-all duration-300 group-hover:bg-secondary group-hover:text-white text-secondary overflow-hidden">
                    {user.image ? (
                        <img src={user.image} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-sm font-black">{initials}</span>
                    )}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-bold text-foreground uppercase tracking-widest truncate">
                        {user.username}
                    </span>
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest truncate">
                        {user.email}
                    </span>
                </div>
                <button
                    onClick={logout}
                    className="p-2 text-muted-foreground hover:text-white transition-colors"
                    title="Logout Session"
                >
                    <RiLogoutCircleLine className="h-4 w-4" />
                </button>
            </div>
            <div className="h-px w-full bg-border/50 mt-2" />
        </div>
    );
}
