// store/useWeather.ts
import { create } from "zustand";
import type { WeatherData } from "@/lib/types";

interface WeatherStore {
  weather: WeatherData | null;
  setWeather: (data: WeatherData | null) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  setWeather: (data) => set({ weather: data }),
}));
