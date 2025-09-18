export type Units = {
  system: "metric" | "imperial";
  temp: "c" | "f";
  wind: "kmh" | "mph";
  precip: "mm" | "in";
};

export const metricDefaults: Units = {
  system: "metric",
  temp: "c",
  wind: "kmh",
  precip: "mm",
};

export const imperialDefaults: Units = {
  system: "imperial",
  temp: "f",
  wind: "mph",
  precip: "in",
};
