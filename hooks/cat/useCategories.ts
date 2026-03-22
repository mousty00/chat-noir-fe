import { useQuery } from "@apollo/client/react";
import { GET_CAT_CATEGORIES } from "@/graphql/cat";
import { ApiResponse, Category } from "@/types/cat";
import { ApolloError } from "@apollo/client";

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: ApolloError | undefined;
}

export const useCategories = (): UseCategoriesReturn => {
  const { data, loading, error } = useQuery<{
    categories: ApiResponse<Category[]>;
  }>(GET_CAT_CATEGORIES);

  const categories = data?.categories?.data || [];

  return {
    categories,
    loading,
    error,
  };
};
