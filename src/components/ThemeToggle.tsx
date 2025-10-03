import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useWeatherStore } from "@/lib/useWeather";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { weather } = useWeatherStore();
  const [manualOverride, setManualOverride] = useState(false);

  // Auto-apply weather theme unless manually overridden
  useEffect(() => {
    if (weather?.current?.is_day === undefined) return;
    if (manualOverride) return;

    const defaultTheme = weather.current.is_day === 1 ? "light" : "dark";
    setTheme(defaultTheme);
  }, [weather, setTheme, manualOverride]);

  // Manual toggle
  const toggleTheme = () => {
    setManualOverride(true);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
