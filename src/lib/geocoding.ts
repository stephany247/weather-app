// lib/geocoding.ts
import axios from "axios";
import type { LocationData } from "./types";
// import { LocationData } from "@/types/weather";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function fetchLocation(query: string): Promise<LocationData[] | []> {
  const { data } = await axios.get(GEO_URL, {
    params: {
      name: query,
      count: 10,
    },
  });

  if (!data.results || data.results.length === 0) {
    return [];
  }

  const locations: LocationData[] = data.results.map ((result: any) => ({
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    country: result.country,
    admin1: result.admin1,
  }));

  return locations;
}
