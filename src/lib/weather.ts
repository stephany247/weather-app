import type { WeatherData } from "./types";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code",
    hourly: "temperature_2m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    timezone: "auto",
  });

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch weather data");

  const data = await res.json();

  const weather: WeatherData = {
    current: {
      time: data.current.time,
      temperature_2m: data.current.temperature_2m,
      relative_humidity_2m: data.current.relative_humidity_2m,
      apparent_temperature: data.current.apparent_temperature,
      wind_speed_10m: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
      weather_code: data.current.weather_code,
    },
    hourly: {
      time: data.hourly.time,
      temperature_2m: data.hourly.temperature_2m,
      weather_code: data.hourly.weather_code,
    },
    daily: {
      time: data.daily.time,
      temperature_2m_max: data.daily.temperature_2m_max,
      temperature_2m_min: data.daily.temperature_2m_min,
      weather_code: data.daily.weather_code,
    },
  };

  return weather;
}
