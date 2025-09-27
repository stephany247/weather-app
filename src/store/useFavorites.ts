import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LocationData, FavoriteLocation } from "@/lib/types";
import { normalizeLocation } from "@/lib/location";

interface FavoritesStore {
  favorites: FavoriteLocation[];
  addFavorite: (location: LocationData) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (location) => {
        const { favorites } = get();
        const normalizedFav: FavoriteLocation = normalizeLocation(location);
        if (!favorites.some((fav) => fav.id === normalizedFav.id)) {
          set({ favorites: [...get().favorites, normalizedFav] });
        }
      },
      removeFavorite: (id) => {
        set({
          favorites: get().favorites.filter((fav) => fav.id !== id),
        });
      },
      isFavorite: (id) => {
        return get().favorites.some((fav) => fav.id === id);
      },
    }),
    { name: "favorites" } // persists to localStorage
  )
);
