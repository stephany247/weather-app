import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Wind, ThermometerSun, CloudRain } from "lucide-react";

interface WeatherCardProps {
  title: string;
  icon?: React.ReactNode;
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  precipitation: number;
  units: "metric" | "imperial";
}

export default function WeatherCard({
  title,
  icon = <Cloud className="w-12 h-12 text-blue-500" />,
  temperature,
  feelsLike,
  humidity,
  wind,
  precipitation,
  units,
}: WeatherCardProps) {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "mph";
  const precipUnit = units === "metric" ? "mm" : "in";
  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-semibold text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {/* Weather Icon + Temp */}
        <div className="flex flex-col items-center">
          {icon}
          <p className="text-5xl font-bold">
            {temperature}
            {tempUnit}
          </p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 text-sm w-full">
          <div className="flex items-center gap-2">
            <ThermometerSun className="w-4 h-4 text-orange-500" />
            <span>Feels Like: {feelsLike}°</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span>Humidity: {humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-500" />
            <span>
              Wind: {wind} {windUnit}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-indigo-500" />
            <span>
              Precip: {precipitation} {precipUnit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
