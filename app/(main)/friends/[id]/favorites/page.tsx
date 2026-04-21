"use client";

import { FavoriteCatCard } from "@/components/favorites/favorite-cat-card";
import { CatDetailsDrawer } from "@/components/cat/cat-details-drawer";
import { CatGridSkeleton } from "@/components/cat/cat-card-skeleton";
import { PaginationControls } from "@/components/layout/pagination-control";
import { ErrorState } from "@/components/ui/error-state";
import { useFriendFavorites } from "@/hooks/friendship/useFriendFavorites";
import { useState } from "react";
import { use } from "react";
import { RiHeartLine, RiArrowLeftLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserFavorite } from "@/types/favorites";

interface FriendFavoritesPageProps {
  params: Promise<{ id: string }>;
}

export default function FriendFavoritesPage({ params }: FriendFavoritesPageProps) {
  const { id } = use(params);
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { favorites, pagination, loading, error, handlePageChange } =
    useFriendFavorites(id, 12);

  const handleView = (catId: string) => {
    setDetailsId(catId);
    setIsDetailsOpen(true);
  };

  if (error) {
    return (
      <ErrorState
        message={
          error.message.includes("Not friends")
            ? "You must be friends to view their favorites."
            : error.message
        }
      />
    );
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          <Link href="/friends">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground rounded-xl">
              <RiArrowLeftLine className="h-3.5 w-3.5" />
              Back to friends
            </Button>
          </Link>
        </div>
        <h1 className="text-2xl text-center font-semibold tracking-tight">Favorites</h1>
        <p className="text-[13px] text-center text-muted-foreground mt-1">
          Cats your friend loves.
        </p>
      </div>

      {pagination && (
        <div className="flex justify-end mb-6">
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            hasPrevious={pagination.hasPrevious}
            hasNext={pagination.hasNext}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {loading && favorites.length === 0 ? (
        <CatGridSkeleton />
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
          <RiHeartLine className="h-12 w-12 opacity-20" />
          <p className="text-sm font-mono uppercase tracking-widest opacity-50">No favorites yet</p>
        </div>
      ) : (
        <section className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
          {favorites.map((favorite: UserFavorite) => (
            <FavoriteCatCard
              key={favorite.id}
              cat={favorite.cat}
              onView={handleView}
            />
          ))}
        </section>
      )}

      <CatDetailsDrawer
        catId={detailsId}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setDetailsId(null);
        }}
      />
    </>
  );
}
