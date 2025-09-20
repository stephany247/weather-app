import logo from "@/assets/images/logo.svg";
import { UnitDropdown } from "./UnitsDropdown";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-12">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="App logo" className="w-36 h-auto" />
      </div>
      <UnitDropdown />
    </header>
  );
}
