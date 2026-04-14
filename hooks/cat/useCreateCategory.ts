import { useMutation as useApolloMutation, useApolloClient } from "@apollo/client/react";
import { CREATE_CATEGORY, GET_CAT_CATEGORIES } from "@/graphql/cat";
import { ApiResponse, Category } from "@/types/cat";
import { useCallback, useState } from "react";
import { useAuthStore } from "../useAuthStore";

interface CategoryRequestInput {
  name: string;
  mediaTypeHint?: string | null;
}

interface UseCreateCategoryReturn {
  createCategory: (input: CategoryRequestInput) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useCreateCategory = (): UseCreateCategoryReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();
  const apolloClient = useApolloClient();

  const [createCategoryMutation] = useApolloMutation<{
    createCategory: ApiResponse<Category>;
  }>(CREATE_CATEGORY);

  const createCategory = useCallback(
    async (input: CategoryRequestInput): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await createCategoryMutation({
          variables: {
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

        const response = data?.createCategory;

        if (!response?.success || !response.data) {
          throw new Error(response?.message || "Failed to create category");
        }

        await apolloClient.refetchQueries({ include: [GET_CAT_CATEGORIES] });

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create category");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [createCategoryMutation, token, apolloClient]
  );

  return { createCategory, loading, error };
};
