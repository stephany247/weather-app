import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import type { LocationData, WeatherData } from "@/lib/types";
import { fetchWeather } from "@/lib/weather";
import { fetchLocation } from "@/lib/geocoding";
import { CurrentWeather } from "@/components/CurrentWeather";
import { DailyForecast } from "@/components/DailyForecast";
import { HourlyForecast } from "@/components/HourlyForecast";
import { metricDefaults, type Units } from "@/lib/units";
import { useUnits } from "@/store/useUnits";

export default function IndexPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );
  // const [units, setUnits] = useState<Units>(metricDefaults);
const {units, setUnits} = useUnits();

  const handleSearch = async (query: string) => {
    if (!query || !query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const locations = await fetchLocation(query);
      setSuggestions(locations || []);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleSelect = (location: any) => {
    setSelectedLocation(location);
    // Autocomplete input with selected option
    setQuery(
      `${location.name}${location.admin1 ? `, ${location.admin1}` : ""}`
    );
    setSuggestions([]); // hide dropdown
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use selectedLocation if available, otherwise fallback to the first suggestion
    // const location = selectedLocation || suggestions[0];
    // if (!location) return;

    let location = selectedLocation;

    // If no selectedLocation, try to fetch closest match
    if (!location && query.trim()) {
      try {
        const locations = await fetchLocation(query);
        if (locations.length > 0) {
          location = locations[0];
          console.log("Locations:", location);
        } else {
          console.warn("No locations found for query:", query);
          return;
        }
      } catch (err) {
        console.error("Error fetching fallback location:", err);
        return;
      }
    }

    if (!location) return;

    try {
      const weatherData = await fetchWeather(
        location.latitude,
        location.longitude,
        units
      );
      setWeather(weatherData);
      setSuggestions([]);
    } catch (error) {
      console.error("Weather fetch failed:", error);
    }
  };

  // ✅ Re-fetch when units change (if we already have a location)
  useEffect(() => {
    if (selectedLocation) {
      (async () => {
        try {
          const weatherData = await fetchWeather(
            selectedLocation.latitude,
            selectedLocation.longitude,
            units
          );
          setWeather(weatherData);
        } catch (error) {
          console.error("Weather fetch failed:", error);
        }
      })();
    }
  }, [units, selectedLocation]);

  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto space-y-12">
        <h1 className="font-grotesque text-[3.25rem]/tight text-center font-bold px-2">
          How's the sky looking today?
        </h1>

        <div className="relative w-full">
          <SearchForm
            query={query}
            setQuery={setQuery}
            results={suggestions}
            onSearch={handleSearch}
            onSubmit={handleSubmit}
            onSelect={handleSelect}
          />
        </div>
        {weather && selectedLocation && (
          <>
            <CurrentWeather weather={weather} location={selectedLocation} />
            <DailyForecast weather={weather} />

            <HourlyForecast weather={weather} />
          </>
        )}
        {/* {weather && (
          <pre className="bg-muted p-4 rounded-md text-sm">
            {JSON.stringify(weather, null, 2)}
          </pre>
        )} */}
      </main>
    </>
  );
}
