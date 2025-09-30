import type { WeatherData } from "@/lib/types";
import { useUnits } from "@/store/useUnits";
import { useWeatherLoading } from "@/store/useWeatherLoading";
import { getWeatherDetails } from "./WeatherMetrics";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const { units } = useUnits();
  const { isWeatherLoading } = useWeatherLoading();

  const details = getWeatherDetails(weather, units);
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
