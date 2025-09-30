// lib/getWeatherDetails.ts
import type { WeatherData } from "@/lib/types";
import type { Units } from "@/lib/units";
import { Sunrise, Sunset } from "lucide-react";

export function getWeatherDetails(weather: WeatherData, units: Units) {
  const windUnit = units.wind === "kmh" ? "km/h" : "mph";
  const precipUnit = units.precip === "mm" ? "mm" : "in";

  const now = new Date();
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

  const todayIndex = 0;
  const sunrise = weather.daily.sunrise?.[todayIndex];
  const sunset = weather.daily.sunset?.[todayIndex];

  return [
    { label: "Feels Like", value: `${Math.round(weather.current.apparent_temperature)}°` },
    { label: "Humidity", value: `${Math.round(weather.current.relative_humidity_2m)}%` },
    { label: "Wind", value: `${Math.round(weather.current.wind_speed_10m)} ${windUnit}` },
    { label: "Precipitation", value: `${weather.current.precipitation} ${precipUnit}` },
    { label: "UV Index", value: uvIndex != null ? `${uvIndex}` : "–" },
    { label: "Pressure", value: pressure != null ? `${Math.round(pressure)} hPa` : "–" },
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
        ? new Date(sunrise).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "–",
      icon: <Sunrise className="w-5 h-5 text-yellow-500" />,
    },
    {
      label: "Sunset",
      value: sunset
        ? new Date(sunset).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "–",
      icon: <Sunset className="w-5 h-5 text-orange-600" />,
    },
  ];
}
