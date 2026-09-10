import type { ListingDetailsForm } from "~/types";
import {
  FeatureGroup,
  type RadioGroupChange,
} from "~/components/listing/FeatureGroup";
import { AMENITY_OPTIONS } from "~/data/listing";

/** Step 5 — amenities and utilities: the single radio group. */
export function AmenitiesStep({
  form,
  onRadioChange,
}: {
  form: ListingDetailsForm;
  onRadioChange: RadioGroupChange;
}) {
  return (
    <FeatureGroup
      title="Amenities and Utilities"
      name="amenities"
      options={AMENITY_OPTIONS}
      value={form.amenities}
      onChange={onRadioChange}
    />
  );
}
