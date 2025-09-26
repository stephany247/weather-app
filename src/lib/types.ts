export interface LocationData {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  admin1?: string;
}

export interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    precipitation: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

export interface FavoriteLocation extends LocationData {
  id: string; // unique identifier
}
