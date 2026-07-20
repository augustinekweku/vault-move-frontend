import type { Property } from "~/types";
import { cn } from "~/lib/utils";
import { PropertyCard } from "~/components/property/PropertyCard";

interface PropertyGridProps {
  properties: Property[];
  className?: string;
}

export function PropertyGrid({ properties, className }: PropertyGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
