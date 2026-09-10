import type { ListingDetailsForm } from "~/types";
import { Input, Textarea } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import {
  AVAILABILITY_STATUSES,
  BUILDING_CONDITIONS,
  FURNISHING_CONDITIONS,
  LISTING_TYPES,
  PROPERTY_TYPES,
  ROOM_COUNTS,
} from "~/data/listing";

/** Step 1 — property details and description: title, long description and
 *  the classifying dropdowns. One file per wizard step; the shell owns the
 *  form state and footer. */
export function PropertyDetailsStep({
  form,
  onFieldChange,
  onSelectChange,
}: {
  form: ListingDetailsForm;
  onFieldChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSelectChange: (value: string, name?: string) => void;
}) {
  return (
    <>
      <Input
        label="Enter property name / title"
        name="title"
        placeholder="Eg The ivory"
        value={form.title}
        onChange={onFieldChange}
      />

      <Textarea
        label="Property description"
        name="description"
        rows={4}
        placeholder="Give a brief description of the property"
        value={form.description}
        onChange={onFieldChange}
        wrapperClassName="mt-5"
      />

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Select
          label="Property type"
          name="propertyType"
          placeholder="Select property type"
          options={PROPERTY_TYPES}
          value={form.propertyType}
          onChange={onSelectChange}
        />
        <Select
          label="Listing type"
          name="listingType"
          placeholder="eg, Sale, rent"
          options={LISTING_TYPES}
          value={form.listingType}
          onChange={onSelectChange}
        />
        <Select
          label="Furnishing Conditions"
          name="furnishing"
          placeholder="Select furnishing conditon"
          options={FURNISHING_CONDITIONS}
          value={form.furnishing}
          onChange={onSelectChange}
        />
        <Select
          label="Number of bedrooms"
          name="bedrooms"
          placeholder="eg 3"
          options={ROOM_COUNTS}
          value={form.bedrooms}
          onChange={onSelectChange}
        />
        <Select
          label="Availability Status"
          name="availability"
          placeholder="Select Availability status"
          options={AVAILABILITY_STATUSES}
          value={form.availability}
          onChange={onSelectChange}
        />
        <Select
          label="Number of bathrooms"
          name="bathrooms"
          placeholder="eg 3"
          options={ROOM_COUNTS}
          value={form.bathrooms}
          onChange={onSelectChange}
        />
        <Select
          label="Building conditions"
          name="buildingCondition"
          placeholder="Select Building condition"
          options={BUILDING_CONDITIONS}
          value={form.buildingCondition}
          onChange={onSelectChange}
        />
      </div>
    </>
  );
}
