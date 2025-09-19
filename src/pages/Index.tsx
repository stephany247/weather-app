import { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import type { LocationData, WeatherData } from "@/lib/types";
import { fetchWeather } from "@/lib/weather";
import { fetchLocation } from "@/lib/geocoding";
import SearchResults from "@/components/SearchResults";

export default function IndexPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

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

    if (!selectedLocation) return;

    try {
      const weatherData = await fetchWeather(
        selectedLocation.latitude,
        selectedLocation.longitude
      );
      setWeather(weatherData);
    } catch (err) {
      console.error("Weather fetch failed:", err);
    }
  };

  return (
    <>
      <Header />
      <main className="space-y-8 max-w-xl mx-auto">
        <h1 className="font-grotesque text-4xl">
          How's the sky looking today?
        </h1>

        <div className="relative w-full">
          <SearchForm
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            onSubmit={handleSubmit}
          />
          <SearchResults results={suggestions} onSelect={handleSelect} query={query} />
        </div>
        <h2>Hello</h2>
        {weather && (
          <pre className="bg-muted p-4 rounded-md text-sm">
            {JSON.stringify(weather, null, 2)}
          </pre>
        )}
      </main>
    </>
  );
}
