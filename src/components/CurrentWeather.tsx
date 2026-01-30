import type { LocationData, WeatherData } from "@/lib/types";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherDetails } from "./WeatherDetails";
import { useWeatherLoading } from "@/store/useWeatherLoading";
import DotsLoader from "./DotsLoader";
import { useFavorites } from "@/store/useFavorites";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { CompareButton } from "./CompareButton";
// import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherProps {
  weather: WeatherData | null;
  location: LocationData | null;
}

export const CurrentWeather = ({ weather, location }: CurrentWeatherProps) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const { isWeatherLoading } = useWeatherLoading();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!weather || isWeatherLoading || !location) {
    return (
      <section className="space-y-5">
        <div className="animate-pulse rounded-xl bg-muted p-10 h-60 flex flex-col items-center justify-center gap-2">
          <DotsLoader />
          <p className="text-muted-foreground text-lg font-medium text-center">
            Loading...
          </p>
        </div>
      </section>
    );
  }
  const favorite = isFavorite(location.id);

  return (
    <section className="space-y-5">
      {isWeatherLoading ? (
        <div className="animate-pulse rounded-xl bg-muted p-10 h-60 flex flex-col items-center justify-center gap-2">
          <DotsLoader />
          <p className="text-muted-foreground text-lg font-medium text-center">
            Loading...
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 rounded-3xl px-6 py-10 md:h-72 text-white bg-[url(/blue-sky-with-clouds.jpg)] dark:bg-[url(/bg-today-small.svg)] dark:md:bg-[url(/bg-today-large.svg)] bg-cover bg-no-repeat bg-top dark:bg-center">
          <div className="text-center md:text-left leading-[1.2] flex flex-col items-center md:items-start gap-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">
                {location.name}, {location.country}
              </h2>
              <p className="text-lg">{currentDate}</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              {favorite ? (
                <button
                  onClick={() => removeFavorite(location.id)}
                  className="flex items-center gap-1 text-yellow-500 cursor-pointer"
                >
                  <BookmarkCheck size={20} /> Saved location
                </button>
              ) : (
                <button
                  onClick={() => addFavorite(location)}
                  className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 cursor-pointer"
                >
                  <Bookmark size={20} /> Save&nbsp;location
                </button>
              )}
              <CompareButton location={location} />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <WeatherIcon
              code={weather.current.weather_code}
              className="w-30 h-30 text-yellow-400"
            />
            <div className="text-8xl font-semibold italic">
              {Math.round(weather.current.temperature_2m)}°
            </div>
          </div>
        </div>
      )}
      <WeatherDetails weather={weather} />
    </section>
  );
};
