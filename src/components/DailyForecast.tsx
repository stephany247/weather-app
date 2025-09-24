import type { WeatherData } from "@/lib/types";
import { WeatherIcon } from "./WeatherIcon";
import { useWeatherLoading } from "@/store/useWeatherLoading";

interface DailyForecastProps {
  weather: WeatherData;
}

export const DailyForecast = ({ weather }: DailyForecastProps) => {
  const today = new Date();
  const { isWeatherLoading } = useWeatherLoading();

  const getDayName = (dateString: string, index: number) => {
    if (index === 0) return "Today";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Daily forecast</h3>

      <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
        {weather.daily.time.slice(0, 7).map((date, index) => (
          <div
            key={index}
            className={`glass-card rounded-xl p-3 text-center text-white space-y-3 ${
              isWeatherLoading ? "animate-pulse" : ""
            }`}
          >
            <div className={`text-lg font-medium ${isWeatherLoading ? "invisible" : ""}`}>
              {getDayName(date, index)}
            </div>
            <div className={`flex justify-center ${isWeatherLoading ? "invisible" : ""}`}>
              <WeatherIcon
                code={weather.daily.weather_code[index]}
                className="w-15 h-15"
              />
            </div>
            <div className={`flex justify-between items-center font-medium ${isWeatherLoading ? "invisible" : ""}`}>
              <div className="">
                {Math.round(weather.daily.temperature_2m_max[index])}°
              </div>
              <div className="text-muted-foreground">
                {Math.round(weather.daily.temperature_2m_min[index])}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
