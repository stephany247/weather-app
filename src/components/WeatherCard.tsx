interface WeatherCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export function WeatherCard({
  label,
  value,
  icon,
  isLoading = false,
}: WeatherCardProps) {
  return (
    <div
      className={`glass-card rounded-xl p-4 space-y-4 transition-all ${
        isLoading ? "animate-pulse" : ""
      }`}
    >
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">{label}</p>
          {icon && <p>{icon}</p>}
        </div>

        <h3 className="text-3xl font-light">
          {isLoading ? "–" : value}
        </h3>
    </div>
  );
}
