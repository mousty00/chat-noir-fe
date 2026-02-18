import { useQuery } from "@apollo/client/react";
import { GET_CATS } from "@/graphql/cat";
import { ApiResponse, PaginationData } from "@/types/cat";
import { useCallback, useState } from "react";

interface UseCatsReturn {
  cats: any[];
  pagination: PaginationData | null;
  loading: boolean;
  error: any;
  networkStatus: number;
  refetchCount: number;
  handleRefetch: () => void;
  handlePageChange: (newPage: number) => void;
}

export const useCats = (initialPage = 0, pageSize = 10): UseCatsReturn => {
  const [page, setPage] = useState(initialPage);
  const [refetchCount, setRefetchCount] = useState(0);

  const { data, loading, error, refetch, networkStatus } = useQuery<{
    allCats: ApiResponse<PaginationData>;
  }>(GET_CATS, {
    variables: { page, size: pageSize },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    pollInterval: 5 * 60 * 1000,
  });

  const response = data?.allCats;
  const cats = response?.data?.result || [];
  const pagination = response?.data || null;

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
    networkStatus,
    refetchCount,
    handleRefetch,
    handlePageChange,
  };
};
