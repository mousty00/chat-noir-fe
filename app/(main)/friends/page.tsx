"use client";

import { FriendCard } from "@/components/friends/friend-card";
import { PendingRequestCard } from "@/components/friends/pending-request-card";
import { ErrorState } from "@/components/ui/error-state";
import { useFriends } from "@/hooks/friendship/useFriends";
import { usePendingRequests } from "@/hooks/friendship/usePendingRequests";
import Link from "next/link";
import { RiSearch2Line, RiUserHeartLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/10 h-[60px] animate-pulse"
        />
      ))}
    </div>
  );
}

export default function FriendsPage() {
  const { friends, loading: friendsLoading, error: friendsError, refetch: refetchFriends } = useFriends();
  const { requests, loading: requestsLoading, error: requestsError, refetch: refetchRequests } = usePendingRequests();

  if (friendsError) return <ErrorState message={friendsError.message} onRetry={refetchFriends} />;
  if (requestsError) return <ErrorState message={requestsError.message} onRetry={refetchRequests} />;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl text-center font-semibold tracking-tight">Friends</h1>
        <p className="text-[13px] text-center text-muted-foreground mt-1">
          Manage your friends and requests.
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <Link href="/friends/explore">
          <Button variant="outline" size="sm" className="gap-2 rounded-xl">
            <RiSearch2Line className="h-3.5 w-3.5" />
            Explore users
          </Button>
        </Link>
      </div>

      {/* Pending requests */}
      {(requestsLoading || requests.length > 0) && (
        <section className="mb-8">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/60 mb-3">
            Pending requests
            {requests.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-primary-foreground text-[10px] font-bold">
                {requests.length}
              </span>
            )}
          </h2>
          {requestsLoading ? (
            <ListSkeleton count={2} />
          ) : (
            <div className="flex flex-col gap-2">
              {requests.map((r) => (
                <PendingRequestCard key={r.id} friendship={r} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Friends list */}
      <section>
        <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/60 mb-3">
          Friends {!friendsLoading && friends.length > 0 && `· ${friends.length}`}
        </h2>
        {friendsLoading ? (
          <ListSkeleton />
        ) : friends.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
            <RiUserHeartLine className="h-12 w-12 opacity-20" />
            <p className="text-sm font-mono uppercase tracking-widest opacity-50">No friends yet</p>
            <Link href="/friends/explore">
              <Button variant="outline" size="sm" className="gap-2 rounded-xl mt-2">
                <RiSearch2Line className="h-3.5 w-3.5" />
                Find people
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {friends.map((f) => (
              <FriendCard key={f.id} friendship={f} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
