"use client";

import { UserExploreCard } from "@/components/friends/user-explore-card";
import { PaginationControls } from "@/components/layout/pagination-control";
import { ErrorState } from "@/components/ui/error-state";
import { useExploreUsers } from "@/hooks/friendship/useExploreUsers";
import { RiSearch2Line, RiUserSearchLine } from "react-icons/ri";
import { useRef } from "react";

function ListSkeleton({ count = 8 }: { count?: number }) {
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

export default function ExploreUsersPage() {
  const { users, pagination, loading, error, handlePageChange, handleSearch } =
    useExploreUsers(20);
  const inputRef = useRef<HTMLInputElement>(null);

  if (error) return <ErrorState message={error.message} />;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl text-center font-semibold tracking-tight">Explore</h1>
        <p className="text-[13px] text-center text-muted-foreground mt-1">
          Find and add other users.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <RiSearch2Line className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by username…"
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-muted/20 text-[13px] placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Pagination top */}
      {pagination && (
        <div className="flex justify-end mb-4">
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            hasPrevious={pagination.hasPrevious}
            hasNext={pagination.hasNext}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {loading ? (
        <ListSkeleton />
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
          <RiUserSearchLine className="h-12 w-12 opacity-20" />
          <p className="text-sm font-mono uppercase tracking-widest opacity-50">No users found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {users.map((user) => (
            <UserExploreCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </>
  );
}
