import { useMutation as useApolloMutation, useApolloClient } from "@apollo/client/react";
import { DELETE_CATEGORY, GET_CAT_CATEGORIES } from "@/graphql/cat";
import { ApiResponse, Category } from "@/types/cat";
import { useCallback, useState } from "react";
import { useAuthStore } from "../useAuthStore";

interface UseDeleteCategoryReturn {
  deleteCategory: (id: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useDeleteCategory = (): UseDeleteCategoryReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();
  const apolloClient = useApolloClient();

  const [deleteCategoryMutation] = useApolloMutation<{
    deleteCategory: ApiResponse<Category>;
  }>(DELETE_CATEGORY);

  const deleteCategory = useCallback(
    async (id: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await deleteCategoryMutation({
          variables: { id },
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        });

        const response = data?.deleteCategory;

        if (!response?.success) {
          throw new Error(response?.message || "Failed to delete category");
        }

        await apolloClient.refetchQueries({ include: [GET_CAT_CATEGORIES] });

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete category");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [deleteCategoryMutation, token, apolloClient]
  );

  return { deleteCategory, loading, error };
};
