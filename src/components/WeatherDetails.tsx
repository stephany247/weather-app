import type { WeatherData } from "@/lib/types";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const details = [
    {
      label: "Feels Like",
      value: `${Math.round(weather.current.apparent_temperature)}°`
    },
    {
      label: "Humidity",
      value: `${Math.round(weather.current.relative_humidity_2m)}%`
    },
    {
      label: "Wind",
      value: `${Math.round(weather.current.wind_speed_10m)} mph`
    },
    {
      label: "Precipitation",
      value: `${weather.current.precipitation} in`
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {details.map((detail, index) => (
        <div key={index} className="glass-card rounded-xl p-4 text-white">
          <div className="text-muted-foreground mb-1">
            {detail.label}
          </div>
          <div className="text-3xl">
            {detail.value}
          </div>
        </div>
      ))}
    </div>
  );
};