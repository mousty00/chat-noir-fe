"use client";

import { Friendship } from "@/types/friendship";
import { Button } from "@/components/ui/button";
import { useRemoveFriend } from "@/hooks/friendship/useRemoveFriend";
import Image from "next/image";
import Link from "next/link";
import {
  RiHeartLine,
  RiLoader4Line,
  RiUserUnfollowLine,
} from "react-icons/ri";

interface FriendCardProps {
  friendship: Friendship;
}

export const FriendCard = ({ friendship }: FriendCardProps) => {
  const { removeFriend, loading } = useRemoveFriend();
  const { friend } = friendship;

  const initials = friend.username.substring(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
      <Link href={`/friends/${friend.id}/favorites`} className="shrink-0">
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
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/friends/${friend.id}/favorites`}>
          <p className="text-[13px] font-semibold text-foreground truncate hover:text-secondary transition-colors">
            {friend.username}
          </p>
        </Link>
        <p className="text-[10px] text-muted-foreground/60 font-mono uppercase tracking-wider">
          Friend
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <Link href={`/friends/${friend.id}/favorites`}>
          <Button variant="outline" size="icon-xs" className="rounded-xl" title="View favorites">
            <RiHeartLine className="h-3.5 w-3.5" />
          </Button>
        </Link>
        <Button
          variant="danger"
          size="icon-xs"
          className="rounded-xl"
          title="Remove friend"
          disabled={loading}
          onClick={() => removeFriend(friendship.id)}
        >
          {loading ? (
            <RiLoader4Line className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RiUserUnfollowLine className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
};
