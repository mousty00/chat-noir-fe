import { useQuery } from "@apollo/client/react";
import { EXPLORE_USERS } from "@/graphql/friendship";
import { ExploreUsersApiResponse, UserPublic } from "@/types/friendship";
import type { ErrorLike } from "@apollo/client";
import { useCallback, useState } from "react";

interface UseExploreUsersReturn {
  users: UserPublic[];
  pagination: Omit<NonNullable<ExploreUsersApiResponse["data"]>, "result"> | null;
  loading: boolean;
  error: ErrorLike | undefined;
  handlePageChange: (newPage: number) => void;
  handleSearch: (username: string) => void;
}

export const useExploreUsers = (pageSize = 20): UseExploreUsersReturn => {
  const [page, setPage] = useState(0);
  const [username, setUsername] = useState("");

  const { data, loading, error, refetch } = useQuery<{
    exploreUsers: ExploreUsersApiResponse;
  }>(EXPLORE_USERS, {
    variables: { username: username || undefined, page, size: pageSize },
    fetchPolicy: "cache-and-network",
  });

  const response = data?.exploreUsers?.data;
  const users = response?.result ?? [];
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
      refetch({ page: newPage, size: pageSize, username: username || undefined });
    },
    [refetch, pageSize, username]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setUsername(value);
      setPage(0);
      refetch({ page: 0, size: pageSize, username: value || undefined });
    },
    [refetch, pageSize]
  );

  return { users, pagination, loading, error, handlePageChange, handleSearch };
};
