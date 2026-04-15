"use client";

import { FavoriteCatCard } from "@/components/favorites/favorite-cat-card";
import { CatDetailsDrawer } from "@/components/cat/cat-details-drawer";
import { CatGridSkeleton } from "@/components/cat/cat-card-skeleton";

import { PaginationControls } from "@/components/layout/pagination-control";
import { Stats } from "@/components/layout/stats";
import { ErrorState } from "@/components/ui/error-state";
import { useState } from "react";
import { RiHeartLine } from "react-icons/ri";
import { UserFavorite } from "@/types/favorites";
import { useMyFavorites } from "@/hooks/favorites/useMyFavorites";

export default function FavoritesPage() {
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { favorites, pagination, loading, error, refetch, handlePageChange } =
    useMyFavorites(0, 12);

  const handleDetails = (id: string) => {
    setDetailsId(id);
    setIsDetailsOpen(true);
  };

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl text-center font-semibold tracking-tight">Favorites</h1>
        <p className="text-[13px] text-center text-muted-foreground mt-1">Cats you&apos;ve saved.</p>
      </div>

      <section className="w-full flex flex-col gap-4 mb-8 px-2 md:px-0">
        <div className="flex flex-col xl:flex-row gap-6 items-center justify-between w-full">
          {(pagination || loading) && (
            <div className="w-full xl:w-auto">
              {loading && !pagination ? (
                <div className="flex items-center gap-4 px-4 py-2 border border-border bg-background/40 backdrop-blur-sm rounded-md h-[42px] w-[280px]">
                  <div className="h-4 w-full bg-muted/50 animate-pulse rounded" />
                </div>
              ) : pagination ? (
                <Stats
                  itemCount={favorites.length}
                  totalItems={pagination.totalItems}
                />
              ) : null}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-end gap-2 w-full xl:w-auto ml-auto">
            {pagination && (
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasPrevious={pagination.hasPrevious}
                hasNext={pagination.hasNext}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </section>

      {loading && favorites.length === 0 ? (
        <CatGridSkeleton />
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
          <RiHeartLine className="h-12 w-12 opacity-20" />
          <p className="text-sm font-mono uppercase tracking-widest opacity-50">No favorites yet</p>
          <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
            Browse cats and heart the ones you love
          </p>
        </div>
      ) : (
        <section className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
          {favorites.map((favorite: UserFavorite) => (
            <FavoriteCatCard
              key={favorite.id}
              cat={favorite.cat}
              onView={handleDetails}
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
