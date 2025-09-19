import {  type FormEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchFormProps {
  query: string;
  setQuery: (val: string) => void;
  onSearch: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function SearchForm({
  query,
  setQuery,
  onSearch,
  onSubmit,
}: SearchFormProps) {

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center gap-2 w-full"
    >
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for a place..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          className="pl-10 border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <Button type="submit" variant="default" className="w-full">
        Submit
      </Button>
    </form>
  );
}
