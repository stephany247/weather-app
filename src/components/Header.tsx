import logo from "@/assets/images/logo.svg";
import darkLogo from "@/assets/images/dark-logo.svg";
import { UnitDropdown } from "./UnitsDropdown";
import { FavoritesComboBox } from "./Favorites";
import { Button } from "./ui/button";
import { ArrowRightLeft } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

interface HeaderProps {
  view: "details" | "compare";
  setView: (val: "details" | "compare") => void;
}

export default function Header({ view, setView }: HeaderProps) {
  const { resolvedTheme } = useTheme();
  return (
    <header className="flex items-center justify-between mb-12">
      <img
        src={resolvedTheme === "dark" ? logo : darkLogo}
        alt="App logo"
        className="w-36 h-auto transition-all"
      />

      <div className="flex items-center space-x-2 md:space-x-3">
        <ThemeToggle />
        <Button
          onClick={() => setView(view === "compare" ? "details" : "compare")}
          variant={view === "compare" ? "default" : "outline"}
        >
          <ArrowRightLeft />
          <span className="hidden md:block"> Compare</span>
        </Button>
        <FavoritesComboBox />
        <UnitDropdown />
      </div>
    </header>
  );
}
