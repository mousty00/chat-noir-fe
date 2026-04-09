import { useMutation } from "@apollo/client/react";
import { DELETE_CAT_MEDIA } from "@/graphql/cat";
import { ApiResponse } from "@/types/cat";
import { useCallback, useState } from "react";
import { useAuthStore } from "../useAuthStore";
import { toast } from "sonner";

interface UseDeleteCatMediaReturn {
  deleteCatMedia: (id: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useDeleteCatMedia = (): UseDeleteCatMediaReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  const [deleteMediaMutation] = useMutation<{
    deleteCatMedia: ApiResponse<string>;
  }>(DELETE_CAT_MEDIA);

  const deleteCatMedia = useCallback(
    async (id: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await deleteMediaMutation({
          variables: { id },
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            }
          }
        });

        const response = data?.deleteCatMedia;

        if (!response?.success) {
          throw new Error(response?.message || "Failed to remove media");
        }

        toast.success("Media detached from record");
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to remove media";
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [deleteMediaMutation, token]
  );

  return {
    deleteCatMedia,
    loading,
    error,
  };
};
