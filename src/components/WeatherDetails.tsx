import type { WeatherData } from "@/lib/types";
import { useUnits } from "@/store/useUnits";
import { useWeatherLoading } from "@/store/useWeatherLoading";
import { getWeatherDetails } from "./WeatherMetrics";
import { useState } from "react";
import { Button } from "./ui/button";
import { WeatherCard } from "./WeatherCard";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const { units } = useUnits();
  const { isWeatherLoading } = useWeatherLoading();
  const [showMore, setShowMore] = useState(false);

  const details = getWeatherDetails(weather, units);
  const baseDetails = details.slice(0, 4);
  const extraDetails = details.slice(4);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {baseDetails.map((detail) => (
          <WeatherCard
            label={detail.label}
            value={detail.value}
            icon={detail.icon}
            isLoading={isWeatherLoading}
          />
        ))}
      </div>

      <Button
        onClick={() => setShowMore((prev) => !prev)}
        className="mt-4 text-sm w-full col-span-2"
      >
        {showMore ? "Hide details" : "Show more details"}
      </Button>

      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6 transition-all duration-300 ease-out overflow-hidden ${
          showMore ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {extraDetails.map((detail) => (
          <WeatherCard
            label={detail.label}
            value={detail.value}
            icon={detail.icon}
            isLoading={isWeatherLoading}
          />
        ))}
      </div>
    </>
  );
};
