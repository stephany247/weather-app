import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface SearchFormProps {
  query: string;
  setQuery: (val: string) => void;
  onSearch: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
  results: any[];
  onSelect: (location: any) => void;
}

export default function SearchForm({
  query,
  setQuery,
  onSearch,
  onSubmit,
  results,
  onSelect,
}: SearchFormProps) {
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
        setOpen(false); // close dropdown after submit
        inputRef.current?.blur(); //remove focus from input
      }}
      className="flex flex-col items-center gap-y-4 w-full"
    >
      <div className="relative w-full" ref={commandRef}>
        <div className="relative w-full">
          {/* Search icon */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          {/* Input field */}
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
              setOpen(true);
            }}
            className="w-full rounded-xl pl-12 pr-4 py-3 h-14 text-xl focus:outline-none focus:ring-2 focus:ring-accent-foreground"
          />
        </div>
        {open && results.length > 0 && (
          <div className="absolute top-full mt-2 p-3 left-0 w-full bg-primary-foreground shadow-lg rounded-lg z-10">
            {results.map((location, index) => (
              <Button
                variant="ghost"
                key={index}
                onClick={() => onSelect(location)}
                className="w-full justify-start p-3 text-base"
              >
                <p className="font-medium">
                  {highlightMatch(
                    `${location.name}${
                      location.admin1 ? `, ${location.admin1}` : ""
                    }, ${location.country}`,
                    query
                  )}
                </p>
              </Button>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        variant="default"
        className="w-full h-14 text-xl bg-blue-500 text-foreground rounded-xl"
      >
        Search
      </Button>
    </form>
  );
}

function highlightMatch(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="font-bold bg-transparent text-accent-foreground">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
