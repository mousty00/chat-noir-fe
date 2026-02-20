"use client";

import { useCats } from "@/hooks/cat/useCats";
import { CatGridSkeleton } from "@/components/cat/cat-card-skeleton";
import { useState } from "react";
import { useCatMediaDownload } from "@/hooks/cat/useCatMediaDownload";
import { ErrorState } from "@/components/ui/error-state";
import { CatGrid } from "@/components/cat/cat-grid";
import { CategorySelect } from "@/components/cat/category-select";
import { NameSearch } from "@/components/cat/name-search";
import { Header } from "@/components/layout/header";
import { PaginationControls } from "@/components/layout/pagination-control";
import { RefreshButton } from "@/components/layout/refresh-button";
import { toast } from "sonner";
import { Stats } from "@/components/layout/stats";

export default function Home() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory || undefined);
  };

  const handleNameChange = (newName: string) => {
    setName(newName || undefined);
  };
  const {
    cats,
    pagination,
    loading,
    error,
    networkStatus,
    refetchCount,
    handleRefetch,
    handlePageChange,
  } = useCats(0, 12, category, name);

  const {
    downloadMedia,
    viewMedia,
    downloadingId,
    error: downloadError,
  } = useCatMediaDownload();

  if (error) {
    return (
      <ErrorState
        message={error.message}
        onRetry={handleRefetch}
      />
    );
  }


  const handleEdit = (id: string) => {
    toast.info(`Editing cat ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    toast.error(`Requesting deletion for cat ID: ${id}`);
  };

  return (
    <>
      <Header />

      <section className="w-full flex flex-col lg:flex-row justify-between items-stretch lg:items-center mb-8 gap-6 px-2 md:px-0">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
          {(pagination || loading) && (
            <div className="w-full md:w-auto">
              {loading ? (
                <div className="flex items-center gap-4 px-4 py-2 border border-border bg-black/40 backdrop-blur-sm rounded-md h-[42px] w-[280px]">
                  <div className="h-4 w-full bg-white/5 animate-pulse rounded" />
                </div>
              ) : (
                <Stats
                  itemCount={cats.length}
                  totalItems={pagination?.totalItems || 0}
                  currentPage={pagination?.currentPage || 1}
                  totalPages={pagination?.totalPages || 1}
                />
              )}
            </div>
          )}

          <div className="w-full md:flex-1 md:max-w-md">
            <NameSearch onSearch={handleNameChange} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {pagination && (
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasPrevious={pagination.hasPrevious}
                hasNext={pagination.hasNext}
                onPageChange={handlePageChange}
              />
            )}

            <RefreshButton
              onRefresh={handleRefetch}
              isRefreshing={networkStatus === 4 || (loading && networkStatus === 1)}
            />

            <CategorySelect
              value={category}
              onValueChange={handleCategoryChange}
            />
          </div>
        </div>
      </section>

      {downloadError && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          {downloadError}
        </div>
      )}

      {loading && cats.length === 0 ? (
        <CatGridSkeleton />
      ) : (
        <CatGrid
          cats={cats}
          onDownload={downloadMedia}
          onView={viewMedia}
          onEdit={handleEdit}
          onDelete={handleDelete}
          downloadingId={downloadingId}
        />
      )}

      {refetchCount > 0 && (
        <p className="text-xs text-gray-400 text-center mt-auto">
          Refreshed {refetchCount} time{refetchCount !== 1 ? 's' : ''}
        </p>
      )}
    </>
  );
}