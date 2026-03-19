"use client";

import { CatGridSkeleton } from "@/components/cat/cat-card-skeleton";
import { CatDetailsDrawer } from "@/components/cat/cat-details-drawer";
import { CatGrid } from "@/components/cat/cat-grid";
import { CreateCatDrawer } from "@/components/cat/create-cat-drawer";
import { FilterChips } from "@/components/cat/filter-chips";
import { FilterDrawer } from "@/components/cat/filter-drawer";
import { NameSearch } from "@/components/cat/name-search";
import { UpdateCatDrawer } from "@/components/cat/update-cat-drawer";
import { Header } from "@/components/layout/header";
import { PaginationControls } from "@/components/layout/pagination-control";
import { RefreshButton } from "@/components/layout/refresh-button";
import { Stats } from "@/components/layout/stats";
import { ErrorState } from "@/components/ui/error-state";
import { useCategories } from "@/hooks/cat/useCategories";
import { useCatMediaDownload } from "@/hooks/cat/useCatMediaDownload";
import { useCats } from "@/hooks/cat/useCats";
import { useDeleteCat } from "@/hooks/cat/useDeleteCat";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Cat } from "@/types/cat";
import { Activity, useState } from "react";

export default function Home() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);


  const { user } = useAuthStore();
  const { categories } = useCategories();

  const {
    cats,
    pagination,
    loading,
    error,
    networkStatus,
    refetchCount,
    handleRefetch,
    handlePageChange,
  } = useCats(0, 12, category, name, color, source);

  const {
    downloadMedia,
    downloadingId,
    error: downloadError,
  } = useCatMediaDownload();

  const { deleteCat } = useDeleteCat();

  const handleApplyFilters = (filters: {
    category?: string;
    name?: string;
    color?: string;
    source?: string;
  }) => {
    setCategory(filters.category);
    setName(filters.name);
    setColor(filters.color);
    setSource(filters.source);
  };

  const handleRemoveFilter = (type: "category" | "name" | "color" | "source") => {
    if (type === "category") setCategory(undefined);
    if (type === "name") setName(undefined);
    if (type === "color") setColor(undefined);
    if (type === "source") setSource(undefined);
  };

  const handleClearAll = () => {
    setCategory(undefined);
    setName(undefined);
    setColor(undefined);
    setSource(undefined);
  };

  if (error) {
    return (
      <ErrorState
        message={error.message}
        onRetry={handleRefetch}
      />
    );
  }

  const handleEdit = (id: string) => {
    const catToEdit = cats.find(c => c.id === id);
    if (catToEdit) {
      setSelectedCat(catToEdit);
      setIsUpdateOpen(true);
    }
  };

  const handleDetails = (id: string) => {
    setDetailsId(id);
    setIsDetailsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this cat?")) {
      const success = await deleteCat(id);
      if (success) {
        handleRefetch();
      }
    }
  };

  return (
    <>
      <Header />

      <section className="w-full flex flex-col gap-4 mb-8 px-2 md:px-0">
        <div className="flex flex-col xl:flex-row gap-6 items-center justify-between w-full">
          {(pagination || loading) && (
            <div className="w-full xl:w-auto">
              {loading ? (
                <div className="flex items-center gap-4 px-4 py-2 border border-border bg-background/40 backdrop-blur-sm rounded-md h-[42px] w-[280px]">
                  <div className="h-4 w-full bg-muted/50 animate-pulse rounded" />
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

          <div className="flex-1 flex items-center gap-4 w-full xl:max-w-3xl">
            <div className="flex-1">
              <NameSearch onSearch={(v) => setName(v.trim() || undefined)} />
            </div>
            <FilterDrawer
              initialFilters={{ category, name, color, source }}
              onApply={handleApplyFilters}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 w-full xl:w-auto">
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
            {user?.isAdmin && <CreateCatDrawer />}
          </div>
        </div>

        <FilterChips
          category={category}
          name={name}
          color={color}
          source={source}
          categories={categories}
          onRemove={handleRemoveFilter}
          onClearAll={handleClearAll}
        />
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
          onView={handleDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetails={handleDetails}
          downloadingId={downloadingId}
        />
      )}

      <UpdateCatDrawer
        cat={selectedCat}
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedCat(null);
          handleRefetch();
        }}
      />

      <CatDetailsDrawer
        catId={detailsId}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setDetailsId(null);
        }}
      />

      {refetchCount > 0 && (
        <p className="text-xs text-secondary/50 font-mono uppercase tracking-[0.2em] text-center mt-auto pb-4">
          refreshed {refetchCount} {refetchCount > 1 ? "times" : "time"}
        </p>
      )}
    </>
  );
}