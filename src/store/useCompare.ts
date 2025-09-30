import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LocationData } from "@/lib/types";

interface CompareStore {
  comparisons: LocationData[];
  addComparison: (location: LocationData) => void;
  removeComparison: (lat: number, lon: number) => void;
  clearComparisons: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      comparisons: [],
      addComparison: (location) => {
        const exists = get().comparisons.some(
          (loc) =>
            loc.latitude === location.latitude &&
            loc.longitude === location.longitude
        );
        if (!exists) {
          set({ comparisons: [...get().comparisons, location] });
        }
      },
      removeComparison: (lat, lon) => {
        set({
          comparisons: get().comparisons.filter(
            (loc) => loc.latitude !== lat || loc.longitude !== lon
          ),
        });
      },
      clearComparisons: () => set({ comparisons: [] }),
    }),
    {
      name: "compare-locations", // localStorage key
    }
  )
);
