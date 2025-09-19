import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Command, CommandInput, CommandItem, CommandList } from "./ui/command";

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
      }}
      className="relative flex flex-col items-center gap-2 w-full"
    >
      <Command ref={commandRef} shouldFilter={false}>
        <CommandInput
          placeholder="Search for a place..."
          value={query}
          onValueChange={(val) => {
            setQuery(val);
            onSearch(val);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // const form = e.currentTarget.closest("form");
              // form?.dispatchEvent(
              //   new Event("submit", { cancelable: true, bubbles: true })
              // );
              (
                e.currentTarget.closest("form") as HTMLFormElement
              )?.requestSubmit();
              setOpen(false);
            }
          }}
          className="p-2"
        />
        {open && results.length > 0 && (
          <CommandList className="absolute top-full mt-2 p-3 left-0 w-full bg-primary-foreground shadow-lg rounded-lg z-10">
            {results.map((location, index) => (
              <CommandItem
                key={index}
                onSelect={() => {
                  onSelect(location);
                  setOpen(false); // close when selecting
                }}
                className="p-3"
              >
                {location.name}, {location.admin1 || location.country}
              </CommandItem>
            ))}
          </CommandList>
        )}
      </Command>

      <Button type="submit" variant="default" className="w-full">
        Submit
      </Button>
    </form>
  );
}
