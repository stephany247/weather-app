import logo from "@/assets/images/logo.svg";
import { UnitDropdown } from "./UnitsDropdown";
import { FavoritesComboBox } from "./Favorites";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-12">
      <img src={logo} alt="App logo" className="w-36 h-auto" />

      <div className="flex items-center space-x-2 md:space-x-3">
        <FavoritesComboBox />
        <UnitDropdown />
      </div>
    </header>
  );
}
