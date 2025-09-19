import { useState } from "react";
// import "./App.css";
import logo from "@/assets/images/logo.svg";
import { Button } from "./components/ui/button";
import { UnitDropdown } from "./components/UnitsDropdown";
import { Search } from "lucide-react";
import { Input } from "./components/ui/input";
import { fetchLocation } from "./lib/geocoding";
import type { WeatherData } from "./lib/types";
import { fetchWeather } from "./lib/weather";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query) return;

    try {
      const location = await fetchLocation(query);
      setResult(location);
      console.log("Location result:", location);

      if (location.length > 0) {
        const firstLocation = location[0];
        const weatherData = await fetchWeather(
          firstLocation.latitude,
          firstLocation.longitude
        );
        setWeather(weatherData);
        console.log("Weather data:", weatherData);
      }
    } catch (err) {
      console.error("Error fetching location:", err);
    }
    if (!location) {
      console.log("City not found");
      return;
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="App logo" />
        </div>

        <UnitDropdown />
      </header>
      <main className="space-y-8">
        <h1 className="font-grotesque text-4xl">
          How's the sky looking today?
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2 w-full"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for a place..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" variant="default" className="w-full">
            Submit
          </Button>
        </form>
        {/* TEMP: Show raw result */}
        {result && (
          <pre className="bg-muted p-4 rounded-md text-sm w-full overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
        {weather && (
          <pre className="bg-muted p-4 rounded-md text-sm w-full overflow-auto">
            {JSON.stringify(weather, null, 2)}
          </pre>
        )}
      </main>
    </>
  );
}

export default App;
