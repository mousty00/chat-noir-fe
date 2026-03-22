import { useQuery } from "@apollo/client/react";
import { MY_SUBMISSIONS } from "@/graphql/submission";
import { ApiResponsePaginatedSubmission, CatSubmission, PaginatedSubmission } from "@/types/submission";
import type { ErrorLike } from "@apollo/client";
import { useCallback, useState } from "react";

interface UseMySubmissionsReturn {
  submissions: CatSubmission[];
  pagination: Omit<PaginatedSubmission, "result"> | null;
  loading: boolean;
  error: ErrorLike | undefined;
  refetch: () => void;
  handlePageChange: (newPage: number) => void;
}

export const useMySubmissions = (initialPage = 0, pageSize = 12): UseMySubmissionsReturn => {
  const [page, setPage] = useState(initialPage);

  const { data, loading, error, refetch } = useQuery<{
    mySubmissions: ApiResponsePaginatedSubmission;
  }>(MY_SUBMISSIONS, {
    variables: { page, size: pageSize },
    fetchPolicy: "cache-and-network",
  });

  const response = data?.mySubmissions;
  const submissions = response?.data?.result || [];
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

  return { submissions, pagination, loading, error, refetch, handlePageChange };
};
