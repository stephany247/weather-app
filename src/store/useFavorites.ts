import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LocationData, FavoriteLocation } from "@/lib/types";

interface FavoritesStore {
  favorites: FavoriteLocation[];
  addFavorite: (location: LocationData) => void;
  removeFavorite: (lat: number, lon: number) => void;
  isFavorite: (lat: number, lon: number) => boolean;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (location) => {
        const { favorites } = get();
        const id = `${location.latitude},${location.longitude}`; // ✅ stable id

        if (!favorites.some((fav) => fav.id === id)) {
          const newFav: FavoriteLocation = { ...location, id };
          set({ favorites: [...favorites, newFav] });
        }
      },
      removeFavorite: (lat, lon) => {
        const id = `${lat},${lon}`;
        set({
          favorites: get().favorites.filter((fav) => fav.id !== id),
        });
      },
      isFavorite: (lat, lon) => {
        const id = `${lat},${lon}`;
        return get().favorites.some((fav) => fav.id === id);
      },
    }),
    { name: "favorites" } // persists to localStorage
  )
);
