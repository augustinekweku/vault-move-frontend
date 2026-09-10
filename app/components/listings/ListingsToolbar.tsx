import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { Button } from "~/components/ui/Button";
import { SearchIcon } from "~/components/ui/icons";
import { LISTING_STATUS_OPTIONS, PROPERTY_TYPES } from "~/data/listing";

interface ListingsToolbarProps {
  query: string;
  statusFilter: string;
  typeFilter: string;
  onQueryChange: (query: string) => void;
  onFilterChange: (value: string, name?: string) => void;
}

/** Search + status/type filters + the new-listing entry of the portal
 *  Listings page. The selects report their `name`, so one filter handler
 *  serves both. */
export function ListingsToolbar({
  query,
  statusFilter,
  typeFilter,
  onQueryChange,
  onFilterChange,
}: ListingsToolbarProps) {
  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    onQueryChange(event.target.value);
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative lg:w-80">
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-500"
        />
        <Input
          value={query}
          onChange={handleQueryChange}
          placeholder="Search Listing"
          aria-label="Search listings"
          className="pl-10"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:flex">
        <Select
          name="status"
          value={statusFilter}
          placeholder="All status"
          options={LISTING_STATUS_OPTIONS}
          onChange={onFilterChange}
          className="lg:w-44"
        />
        <Select
          name="type"
          value={typeFilter}
          placeholder="Property Type"
          options={PROPERTY_TYPES}
          onChange={onFilterChange}
          className="lg:w-44"
        />
      </div>
      <Button to="/dashboard/create-listing" className="lg:ml-auto">
        Add new listing
      </Button>
    </div>
  );
}
