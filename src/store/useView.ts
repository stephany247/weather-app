// src/store/useView.ts
import { create } from "zustand";

type View = "details" | "compare";

interface ViewStore {
  view: View;
  setView: (view: View) => void;
  resetView: () => void; // always back to "details"
}

export const useView = create<ViewStore>((set) => ({
  view: "details",
  setView: (view) => set({ view }),
  resetView: () => set({ view: "details" }),
}));
