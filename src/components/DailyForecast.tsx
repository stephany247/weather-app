
import type { WeatherData } from "@/lib/types";
import { WeatherIcon } from "./WeatherIcon";

interface DailyForecastProps {
  weather: WeatherData;
}

export const DailyForecast = ({ weather }: DailyForecastProps) => {
  const today = new Date();
  
  const getDayName = (dateString: string, index: number) => {
    if (index === 0) return "Today";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Daily forecast</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {weather.daily.time.slice(0, 7).map((date, index) => (
          <div key={index} className="glass-card rounded-xl p-4 text-center text-white">
            <div className="text-sm font-medium mb-3">
              {getDayName(date, index)}
            </div>
            <div className="flex justify-center mb-3">
              <WeatherIcon 
                code={weather.daily.weather_code[index]} 
                className="w-8 h-8 text-yellow-400" 
              />
            </div>
            <div className="flex justify-between items-center gap-1">
              <div className="text-lg font-semibold">
                {Math.round(weather.daily.temperature_2m_max[index])}°
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round(weather.daily.temperature_2m_min[index])}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};