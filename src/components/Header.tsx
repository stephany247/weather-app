import logo from "@/assets/images/logo.svg";
import { UnitDropdown } from "./UnitsDropdown";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="App logo" />
      </div>
      <UnitDropdown />
    </header>
  );
}
