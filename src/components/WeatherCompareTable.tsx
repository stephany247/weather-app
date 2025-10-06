import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCompareStore } from "@/store/useCompare";
import { useUnits } from "@/store/useUnits";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import type { WeatherData } from "@/lib/types";
import { fetchWeather } from "@/lib/weather";
import { getWeatherDetails } from "./WeatherMetrics";
import { Trash2 } from "lucide-react";

export const WeatherCompareTable = () => {
  const { comparisons, removeComparison } = useCompareStore();
  const { units } = useUnits();
  const [weatherMap, setWeatherMap] = useState<Record<string, WeatherData>>({});

  useEffect(() => {
    comparisons.forEach((loc) => {
      const key = `${loc.latitude},${loc.longitude}`;
      //   if (!weatherMap[key]) {
      fetchWeather(loc.latitude, loc.longitude, units)
        .then((data) => {
          setWeatherMap((prev) => ({ ...prev, [key]: data }));
        })
        .catch((err) => console.error("Weather fetch failed", err));
      //   }
    });
  }, [comparisons, units]);

  if (comparisons.length < 2) {
    return (
      <p
        className="text-muted-foreground text-2xl
      "
      >
        Add 2–5 locations to compare.
      </p>
    );
  }

  // Pick first location’s weather for row labels
  const firstKey = `${comparisons[0].latitude},${comparisons[0].longitude}`;
  const baseWeather = weatherMap[firstKey];
  const baseDetails = baseWeather ? getWeatherDetails(baseWeather, units) : [];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="text-base font-semibold">
            <TableHead>Metric</TableHead>
            {comparisons.map((loc, i) => (
              <TableHead key={i}>
                <div className="flex items-center">
                  {loc.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      removeComparison(loc.latitude, loc.longitude)
                    }
                    className="ml-1 text-red-500 hover:text-red-500/80 p-0 size-6 cursor-pointer"
                  >
                    <Trash2 className="h-1 w-1" />
                  </Button>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Actual Temperature */}
          <TableRow>
            <TableCell className="font-semibold">Temperature</TableCell>
            {comparisons.map((loc, i) => (
              <TableCell key={i}>
                {Math.round(
                  weatherMap[`${loc.latitude},${loc.longitude}`]?.current
                    ?.temperature_2m
                )}
                °
              </TableCell>
            ))}
          </TableRow>
          {baseDetails.map((detail, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell className="font-semibold">{detail.label}</TableCell>
              {comparisons.map((loc, colIndex) => {
                const key = `${loc.latitude},${loc.longitude}`;
                const details = weatherMap[key]
                  ? getWeatherDetails(weatherMap[key], units)
                  : [];
                return (
                  <TableCell key={colIndex}>
                    {details[rowIndex]?.value ?? "…"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
