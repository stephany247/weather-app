import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/store/useCompare";
import type { LocationData } from "@/lib/types";
import { ArrowRightLeft, X } from "lucide-react";

interface CompareButtonProps {
  location: LocationData;
}

export function CompareButton({ location }: CompareButtonProps) {
  const { comparisons, addComparison, removeComparison } = useCompareStore();

  const isCompared = comparisons.some(
    (c) =>
      c.latitude === location.latitude && c.longitude === location.longitude
  );

  const reachedLimit = comparisons.length >= 5 && !isCompared;

  const handleClick = () => {
    if (isCompared) {
      removeComparison(location.latitude, location.longitude);
    } else {
      addComparison(location);
    }
  };

  return (
    // <Button
    //   onClick={handleClick}
    //   variant={isCompared ? "destructive" : "outline"}
    //   disabled={reachedLimit}
    // >
    //   {isCompared ? "Remove from Compare" : "Add to Compare"}
    // </Button>
    <Button
      onClick={handleClick}
      variant={isCompared ? "destructive" : "outline"}
      disabled={reachedLimit}
    >
      {isCompared ? (
        <>
          <X size={16} /> Remove from Compare
        </>
      ) : (
        <>
          <ArrowRightLeft size={16} /> Add to Compare
        </>
      )}
    </Button>
  );
}
