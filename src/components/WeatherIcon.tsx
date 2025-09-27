import { CloudRain, CloudSnow, Sun } from "lucide-react";
import sunny from "@/assets/images/icon-sunny.webp";
import stormy from "@/assets/images/icon-storm.webp";
import snowy from "@/assets/images/icon-snow.webp";
import rainy from "@/assets/images/icon-rain.webp";
import cloudy from "@/assets/images/icon-rain.webp";
import overcast from "@/assets/images/icon-overcast.webp";
import foggy from "@/assets/images/icon-fog.webp";
import drizzle from "@/assets/images/icon-drizzle.webp";

interface WeatherIconProps {
  code: number;
  className?: string;
}

export const WeatherIcon = ({
  code,
  className = "w-6 h-6",
}: WeatherIconProps) => {
  const getIcon = (weatherCode: number) => {
    // WMO Weather interpretation codes
    if (weatherCode === 0) return sunny;
    if (weatherCode <= 3) return cloudy;
    if (weatherCode <= 48) return foggy; // Fog
    if (weatherCode <= 57) return drizzle; // Drizzle
    if (weatherCode <= 67) return rainy; // Rain
    if (weatherCode <= 77) return snowy; // Snow
    // if (weatherCode <= 82) return <CloudRain className={className} />; // Rain showers
    if (weatherCode <= 86) return overcast; // Snow showers
    if (weatherCode <= 99) return stormy; // Thunderstorm

    return sunny;
  };

  //   return getIcon(code);
  const icon = getIcon(code);

//   return icon ? (
   return <img src={icon} alt="Weather icon" className={className} />
//   ) : (
//     <Sun className={className} /> // fallback to lucide sun
//   );
};
