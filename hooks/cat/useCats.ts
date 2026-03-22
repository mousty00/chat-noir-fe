import { useQuery } from "@apollo/client/react";
import { GET_CATS } from "@/graphql/cat";
import { ApiResponse, Cat, PaginationData } from "@/types/cat";
import type { ErrorLike } from "@apollo/client";
import { useCallback, useState } from "react";

interface UseCatsReturn {
  cats: Cat[];
  pagination: PaginationData | null;
  loading: boolean;
  error: ErrorLike | undefined;
  success: boolean;
  message: string;
  networkStatus: number;
  refetchCount: number;
  handleRefetch: () => void;
  handlePageChange: (newPage: number) => void;
}

export const useCats = (
  initialPage = 0,
  pageSize = 12,
  category?: string,
  name?: string,
  color?: string,
  source?: string,
): UseCatsReturn => {
  const [page, setPage] = useState(initialPage);
  const [refetchCount, setRefetchCount] = useState(0);

  const { data, loading, error, refetch, networkStatus } = useQuery<{
    cats: ApiResponse<PaginationData>;
  }>(GET_CATS, {
    variables: { page, size: pageSize, category, name, color, source },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    pollInterval: 5 * 60 * 1000,
  });

  const response = data?.cats;
  const cats = response?.data?.result || [];
  const pagination = response?.data || null;
  const success = !!response?.success;
  const message = response?.message || "";

  const handleRefetch = useCallback(() => {
    refetch();
    setRefetchCount((prev) => prev + 1);
  }, [refetch]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      refetch({ page: newPage, size: pageSize });
    },
    [refetch, pageSize],
  );

  return {
    cats,
    pagination,
    loading,
    error,
    success,
    message,
    networkStatus,
    refetchCount,
    handleRefetch,
    handlePageChange,
  };
};
