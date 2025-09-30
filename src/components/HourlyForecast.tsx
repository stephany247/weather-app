import type { WeatherData } from "@/lib/types";
import { WeatherIcon } from "./WeatherIcon";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWeatherLoading } from "@/store/useWeatherLoading";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Sunrise, Sunset } from "lucide-react";

interface HourlyForecastProps {
  weather: WeatherData;
}

interface HourEntry {
  time: string;
  temp?: number;
  code?: number;
  special?: "sunrise" | "sunset";
}

export const HourlyForecast = ({ weather }: HourlyForecastProps) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const { isWeatherLoading } = useWeatherLoading();

  const getHourDisplay = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "numeric" });
  };

  // Group hourly data by day
  const groupedByDay: {
    [key: string]: { time: string; temp: number; code: number }[];
  } = {};

  weather.hourly.time.forEach((time, i) => {
    const date = new Date(time);
    const dayKey = date.toLocaleDateString("en-US", {
      weekday: "long",
      // month: "short",
      // day: "numeric",
    });

    if (!groupedByDay[dayKey]) {
      groupedByDay[dayKey] = [];
    }

    groupedByDay[dayKey].push({
      time: time,
      temp: weather.hourly.temperature_2m[i],
      code: weather.hourly.weather_code[i],
    });
  });

  const dayKeys = Object.keys(groupedByDay); // ["Friday, Sep 19", "Saturday, Sep 20", ...]
  const currentDayKey = dayKeys[selectedDay];
  const hoursForDay = groupedByDay[currentDayKey];

  const todayIndex = selectedDay; // or 0 if always using current day
  const sunrise = weather.daily.sunrise?.[todayIndex];
  const sunset = weather.daily.sunset?.[todayIndex];

  const augmentedHours: HourEntry[] = [];

  hoursForDay.forEach((entry, i) => {
    const entryTime = new Date(entry.time).getTime();

    if (sunrise) {
      const sunriseTime = new Date(sunrise).getTime();
      if (
        sunriseTime >= entryTime &&
        sunriseTime < entryTime + 60 * 60 * 1000
      ) {
        augmentedHours.push({ time: sunrise, special: "sunrise" });
      }
    }

    if (sunset) {
      const sunsetTime = new Date(sunset).getTime();
      if (sunsetTime >= entryTime && sunsetTime < entryTime + 60 * 60 * 1000) {
        augmentedHours.push({ time: sunset, special: "sunset" });
      }
    }

    augmentedHours.push(entry);
  });

  return (
    <section className="glass-card rounded-xl py-4 space-y-4 h-fit">
      <div className="flex items-center justify-between px-4">
        <h3 className="text-xl font-semibold text-white">Hourly forecast</h3>

        <Select
          value={String(selectedDay)}
          onValueChange={(value) => setSelectedDay(Number(value))}
        >
          <SelectTrigger className="w-fit bg-transparent text-sm text-white">
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent className="w-52" align="end">
            {dayKeys.map((day, index) => (
              <SelectItem key={day} value={String(index)}>
                {isWeatherLoading ? "-" : day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* <div className={`glass-card rounded-xl p-4 space-y-3 h-full overflow-y-auto`}> */}
      <ScrollArea className="h-100 rounded-lg">
        <div className="space-y-3 mx-4">
          {augmentedHours?.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center justify-between text-white bg-card p-2.5 pl-3 pr-4 rounded-lg ${
                isWeatherLoading ? "animate-pulse" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                {entry.special ? (
                  entry.special === "sunrise" ? (
                    <Sunrise className="w-8 h-8 ml-2 p-0.5 text-yellow-400" />
                  ) : (
                    <Sunset className="w-8 h-8 ml-2 p-0.5 text-orange-500" />
                  )
                ) : (
                  <WeatherIcon
                    code={entry.code!}
                    className="w-10 h-10 text-yellow-400"
                  />
                )}
                <span
                  className={`text-lg font-semibold ${
                    isWeatherLoading ? "invisible" : ""
                  }`}
                >
                  {entry.special
                    ? new Date(entry.time).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : getHourDisplay(entry.time)}
                </span>
              </div>
              <span
                className={`text-base font-medium capitalize ${
                  isWeatherLoading ? "invisible" : ""
                }`}
              >
                {entry.temp !== undefined
                  ? Math.round(entry.temp) + "°"
                  : `${entry.special}`}
              </span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </section>
  );
};
