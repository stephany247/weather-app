import { create } from "zustand";

// export type Units = "metric" | "imperial";
import { type Units, metricDefaults } from "@/lib/units";

interface UnitsStore {
  units: Units;
  setUnits: (units: Units) => void;
}

export const useUnits = create<UnitsStore>((set) => ({
  units: metricDefaults, // default
  setUnits: (units) => set({ units }),
}));
