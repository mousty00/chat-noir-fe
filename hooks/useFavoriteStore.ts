import { create } from "zustand";

interface FavoriteStoreState {
  favoriteIds: Set<string>;
  isLoaded: boolean;
  setFavorites: (ids: string[]) => void;
  addFavoriteId: (id: string) => void;
  removeFavoriteId: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStoreState>((set, get) => ({
  favoriteIds: new Set(),
  isLoaded: false,

  setFavorites: (ids: string[]) =>
    set({ favoriteIds: new Set(ids), isLoaded: true }),

  addFavoriteId: (id: string) =>
    set((state) => ({
      favoriteIds: new Set([...state.favoriteIds, id]),
    })),

  removeFavoriteId: (id: string) =>
    set((state) => {
      const next = new Set(state.favoriteIds);
      next.delete(id);
      return { favoriteIds: next };
    }),

  isFavorite: (id: string) => get().favoriteIds.has(id),
}));
