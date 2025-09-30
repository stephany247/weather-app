import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import type { LocationData, WeatherData } from "@/lib/types";
import { fetchWeather } from "@/lib/weather";
import { fetchLocation, reverseGeocode } from "@/lib/geocoding";
import { CurrentWeather } from "@/components/CurrentWeather";
import { DailyForecast } from "@/components/DailyForecast";
import { HourlyForecast } from "@/components/HourlyForecast";
import { useUnits } from "@/store/useUnits";
import { Ban, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeatherLoading } from "@/store/useWeatherLoading";
import { useSelectedLocation } from "@/store/useSelectedLocation";
import { normalizeLocation } from "@/lib/location";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCompareStore } from "@/store/useCompare";
import { WeatherCompareTable } from "@/components/WeatherComparetable";

export default function IndexPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const { units } = useUnits();
  const [apiError, setApiError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { setWeatherLoading } = useWeatherLoading();
  const { selectedLocation, setSelectedLocation } = useSelectedLocation();
  const { comparisons } = useCompareStore();

  const handleSearch = async (query: string) => {
    setNoResults(false); // clear previous "no results"
    setApiError(null); // clear any previous server error

    if (!query || !query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    setIsSearching(true);
    try {
      const locations = await fetchLocation(query);
      if (!locations || locations.length === 0) {
        setSuggestions([]);
        // setWeather(null);
        // setSelectedLocation(null);
        setNoResults(true);
      } else {
        setSuggestions(locations || []);
        // setWeather(null);
        // setSelectedLocation(null);
        setNoResults(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setApiError(
        "We couldn’t connect to the server (API error). Please try again in a few moments."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelect = (location: any) => {
    const normalized = normalizeLocation(location);
    setSelectedLocation(normalized);
    // Autocomplete input with selected option
    setQuery(
      `${location.name}${location.admin1 ? `, ${location.admin1}` : ""}, ${
        location.country
      }`
    );
    setSuggestions([]); // hide dropdown
    setNoResults(false);
    setApiError(null);

    // setTimeout(() => setQuery(""), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let location = selectedLocation;

    // If no selectedLocation, try to fetch closest match
    if (!location && query.trim()) {
      try {
        const locations = await fetchLocation(query);
        if (locations.length > 0) {
          location = locations[0];
          // setQuery("");
          console.log("Locations:", location);
        } else {
          console.warn("No locations found for query:", query);
          setNoResults(true);
          return;
        }
      } catch (err) {
        console.error("Error fetching fallback location:", err);
        setApiError(
          "We couldn’t connect to the server (API error). Please try again in a few moments."
        );
        return;
      }
    }

    if (!location) return;

    try {
      setWeatherLoading(true); // start loading
      const weatherData = await fetchWeather(
        location.latitude,
        location.longitude,
        units
      );
      setWeather(weatherData);
      setSuggestions([]);
      setApiError(null);
      setNoResults(false);
      setQuery("");

      // ✅ blur input so it visually clears
      (document.activeElement as HTMLElement)?.blur();
    } catch (error) {
      console.error("Weather fetch failed:", error);
      setApiError(
        "We couldn’t connect to the server (API error). Please try again in a few moments."
      );
    } finally {
      setWeatherLoading(false); // stop loading
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
          setApiError(null);
        } catch (error) {
          console.error("Weather fetch failed:", error);
          setApiError(
            "We couldn’t connect to the server (API error). Please try again in a few moments."
          );
        }
      })();
    }
  }, [units, selectedLocation]);

  // Retry handler (used by Retry button)
  const handleRetry = async () => {
    setApiError(null);
    if (!selectedLocation) return;
    try {
      const weatherData = await fetchWeather(
        selectedLocation.latitude,
        selectedLocation.longitude,
        units
      );
      setWeather(weatherData);
    } catch (err) {
      console.error(err);
      setApiError(
        "We couldn’t connect to the server (API error). Please try again in a few moments."
      );
    }
  };

  // Auto-detect location on first visit
  useEffect(() => {
    if (!weather && navigator.geolocation) {
      setWeatherLoading(true); // show loading while fetching

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          try {
            // Reverse geocode to get a readable location
            const location = await reverseGeocode(latitude, longitude);
            const currentLocation = normalizeLocation({
              name: location.name,
              country: location.country,
              latitude,
              longitude,
            });

            setSelectedLocation(currentLocation);

            const weatherData = await fetchWeather(latitude, longitude, units);
            setWeather(weatherData);
            setApiError(null);
            setNoResults(false);
          } catch (err) {
            console.error("Geolocation fetch failed:", err);
            setApiError(
              "We couldn’t get your current location’s weather. Please search manually."
            );
          } finally {
            setWeatherLoading(false);
          }
        },
        (err) => {
          console.warn("Geolocation denied:", err);
          // gracefully fallback to manual search
        }
      );
    }
  }, [units, weather, setWeatherLoading]);

  return (
    <div className="p-4 pb-12 md:p-6 md:pb-20 ">
      <Header />
      {apiError ? (
        <main className="max-w-xl mx-auto flex flex-col items-center justify-center gap-6 rounded-lg text-center p-4">
          <Ban />
          <h1 className="text-5xl font-grotesque font-bold">
            Something went wrong
          </h1>
          <p className="font-medium text-muted-foreground">{apiError}</p>
          <Button variant="secondary" onClick={handleRetry}>
            <RefreshCcw /> Retry
          </Button>
        </main>
      ) : (
        <main className="space-y-12">
          <h1 className="font-grotesque text-[3.25rem]/tight text-center font-bold px-2 max-w-sm lg:max-w-none mx-auto">
            How's the sky looking today?
          </h1>

          <div className="relative w-full space-y-8">
            <SearchForm
              query={query}
              setQuery={setQuery}
              results={suggestions}
              onSearch={handleSearch}
              onSubmit={handleSubmit}
              onSelect={handleSelect}
              isSearching={isSearching}
            />
            {/* show inline "no results" message (not the full-page error) */}
            {noResults && (
              <p className="text-center font-bold text-2xl">
                No search result found!
              </p>
            )}
          </div>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="details" className="cursor-pointer">Current Location</TabsTrigger>
              <TabsTrigger value="compare" disabled={comparisons.length < 2} className="cursor-pointer">
                Compare
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              {weather && selectedLocation && (
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <CurrentWeather
                      weather={weather}
                      location={selectedLocation}
                    />
                    <DailyForecast weather={weather} />
                  </div>

                  <HourlyForecast weather={weather} />
                </div>
              )}
            </TabsContent>
            <TabsContent value="compare">
              <WeatherCompareTable />
            </TabsContent>
          </Tabs>
        </main>
      )}
    </div>
  );
}
