import { useQuery } from "@apollo/client/react";
import { FRIEND_FAVORITES } from "@/graphql/friendship";
import { FriendFavoritesApiResponse } from "@/types/friendship";
import { FavoritesPaginationData } from "@/types/favorites";
import type { ErrorLike } from "@apollo/client";
import { useCallback, useState } from "react";

interface UseFriendFavoritesReturn {
  favorites: FavoritesPaginationData["result"];
  pagination: Omit<FavoritesPaginationData, "result"> | null;
  loading: boolean;
  error: ErrorLike | undefined;
  handlePageChange: (newPage: number) => void;
}

export const useFriendFavorites = (
  friendId: string,
  pageSize = 12
): UseFriendFavoritesReturn => {
  const [page, setPage] = useState(0);

  const { data, loading, error, refetch } = useQuery<{
    friendFavorites: FriendFavoritesApiResponse;
  }>(FRIEND_FAVORITES, {
    variables: { friendId, page, size: pageSize },
    fetchPolicy: "cache-and-network",
    skip: !friendId,
  });

  const response = data?.friendFavorites?.data;
  const favorites = response?.result ?? [];
  const pagination = response
    ? {
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        pageSize: response.pageSize,
        hasNext: response.hasNext,
        hasPrevious: response.hasPrevious,
      }
    : null;

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      refetch({ page: newPage, size: pageSize, friendId });
    },
    [refetch, pageSize, friendId]
  );

  return { favorites, pagination, loading, error, handlePageChange };
};
