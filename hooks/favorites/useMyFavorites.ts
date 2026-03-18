import { useQuery } from "@apollo/client/react";
import { MY_FAVORITES } from "@/graphql/favorites";
import { FavoritesApiResponse, FavoritesPaginationData } from "@/types/favorites";
import { useCallback, useState } from "react";

interface UseMyFavoritesReturn {
  favorites: FavoritesPaginationData["result"];
  pagination: Omit<FavoritesPaginationData, "result"> | null;
  loading: boolean;
  error: any;
  refetch: () => void;
  handlePageChange: (newPage: number) => void;
}

export const useMyFavorites = (
  initialPage = 0,
  pageSize = 12
): UseMyFavoritesReturn => {
  const [page, setPage] = useState(initialPage);

  const { data, loading, error, refetch } = useQuery<{
    myFavorites: FavoritesApiResponse;
  }>(MY_FAVORITES, {
    variables: { page, size: pageSize },
    fetchPolicy: "cache-and-network",
  });

  const response = data?.myFavorites;
  const favorites = response?.data?.result || [];
  const pagination = response?.data
    ? {
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItems,
        pageSize: response.data.pageSize,
        hasNext: response.data.hasNext,
        hasPrevious: response.data.hasPrevious,
      }
    : null;

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      refetch({ page: newPage, size: pageSize });
    },
    [refetch, pageSize]
  );

  return {
    favorites,
    pagination,
    loading,
    error,
    refetch,
    handlePageChange,
  };
};
