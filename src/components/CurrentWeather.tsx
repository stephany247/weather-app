import type { LocationData, WeatherData } from "@/lib/types";
import { WeatherIcon } from "./WeatherIcon";
// import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherProps {
  weather: WeatherData;
  location: LocationData;
}

export const CurrentWeather = ({ weather, location }: CurrentWeatherProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex justify-between items-center rounded-2xl p-6 text-white bg-[url(/bg-today-small.svg)] md:bg-[url(/bg-today-large.svg)] bg-cover bg-no-repeat">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">
          {location.name}, {location.country}
        </h2>
        <p className="text-sm text-muted-foreground">{currentDate}</p>
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <WeatherIcon
          code={weather.current.weather_code} 
          className="w-16 h-16 text-yellow-400" 
        />
        <div className="text-6xl font-light">
          {Math.round(weather.current.temperature_2m)}°
        </div>
      </div>
    </div>
  );
};