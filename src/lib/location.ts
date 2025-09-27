// lib/location.ts
import type { LocationData, FavoriteLocation } from "@/lib/types";

export const normalizeLocation = (
  location: Omit<LocationData, "id">
): FavoriteLocation => {
  const lat = Number(location.latitude.toFixed(4));
  const lon = Number(location.longitude.toFixed(4));
  return {
    ...location,
    latitude: lat,
    longitude: lon,
    id: `${lat},${lon}`,
  };
};
