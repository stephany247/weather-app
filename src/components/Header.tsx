import logo from "@/assets/images/logo.svg";
import { UnitDropdown } from "./UnitsDropdown";
import { FavoritesComboBox } from "./Favorites";
import { Button } from "./ui/button";
import { ArrowRightLeft } from "lucide-react";

interface HeaderProps {
  view: "details" | "compare";
  setView: (val: "details" | "compare") => void;
}

export default function Header({ view, setView }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-12">
      <img src={logo} alt="App logo" className="w-36 h-auto" />

      <div className="flex items-center space-x-2 md:space-x-3">
        <Button
          onClick={() => setView(view === "compare" ? "details" : "compare")}
          variant={view === "compare" ? "default" : "outline"}
        >
          <ArrowRightLeft /> Compare
        </Button>
        <FavoritesComboBox />
        <UnitDropdown />
      </div>
    </header>
  );
}
