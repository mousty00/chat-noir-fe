import { useMutation } from "@apollo/client/react";
import { DELETE_CAT, GET_CATS } from "@/graphql/cat";
import { ApiResponse, Cat } from "@/types/cat";
import { useCallback, useState } from "react";
import { useAuthStore } from "../useAuthStore";
import { toast } from "sonner";

interface UseDeleteCatReturn {
  deleteCat: (id: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useDeleteCat = (): UseDeleteCatReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  const [deleteCatMutation] = useMutation<{
    deleteCat: ApiResponse<Cat>;
  }>(DELETE_CAT, {
    refetchQueries: [{ query: GET_CATS, variables: { page: 0, size: 12 } }],
  });

  const deleteCat = useCallback(
    async (id: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await deleteCatMutation({
          variables: { id },
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            }
          }
        });

        const response = data?.deleteCat;

        if (!response?.success) {
          throw new Error(response?.message || "Failed to delete cat");
        }

        toast.success("Cat removed from archive");
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete cat";
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [deleteCatMutation, token]
  );

  return {
    deleteCat,
    loading,
    error,
  };
};
