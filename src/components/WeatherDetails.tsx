import type { WeatherData } from "@/lib/types";
import { useUnits } from "@/store/useUnits";
import { useWeatherLoading } from "@/store/useWeatherLoading";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const { units } = useUnits();
  const { isWeatherLoading } = useWeatherLoading();

  const windUnit = units.wind === "kmh" ? "km/h" : "mph";
  const precipUnit = units.precip === "mm" ? "mm" : "in";

  const details = [
    {
      label: "Feels Like",
      value: `${Math.round(weather.current.apparent_temperature)}°`,
    },
    {
      label: "Humidity",
      value: `${Math.round(weather.current.relative_humidity_2m)}%`,
    },
    {
      label: "Wind",
      value: `${Math.round(weather.current.wind_speed_10m)} ${windUnit}`,
    },
    {
      label: "Precipitation",
      value: `${weather.current.precipitation} ${precipUnit}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
      {details.map((detail, index) => (
        <div
          key={index}
          className={`glass-card rounded-xl p-4 space-y-4 ${
            isWeatherLoading ? "animate-pulse" : ""
          }`}
        >
          <p className="text-muted-foreground">{detail.label}</p>
          <h3 className="text-3xl font-light">
            {isWeatherLoading ? "–" : detail.value}
          </h3>
        </div>
      ))}
    </div>
  );
};
