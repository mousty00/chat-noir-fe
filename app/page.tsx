"use client";

import { useCats } from "@/hooks/cat/useCats";
import { LoadingState } from "@/components/ui/loading-state";
import { useCatMediaDownload } from "@/hooks/cat/useCatMediaDownload";
import { ErrorState } from "@/components/ui/error-state";
import { CatGrid } from "@/components/cat/cat-grid";
import { Header } from "@/components/layout/header";
import { PaginationControls } from "@/components/layout/pagination-control";
import { RefreshButton } from "@/components/layout/refresh-button";
import { Stats } from "@/components/layout/stats";
import { useState } from "react";
import { CategorySelect } from "@/components/cat/category-select";
import { NameSearch } from "@/components/cat/name-search";


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
  } = useCats(0, 10, category, name);

  const {
    downloadMedia,
    viewMedia,
    downloadingId,
    error: downloadError,
  } = useCatMediaDownload();

  if (loading && networkStatus === 1) {
    return (
      <div className="main-layout">
        <main className="main-container">
          <LoadingState />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-layout">
        <main className="main-container">
          <ErrorState
            message={error.message}
            onRetry={handleRefetch}
          />
        </main>
      </div>
    );
  }


  return (
    <div className="main-layout">
      <main className="main-container">
        <Header />

        <section className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          {pagination && (
            <Stats
              itemCount={cats.length}
              totalItems={pagination.totalItems}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          )}

          <NameSearch onSearch={handleNameChange} />

          <div className="flex gap-2">
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
              isRefreshing={networkStatus === 4}
            />


            <CategorySelect
              value={category}
              onValueChange={handleCategoryChange}
            />

          </div>
        </section>

        {downloadError && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
            {downloadError}
          </div>
        )}

        <CatGrid
          cats={cats}
          onDownload={downloadMedia}
          onView={viewMedia}
          downloadingId={downloadingId}
        />

        {refetchCount > 0 && (
          <p className="text-xs text-gray-400 mt-4 text-center mt-auto">
            Refreshed {refetchCount} time{refetchCount !== 1 ? 's' : ''}
          </p>
        )}
      </main>
    </div>
  );
}