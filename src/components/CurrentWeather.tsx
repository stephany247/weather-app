import type { LocationData, WeatherData } from "@/lib/types";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherDetails } from "./WeatherDetails";
import { useWeatherLoading } from "@/store/useWeatherLoading";
import DotsLoader from "./DotsLoader";
// import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherProps {
  weather: WeatherData;
  location: LocationData;
}

export const CurrentWeather = ({ weather, location }: CurrentWeatherProps) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const { isWeatherLoading } = useWeatherLoading();

  // if (isWeatherLoading) {
  //   return (
  //     <div className="animate-pulse rounded-xl bg-muted p-6 h-60 flex flex-col items-center justify-center gap-2">
  //       <DotsLoader />
  //       <p className="text-muted-foreground text-lg font-medium">Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <section className="space-y-5">
      {isWeatherLoading ? (
        <div className="animate-pulse rounded-xl bg-muted p-10 h-60 flex flex-col items-center justify-center gap-2">
          <DotsLoader />
          <p className="text-muted-foreground text-lg font-medium">
            Loading...
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center md:justify-between items-center gap-4 rounded-3xl px-6 py-10 text-white bg-[url(/bg-today-small.svg)] md:bg-[url(/bg-today-large.svg)] bg-cover bg-no-repeat">
          <div className="text-center leading-[1.2] space-y-2">
            <h2 className="text-3xl font-bold">
              {location.name}, {location.country}
            </h2>
            <p className="text-lg">{currentDate}</p>
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
