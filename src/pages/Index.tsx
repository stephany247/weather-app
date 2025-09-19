import { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import type { WeatherData } from "@/lib/types";
import { fetchWeather } from "@/lib/weather";
import { fetchLocation } from "@/lib/geocoding";

export default function IndexPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [locations, setLocations] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const found = await fetchLocation(query);
      setLocations(found);

      if (found.length > 0) {
        const first = found[0];
        const weatherData = await fetchWeather(first.latitude, first.longitude);
        setWeather(weatherData);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <Header />
      <main className="space-y-8">
        <h1 className="font-grotesque text-4xl">
          How's the sky looking today?
        </h1>

        <SearchForm onSearch={handleSearch} />

        {locations.length > 0 && (
          <pre className="bg-muted p-4 rounded-md text-sm">
            {JSON.stringify(locations, null, 2)}
          </pre>
        )}
        {weather && (
          <pre className="bg-muted p-4 rounded-md text-sm">
            {JSON.stringify(weather, null, 2)}
          </pre>
        )}
      </main>
    </>
  );
}
