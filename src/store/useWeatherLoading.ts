// store/useWeatherLoading.ts
import { create } from "zustand";

interface WeatherLoadingState {
  isWeatherLoading: boolean;
  setWeatherLoading: (loading: boolean) => void;
}

export const useWeatherLoading = create<WeatherLoadingState>((set) => ({
  isWeatherLoading: false,
  setWeatherLoading: (loading) => set({ isWeatherLoading: loading }),
}));
