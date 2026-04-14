import { useMutation as useApolloMutation, useApolloClient } from "@apollo/client/react";
import { UPDATE_CATEGORY, GET_CAT_CATEGORIES } from "@/graphql/cat";
import { ApiResponse, Category } from "@/types/cat";
import { useCallback, useState } from "react";
import { useAuthStore } from "../useAuthStore";

interface CategoryRequestInput {
  name: string;
  mediaTypeHint?: string | null;
}

interface UseUpdateCategoryReturn {
  updateCategory: (id: string, input: CategoryRequestInput) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useUpdateCategory = (): UseUpdateCategoryReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();
  const apolloClient = useApolloClient();

  const [updateCategoryMutation] = useApolloMutation<{
    updateCategory: ApiResponse<Category>;
  }>(UPDATE_CATEGORY);

  const updateCategory = useCallback(
    async (id: string, input: CategoryRequestInput): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await updateCategoryMutation({
          variables: {
            id,
            category: {
              name: input.name,
              mediaTypeHint: input.mediaTypeHint || null,
            },
          },
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        });

        const response = data?.updateCategory;

        if (!response?.success || !response.data) {
          throw new Error(response?.message || "Failed to update category");
        }

        await apolloClient.refetchQueries({ include: [GET_CAT_CATEGORIES] });

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update category");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [updateCategoryMutation, token, apolloClient]
  );

  return { updateCategory, loading, error };
};
