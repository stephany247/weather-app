// /store/useSelectedLocation.ts
import { create } from "zustand";
import type { LocationData } from "@/lib/types";

interface SelectedLocationStore {
  selectedLocation: LocationData | null;
  setSelectedLocation: (loc: LocationData | null) => void;
}

export const useSelectedLocation = create<SelectedLocationStore>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (loc) => set({ selectedLocation: loc }),
}));
