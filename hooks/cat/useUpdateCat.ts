import { useMutation as useApolloMutation } from "@apollo/client/react";
import { useMutation as useTanstackMutation } from "@tanstack/react-query";
import { UPDATE_CAT, GET_CATS } from "@/graphql/cat";
import { ApiResponse, Cat } from "@/types/cat";
import { useCallback, useState } from "react";
import { getEndpoint } from "@/constants/api";
import { useAuthStore } from "../useAuthStore";
import { toast } from "sonner";

interface CatRequestInput {
  name: string;
  color?: string;
  categoryId?: string;
  image?: string;
  sourceName?: string;
}

interface UseUpdateCatReturn {
  updateCat: (id: string, input: CatRequestInput, mediaFile?: File | null) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useUpdateCat = (): UseUpdateCatReturn => {
  const [apolloLoading, setApolloLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  const [updateCatMutation] = useApolloMutation<{
    updateCat: ApiResponse<Cat>;
  }>(UPDATE_CAT, {
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

  const updateCat = useCallback(
    async (id: string, input: CatRequestInput, mediaFile?: File | null): Promise<boolean> => {
      setApolloLoading(true);
      setError(null);

      try {
        const { data } = await updateCatMutation({
          variables: {
            id,
            cat: {
              name: input.name,
              color: input.color || null,
              categoryId: input.categoryId || null,
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

        const response = data?.updateCat;

        if (!response?.success || !response.data) {
          throw new Error(response?.message || "Failed to update cat");
        }

        if (mediaFile) {
          await uploadMediaAsync({ catId: id, file: mediaFile });
        }

        toast.success("Cat entry updated successfully");
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update cat";
        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Update cat error:", err);
        return false;
      } finally {
        setApolloLoading(false);
      }
    },
    [updateCatMutation, uploadMediaAsync, token]
  );

  return {
    updateCat,
    loading: apolloLoading || isUploading,
    error,
  };
};
