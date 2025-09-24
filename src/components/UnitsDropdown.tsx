import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Settings } from "lucide-react";
import { imperialDefaults, metricDefaults, type Units } from "@/lib/units";
import { useUnits } from "@/store/useUnits";

// interface UnitDropdownProps {
//   units: Units;
//   onChange: (units: Units) => void;
// }

export function UnitDropdown() {
  const { units, setUnits } = useUnits();

  const setSystem = () => {
    const newUnits =
      units.system === "metric" ? imperialDefaults : metricDefaults;

    setUnits(newUnits);
    // onChange(newUnits); // optional callback to notify parent
  };

  const setUnit = (key: keyof Omit<Units, "system">, value: any) => {
    // setUnits((prev) => ({ ...prev, [key]: value }));
    setUnits({ ...units, [key]: value });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {" "}
          <Settings /> Units <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" sideOffset={10}>
        {/* System */}
        <Button
          variant="ghost"
          onClick={setSystem}
          className="w-full justify-start px-2"
        >
          {units.system === "metric"
            ? "Switch to Imperial"
            : "Switch to Metric"}
        </Button>
        {/* <DropdownMenuLabel>System</DropdownMenuLabel> */}
        {/* <DropdownMenuItem onClick={() => setSystem("metric")}>
          Metric{" "}
          {units.system === "metric" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSystem("imperial")}>
          Imperial{" "}
          {units.system === "imperial" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem> */}

        {/* <DropdownMenuSeparator /> */}

        {/* Temperature */}
        <DropdownMenuLabel className="text-sm text-muted-foreground">
          Temperature
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setUnit("temp", "c")}
          className="text-base"
        >
          Celsius (°C){" "}
          {units.temp === "c" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setUnit("temp", "f")}
          className="text-base"
        >
          Fahrenheit (°F){" "}
          {units.temp === "f" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Wind Speed */}
        <DropdownMenuLabel className="text-sm text-muted-foreground">
          Wind Speed
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setUnit("wind", "kmh")}
          className="text-base"
        >
          km/h {units.wind === "kmh" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setUnit("wind", "mph")}
          className="text-base"
        >
          mph {units.wind === "mph" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Precipitation */}
        <DropdownMenuLabel className="text-sm text-muted-foreground">
          Precipitation
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setUnit("precip", "mm")}
          className="text-base"
        >
          Millimeters (mm){" "}
          {units.precip === "mm" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setUnit("precip", "in")}
          className="text-base"
        >
          Inches (in){" "}
          {units.precip === "in" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
