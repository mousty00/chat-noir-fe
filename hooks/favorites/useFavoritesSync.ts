import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { MY_FAVORITES } from "@/graphql/favorites";
import { FavoritesApiResponse } from "@/types/favorites";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import { useAuthStore } from "@/hooks/useAuthStore";

export const useFavoritesSync = () => {
  const { isAuthenticated } = useAuthStore();
  const { setFavorites, isLoaded } = useFavoriteStore();

  const { data } = useQuery<{ myFavorites: FavoritesApiResponse }>(
    MY_FAVORITES,
    {
      variables: { page: 0, size: 200 },
      skip: !isAuthenticated,
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    if (!data?.myFavorites?.data?.result) return;
    const ids = data.myFavorites.data.result.map((f) => f.cat.id);
    setFavorites(ids);
  }, [data, setFavorites]);
};
