import { Button } from "./ui/button";

// src/components/SearchResults.tsx
interface SearchResultsProps {
  results: any[];
  onSelect: (location: any) => void;
  query: string;
}

export default function SearchResults({
  results,
  onSelect,
  query,
}: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="absolute top-full mt-2 p-3 left-0 w-full bg-primary-foreground shadow-lg rounded-lg z-10">
      {results.map((location, index) => (
        <Button
          variant="ghost"
          key={index}
          onClick={() => onSelect(location)}
          className="w-full justify-start p-3"
        >
          <div className="font-medium">
            {highlightMatch(
              `${location.name}${
                location.admin1 ? `, ${location.admin1}` : ""
              }, ${location.country}`,
              query
            )}
          </div>
          <span className="text-sm text-muted-foreground"></span>
        </Button>
      ))}
    </div>
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
