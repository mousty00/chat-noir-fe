import { useMutation } from "@apollo/client/react";
import { ADD_FAVORITE, MY_FAVORITES, REMOVE_FAVORITE } from "@/graphql/favorites";
import { ApiResponse } from "@/types/cat";
import { UserFavorite } from "@/types/favorites";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface UseToggleFavoriteReturn {
  toggleFavorite: (catId: string) => Promise<void>;
  loading: boolean;
}

export const useToggleFavorite = (): UseToggleFavoriteReturn => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();
  const { isFavorite, addFavoriteId, removeFavoriteId } = useFavoriteStore();

  const refetchOptions = {
    refetchQueries: ["MyFavorites"],
  };

  const [addMutation] = useMutation<{ addFavorite: ApiResponse<UserFavorite> }>(
    ADD_FAVORITE,
    refetchOptions
  );

  const [removeMutation] = useMutation<{ removeFavorite: ApiResponse<unknown> }>(
    REMOVE_FAVORITE,
    refetchOptions
  );

  const toggleFavorite = useCallback(
    async (catId: string) => {
      setLoading(true);
      const alreadyFavorited = isFavorite(catId);
      const authHeader = { Authorization: token ? `Bearer ${token}` : "" };

      try {
        if (alreadyFavorited) {
          const { data } = await removeMutation({
            variables: { catId },
            context: { headers: authHeader },
          });
          if (!data?.removeFavorite?.success) {
            throw new Error(data?.removeFavorite?.message || "Failed to remove favorite");
          }
          removeFavoriteId(catId);
          toast.success("Removed from favorites");
        } else {
          const { data } = await addMutation({
            variables: { catId },
            context: { headers: authHeader },
          });
          if (!data?.addFavorite?.success) {
            throw new Error(data?.addFavorite?.message || "Failed to add favorite");
          }
          addFavoriteId(catId);
          toast.success("Added to favorites");
          
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong";
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
    [isFavorite, addFavoriteId, removeFavoriteId, addMutation, removeMutation, token]
  );

  return { toggleFavorite, loading };
};
