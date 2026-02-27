import { GET_CAT_BY_ID } from "@/graphql/cat";
import { ApiResponse, Cat } from "@/types/cat";
import { useQuery } from "@apollo/client/react";

interface UseCatByIdReturn {
  cat: Cat | null;
  loading: boolean;
  error: any;
  refetch: () => void;
}

export const useCatById = (id: string | null): UseCatByIdReturn => {
  const { data, loading, error, refetch } = useQuery<{
    catById: ApiResponse<Cat>;
  }>(GET_CAT_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
  });

  return {
    cat: data?.catById?.data || null,
    loading,
    error,
    refetch,
  };
};
