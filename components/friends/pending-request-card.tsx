"use client";

import { Friendship } from "@/types/friendship";
import { Button } from "@/components/ui/button";
import { useRespondFriendRequest } from "@/hooks/friendship/useRespondFriendRequest";
import Image from "next/image";
import { RiCheckLine, RiCloseLine, RiLoader4Line } from "react-icons/ri";

interface PendingRequestCardProps {
  friendship: Friendship;
}

export const PendingRequestCard = ({ friendship }: PendingRequestCardProps) => {
  const { respond, loading } = useRespondFriendRequest();
  const { friend } = friendship;

  const initials = friend.username.substring(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
      <div className="shrink-0">
        <div className="relative w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/25 overflow-hidden flex items-center justify-center text-secondary">
          {friend.image ? (
            <Image
              src={friend.image}
              alt={friend.username}
              fill
              unoptimized
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <span className="text-[12px] font-bold">{initials}</span>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-foreground truncate">
          {friend.username}
        </p>
        <p className="text-[10px] text-muted-foreground/60 font-mono uppercase tracking-wider">
          Wants to be friends
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <Button
          variant="outline"
          size="icon-xs"
          className="rounded-xl border-green-500/30 text-green-400 hover:bg-green-500/10"
          title="Accept"
          disabled={loading}
          onClick={() => respond(friendship.id, true)}
        >
          {loading ? (
            <RiLoader4Line className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RiCheckLine className="h-3.5 w-3.5" />
          )}
        </Button>
        <Button
          variant="danger"
          size="icon-xs"
          className="rounded-xl"
          title="Decline"
          disabled={loading}
          onClick={() => respond(friendship.id, false)}
        >
          <RiCloseLine className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
