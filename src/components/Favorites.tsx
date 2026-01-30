import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useFavorites } from "@/store/useFavorites";
import type { LocationData as FavoriteLocation } from "@/lib/types";
import { useEffect, useState } from "react";
import { useSelectedLocation } from "@/store/useSelectedLocation";
import { ArrowRightLeft, BookmarkCheck, MapPinCheckInside } from "lucide-react";
import { useView } from "@/store/useView";
import { useCompareStore } from "@/store/useCompare";

export function FavoritesComboBox() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [selectedFavorite, setSelectedFavorite] =
    useState<FavoriteLocation | null>(null);

  const { favorites } = useFavorites();
  const { setSelectedLocation } = useSelectedLocation();

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-fit justify-start">
            {selectedFavorite ? (
              <>
                <MapPinCheckInside /> {selectedFavorite.name},{" "}
                {selectedFavorite.country}
              </>
            ) : (
              <>
                <BookmarkCheck /> Favorites
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0" align="start">
          <FavoritesList
            favorites={favorites}
            setOpen={setOpen}
            setSelectedFavorite={setSelectedFavorite}
            setSelectedLocation={setSelectedLocation}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-fit justify-start"
          title="Favorite Locations"
        >
          {selectedFavorite ? <MapPinCheckInside /> : <BookmarkCheck />}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <FavoritesList
            favorites={favorites}
            setOpen={setOpen}
            setSelectedFavorite={setSelectedFavorite}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function FavoritesList({
  favorites,
  setOpen,
  setSelectedFavorite,
  setSelectedLocation,
}: {
  favorites: FavoriteLocation[];
  setOpen: (open: boolean) => void;
  setSelectedFavorite: (fav: FavoriteLocation | null) => void;
  setSelectedLocation: (fav: FavoriteLocation) => void;
}) {
  const { resetView } = useView();
  const { removeFavorite } = useFavorites();
  const { addComparison } = useCompareStore();

  return (
    <Command>
      <CommandInput placeholder="Search favorites..." />
      <CommandList>
        <CommandEmpty>No favorites saved.</CommandEmpty>
        <CommandGroup>
          {favorites.map((fav) => (
            <CommandItem
              key={fav.name}
              value={fav.name}
              onSelect={() => {
                setSelectedFavorite(fav);
                setSelectedLocation(fav);
                resetView();
                setOpen(false);
              }}
              className="flex items-center justify-between"
            >
              <span>
                {fav.name}, {fav.country}
              </span>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(fav.id);
                  }}
                  className="text-foreground/70"
                  title="Remove favorite"
                >
                  ✕
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    addComparison(fav);
                  }}
                  title="Add to compare"
                >
                  <ArrowRightLeft />
                </Button>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
