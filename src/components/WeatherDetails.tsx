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
    <div className="grid grid-cols-2 gap-4">
      {details.map((detail, index) => (
        <div key={index} className="glass-card rounded-xl p-4 space-y-4">
          <p className="text-muted-foreground">
            {detail.label}
          </p>
          <h3 className="text-3xl font-light">
            {detail.value}
          </h3>
        </div>
      ))}
    </div>
  );
};