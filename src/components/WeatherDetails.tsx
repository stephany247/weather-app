import type { WeatherData } from "@/lib/types";
import { useUnits } from "@/store/useUnits";
import { useWeatherLoading } from "@/store/useWeatherLoading";
import { Sunrise, Sunset } from "lucide-react";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const { units } = useUnits();
  const { isWeatherLoading } = useWeatherLoading();

  const windUnit = units.wind === "kmh" ? "km/h" : "mph";
  const precipUnit = units.precip === "mm" ? "mm" : "in";

  const now = new Date();

  // round current time down to nearest 15 minutes
  const roundedNow = new Date(now);
  roundedNow.setMinutes(Math.floor(now.getMinutes() / 15) * 15, 0, 0);

  const currentIndex = weather.minutely_15.time.findIndex((t) => {
    const date = new Date(t);
    return (
      date.getUTCHours() === roundedNow.getUTCHours() &&
      date.getUTCMinutes() === roundedNow.getUTCMinutes() &&
      date.getUTCDate() === roundedNow.getUTCDate()
    );
  });

  const uvIndex =
    currentIndex !== -1 && weather.minutely_15.uv_index
      ? weather.minutely_15.uv_index[currentIndex]
      : null;

  const visibility =
    currentIndex !== -1 && weather.minutely_15.visibility
      ? weather.minutely_15.visibility[currentIndex]
      : null;

  const pressure =
    currentIndex !== -1 && weather.minutely_15.pressure_msl
      ? weather.minutely_15.pressure_msl[currentIndex]
      : null;

  const todayIndex = 0; // first day (today)
  const sunrise = weather.daily.sunrise?.[todayIndex];
  const sunset = weather.daily.sunset?.[todayIndex];

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
    {
      label: "UV Index",
      value: uvIndex != null ? `${uvIndex}` : "–",
    },
    {
      label: "Pressure",
      value: pressure != null ? `${Math.round(pressure)} hPa` : "–",
    },
    {
      label: "Visibility",
      value:
        visibility != null
          ? units.temp === "c"
            ? `${visibility} m`
            : `${(visibility / 1609).toFixed(1)} mi`
          : "–",
    },
    {
      label: "Sunrise",
      value: sunrise
        ? new Date(sunrise).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "–",
      icon: <Sunrise className="w-5 h-5 text-yellow-500" />,
    },
    {
      label: "Sunset",
      value: sunset
        ? new Date(sunset).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "–",
      icon: <Sunset className="w-5 h-5 text-orange-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
      {details.map((detail, index) => (
        <div
          key={index}
          className={`glass-card rounded-xl p-4 space-y-4 flex flex-col justify-between ${
            isWeatherLoading ? "animate-pulse" : ""
          }`}
        >
          <p className="text-muted-foreground">{detail.label}</p>
          <p>{detail.icon}</p>
          <h3 className="text-3xl font-light">
            {isWeatherLoading ? "–" : detail.value}
          </h3>
        </div>
      ))}
    </div>
  );
};
