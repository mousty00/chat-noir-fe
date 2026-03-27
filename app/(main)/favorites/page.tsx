"use client";

import { FavoriteCatCard } from "@/components/favorites/favorite-cat-card";
import { CatDetailsDrawer } from "@/components/cat/cat-details-drawer";

import { PaginationControls } from "@/components/layout/pagination-control";
import { Stats } from "@/components/layout/stats";
import { ErrorState } from "@/components/ui/error-state";
import { useState } from "react";
import { RiHeartLine, RiLoader4Line } from "react-icons/ri";
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
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
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
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
          <RiLoader4Line className="h-8 w-8 animate-spin text-secondary" />
          <p className="text-[10px] font-mono uppercase tracking-widest">Loading favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
          <RiHeartLine className="h-12 w-12 opacity-20" />
          <p className="text-sm font-mono uppercase tracking-widest opacity-50">No favorites yet</p>
          <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
            Browse cats and heart the ones you love
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {favorites.map((favorite: UserFavorite) => (
            <FavoriteCatCard
              key={favorite.id}
              cat={favorite.cat}
              onView={handleDetails}
            />
          ))}
        </div>
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
