import { useState } from "react";
// import "./App.css";
import logo from "@/assets/images/logo.svg";
import { Button } from "./components/ui/button";
import { UnitDropdown } from "./components/UnitsDropdown";
import { Search } from "lucide-react";
import { Input } from "./components/ui/input";

function App() {

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="App logo" />
        </div>

        <UnitDropdown />
      </header>
      <main className="space-y-8">
        <h1 className="font-grotesque text-4xl">How's the sky looking today?</h1>

        <form action="" className="flex flex-col items-center gap-2 w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for a place..."
              className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" variant="default" className="w-full">
            Submit
          </Button>
        </form>
      </main>
    </>
  );
}

export default App;
