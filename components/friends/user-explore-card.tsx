"use client";

import { UserPublic } from "@/types/friendship";
import { Button } from "@/components/ui/button";
import { useSendFriendRequest } from "@/hooks/friendship/useSendFriendRequest";
import Image from "next/image";
import {
  RiLoader4Line,
  RiUserAddLine,
  RiUserFollowLine,
  RiTimeLine,
} from "react-icons/ri";

interface UserExploreCardProps {
  user: UserPublic;
}

export const UserExploreCard = ({ user }: UserExploreCardProps) => {
  const { sendRequest, loading } = useSendFriendRequest();
  const initials = user.username.substring(0, 2).toUpperCase();

  const isFriend = user.friendStatus === "ACCEPTED";
  const isPending = user.friendStatus === "PENDING";

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
      <div className="shrink-0">
        <div className="relative w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/25 overflow-hidden flex items-center justify-center text-secondary">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.username}
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
          {user.username}
        </p>
        {isFriend && (
          <p className="text-[10px] text-secondary/70 font-mono uppercase tracking-wider">
            Already friends
          </p>
        )}
        {isPending && (
          <p className="text-[10px] text-muted-foreground/60 font-mono uppercase tracking-wider">
            Request sent
          </p>
        )}
      </div>

      <div className="shrink-0">
        {isFriend ? (
          <Button variant="outline" size="icon-xs" className="rounded-xl" disabled title="Already friends">
            <RiUserFollowLine className="h-3.5 w-3.5 text-secondary" />
          </Button>
        ) : isPending ? (
          <Button variant="outline" size="icon-xs" className="rounded-xl" disabled title="Request pending">
            <RiTimeLine className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon-xs"
            className="rounded-xl"
            title="Add friend"
            disabled={loading}
            onClick={() => sendRequest(user.id)}
          >
            {loading ? (
              <RiLoader4Line className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RiUserAddLine className="h-3.5 w-3.5" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
