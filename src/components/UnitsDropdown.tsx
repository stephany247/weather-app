import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, Settings } from "lucide-react";
import { imperialDefaults, metricDefaults, type Units } from "@/lib/units";

export function UnitDropdown() {
  const [units, setUnits] = useState(metricDefaults);

  const setSystem = (system: "metric" | "imperial") => {
    setUnits(system === "metric" ? metricDefaults : imperialDefaults);
  };

  const setUnit = (key: keyof Omit<Units, "system">, value: any) => {
    setUnits((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button variant="outline"> <Settings /> Units</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* System */}
        <DropdownMenuLabel>System</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setSystem("metric")}>
          Metric{" "}
          {units.system === "metric" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSystem("imperial")}>
          Imperial{" "}
          {units.system === "imperial" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Temperature */}
        <DropdownMenuLabel className="text-sm">Temperature</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setUnit("temp", "c")}>
          Celsius (°C){" "}
          {units.temp === "c" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUnit("temp", "f")}>
          Fahrenheit (°F){" "}
          {units.temp === "f" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Wind Speed */}
        <DropdownMenuLabel className="text-sm">Wind Speed</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setUnit("wind", "kmh")}>
          km/h {units.wind === "kmh" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUnit("wind", "mph")}>
          mph {units.wind === "mph" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Precipitation */}
        <DropdownMenuLabel className="text-sm">Precipitation</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setUnit("precip", "mm")}>
          Millimeters (mm){" "}
          {units.precip === "mm" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUnit("precip", "in")}>
          Inches (in){" "}
          {units.precip === "in" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
