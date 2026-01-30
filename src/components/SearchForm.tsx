import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { LocateFixed, Mic, Search } from "lucide-react";
import { Input } from "./ui/input";
import loadingIcon from "@/assets/images/icon-loading.svg";

interface SearchFormProps {
  query: string;
  setQuery: (val: string) => void;
  onSearch: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
  results: any[];
  onSelect: (location: any) => void;
  isSearching: boolean;
  onDetectLocation: () => void;
  weather: any;
}

export default function SearchForm({
  query,
  setQuery,
  onSearch,
  onSubmit,
  results,
  onSelect,
  isSearching,
  onDetectLocation,
  weather,
}: SearchFormProps) {
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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

  // Voice search handler
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support voice search.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onend = () => {
      setIsListening(false);
      setIsSpeaking(false); // reset when recognition ends
    };

    recognition.onspeechstart = () => setIsSpeaking(true);
    recognition.onspeechend = () => setIsSpeaking(false);

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setIsSpeaking(false);

      // Handle "no-speech" gracefully
      if (event.error === "no-speech") {
        alert("No speech detected. Please try again and speak clearly.");
      } else if (event.error === "not-allowed") {
        alert(
          "Microphone permission denied. Please enable it in your browser.",
        );
      }
    };
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const spokenText = event.results[0][0].transcript;
      setQuery(spokenText);
      onSearch(spokenText);
      setOpen(true);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
        setOpen(false); // close dropdown after submit
        inputRef.current?.blur(); //remove focus from input
      }}
      className="flex flex-col md:flex-row items-center gap-4 w-full lg:max-w-2xl mx-auto"
    >
      {/* Use My Location button */}
      <button
        type="button"
        onClick={onDetectLocation}
        title="Get current location"
        className="group relative cursor-pointer inline-flex items-center gap-3 bg-accent/80 hover:bg-primary/20 transition-all duration-200 ease-in-out p-2 h-12 md:h-13 rounded-lg"
      >
        {!weather && (
          <span className="absolute inset-0 rounded-lg animate-ping hover:animate-none bg-primary/30" />
        )}
        <LocateFixed
          size={30}
          className={`text-primary-foreground dark:text-primary shadow-2xl ${
            !weather ? "md:animate-bounce-slow" : ""
          }`}
        />{" "}
        <span className="md:hidden capitalize pr-1">Use my location</span>
      </button>
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
            className="w-full rounded-xl pl-12 pr-4 py-3 h-14 text-xl shadow-2xs hover:bg-accent focus:bg-accent focus:ring-2 focus:ring-accent-foreground"
          />

          {/* Voice Search Button */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 cursor-pointer rounded-full transition duration-200 ease-in-out 
              ${
                isSpeaking
                  ? "bg-red-500 text-white before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-2 before:border-transparent before:border-t-white before:animate-spin"
                  : isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "text-muted-foreground hover:text-foreground"
              }`}
            title="Voice Search"
          >
            <Mic size={22} />
          </button>
        </div>
        {open && (
          <>
            {isSearching ? (
              <div className="absolute top-full mt-2 p-3 left-0 flex gap-x-2 w-full bg-accent shadow-lg rounded-lg z-10">
                <img
                  src={loadingIcon}
                  alt="Loading icon"
                  className="animate-spin"
                />
                <p className="text-base text-muted-foreground">
                  Search in progress...
                </p>
              </div>
            ) : (
              results.length > 0 && (
                <div className="absolute top-full mt-2 py-3 px-2 left-0 w-full bg-muted shadow-lg rounded-lg z-10">
                  {results.map((location, index) => (
                    <Button
                      variant="ghost"
                      key={index}
                      onClick={() => onSelect(location)}
                      className="w-full justify-start px-1 md:px-2 text-base dark:hover:bg-card"
                    >
                      <p className="font-medium">
                        {highlightMatch(
                          `${location.name}${
                            location.admin1 ? `, ${location.admin1}` : ""
                          }, ${location.country}`,
                          query,
                        )}
                      </p>
                    </Button>
                  ))}
                </div>
              )
            )}
          </>
        )}
      </div>

      <Button
        type="submit"
        variant="default"
        className="w-full md:w-2/10 h-14 text-xl rounded-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:bg-primary"
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
    ),
  );
}
