import { useState } from "react";
import { useNavigate } from "react-router";
import { cn } from "~/lib/utils";
import type { ListingCategory } from "~/types";
import { PROPERTY_TYPES, PRICE_RANGES } from "~/data/navigation";
import { Tabs } from "~/components/ui/Tabs";
import { Select } from "~/components/ui/Select";
import { Field } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";

interface PropertySearchBarProps {
  className?: string;
  showTabs?: boolean;
  defaultCategory?: ListingCategory;
}

export function PropertySearchBar({
  className,
  showTabs = true,
  defaultCategory = "rent",
}: PropertySearchBarProps) {
  const navigate = useNavigate();
  const [category, setCategory] = useState<ListingCategory>(defaultCategory);
  const [propertyType, setPropertyType] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (propertyType) params.set("type", propertyType);
    if (price) params.set("price", price);
    if (location) params.set("location", location);
    const dest = category === "buy" ? "/buy" : "/rent";
    navigate(`${dest}?${params.toString()}`);
  }

  return (
    <div className={cn("w-full", className)}>
      {showTabs && (
        <Tabs
          tabs={[
            { value: "rent", label: "Rent" },
            { value: "buy", label: "Buy" },
          ]}
          value={category}
          onChange={(v) => setCategory(v as ListingCategory)}
        />
      )}

      <div
        className={cn(
          "grid grid-cols-1 gap-4 border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)] md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:h-29.25",
          showTabs ? "rounded-b-xl rounded-tr-xl" : "rounded-xl",
        )}
      >
        <Select
          label="Property type"
          placeholder="Select property type"
          options={PROPERTY_TYPES}
          value={propertyType}
          onChange={setPropertyType}
        />
        <Select
          label="Enter a price range"
          placeholder="Ghc eg 500"
          suffix={category === "rent" ? "/month" : undefined}
          options={PRICE_RANGES}
          value={price}
          onChange={setPrice}
        />
        <Field label="Enter a location">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="eg Achimota"
            className="h-11 w-full rounded-lg border border-line bg-white px-3.5 text-[15px] text-ink placeholder:text-muted-500 shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:border-brand focus:outline-none"
          />
        </Field>
        <Button
          onClick={handleSearch}
          className="h-12 rounded-lg bg-brand px-7 text-lg font-medium text-white hover:bg-brand/90 md:w-auto"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
