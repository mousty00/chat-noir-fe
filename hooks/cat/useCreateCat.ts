import { useMutation as useApolloMutation } from "@apollo/client/react";
import { useMutation as useTanstackMutation } from "@tanstack/react-query";
import { stripTypename } from "@apollo/client/utilities";
import { CREATE_CAT, GET_CATS } from "@/graphql/cat";
import { ApiResponse, Cat } from "@/types/cat";
import { useCallback, useState } from "react";
import { getEndpoint } from "@/constants/api";
import { useAuthStore } from "../useAuthStore";

interface CategoryRequestInput {
  id: string;
  name: string;
  mediaTypeHint?: string;
}

interface CatRequestInput {
  name: string;
  color?: string;
  category?: CategoryRequestInput | null;
  image?: string;
  sourceName?: string;
}

interface UseCreateCatReturn {
  createCat: (input: CatRequestInput, mediaFile?: File | null) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useCreateCat = (): UseCreateCatReturn => {
  const [apolloLoading, setApolloLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  const [createCatMutation] = useApolloMutation<{
    createCat: ApiResponse<Cat>;
  }>(CREATE_CAT, {
    refetchQueries: [{ query: GET_CATS, variables: { page: 0, size: 12 } }],
  });

  const { mutateAsync: uploadMediaAsync, isPending: isUploading } = useTanstackMutation({
    mutationFn: async ({ catId, file }: { catId: string; file: File }) => {
      const formData = new FormData();
      formData.append("mediaFile", file);

      const response = await fetch(
        `${getEndpoint("cats")}/${catId}/media`,
        {
          method: "POST",
          headers: {
            "Authorization": token ? `Bearer ${token}` : "",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Media upload failed: ${response.statusText}`);
      }

      return response.json();
    }
  });

  const createCat = useCallback(
    async (input: CatRequestInput, mediaFile?: File | null): Promise<boolean> => {
      setApolloLoading(true);
      setError(null);

      try {
        const { data } = await createCatMutation({
          variables: {
            cat: {
              name: input.name,
              color: input.color || null,
              category: input.category ? stripTypename(input.category) : null,
              image: input.image || null,
              sourceName: input.sourceName || null,
            },
          },
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            }
          }
        });

        const response = data?.createCat;

        if (!response?.success || !response.data) {
          throw new Error(response?.message || "Failed to create cat");
        }

        if (mediaFile && response.data.id) {
          await uploadMediaAsync({ catId: response.data.id, file: mediaFile });
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create cat";
        setError(errorMessage);
        console.error("Create cat error:", err);
        return false;
      } finally {
        setApolloLoading(false);
      }
    },
    [createCatMutation, uploadMediaAsync, token]
  );

  return {
    createCat,
    loading: apolloLoading || isUploading,
    error,
  };
};
