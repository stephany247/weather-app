import axios from "axios";
import type { WeatherData } from "./types";
import type { Units } from "./units";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(
  lat: number,
  lon: number,
  units: Units
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code",
    hourly: "temperature_2m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset",
    timezone: "auto",
    temperature_unit: units.temp === "c" ? "celsius" : "fahrenheit",
    windspeed_unit: units.wind,
    precipitation_unit: units.precip === "mm" ? "mm" : "inch",
    minutely_15: "uv_index,pressure_msl,visibility",
    visibility_unit: "meter",
  });

  try {
    const { data } = await axios.get(BASE_URL, { params });

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
        sunrise: data.daily.sunrise,
        sunset: data.daily.sunset,
      },
      minutely_15: {
        time: data.minutely_15.time,
        uv_index: data.minutely_15.uv_index,
        pressure_msl: data.minutely_15.pressure_msl,
        visibility: data.minutely_15.visibility,
      },
    };

    return weather;
  } catch (error) {
    console.error("Failed to fetch weather data", error);
    throw error;
  }
}
