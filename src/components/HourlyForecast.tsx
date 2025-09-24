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

interface HourlyForecastProps {
  weather: WeatherData;
}

export const HourlyForecast = ({ weather }: HourlyForecastProps) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const { isWeatherLoading } = useWeatherLoading();

  const currentHour = new Date().getHours();

  const getHourDisplay = (timeString: string) => {
    const date = new Date(timeString);
    const hour = date.getHours();
    return hour === 0
      ? "12 AM"
      : hour === 12
      ? "12 PM"
      : hour > 12
      ? `${hour - 12} PM`
      : `${hour} AM`;
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

  // Show next 8 hours
  //   const upcomingHours = weather.hourly.time.slice(currentHour, currentHour + 8);
  //   const upcomingTemps = weather.hourly.temperature_2m.slice(
  //     currentHour,
  //     currentHour + 8
  //   );
  //   const upcomingCodes = weather.hourly.weather_code.slice(
  //     currentHour,
  //     currentHour + 8
  //   );

  const dayKeys = Object.keys(groupedByDay); // ["Friday, Sep 19", "Saturday, Sep 20", ...]
  const currentDayKey = dayKeys[selectedDay];
  const hoursForDay = groupedByDay[currentDayKey];

  return (
    <section className="glass-card rounded-xl p-4 space-y-4 h-fit">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Hourly forecast</h3>

        <Select
          value={String(selectedDay)}
          onValueChange={(value) => setSelectedDay(Number(value))}
        >
          <SelectTrigger className="w-fit bg-transparent text-sm text-white">
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
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
        <div className="space-y-3">
          {hoursForDay?.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center justify-between text-white bg-card p-2.5 pl-3 pr-4 rounded-lg ${
                isWeatherLoading ? "animate-pulse" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <WeatherIcon
                  code={entry.code}
                  className={`w-10 h-10 text-yellow-400 ${
                    isWeatherLoading ? "invisible" : ""
                  }`}
                />
                <span
                  className={`text-lg font-semibold ${
                    isWeatherLoading ? "invisible" : ""
                  }`}
                >
                  {getHourDisplay(entry.time)}
                </span>
              </div>
              <span
                className={`text-base font-medium ${
                  isWeatherLoading ? "invisible" : ""
                }`}
              >
                {Math.round(entry.temp)}°
              </span>
            </div>
          ))}
        </div>
      <ScrollBar orientation="vertical" />
      </ScrollArea>
    </section>
  );
};
