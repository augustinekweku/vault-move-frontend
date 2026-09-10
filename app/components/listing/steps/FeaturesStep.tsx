import type { ListingDetailsForm } from "~/types";
import {
  FeatureGroup,
  type RadioGroupChange,
} from "~/components/listing/FeatureGroup";
import {
  BUILDING_FEATURES,
  INTERIOR_FEATURES,
  PARKING_OPTIONS,
} from "~/data/listing";

/** Step 4 — features: interior, parking and building radio groups. */
export function FeaturesStep({
  form,
  onRadioChange,
}: {
  form: ListingDetailsForm;
  onRadioChange: RadioGroupChange;
}) {
  return (
    <div className="grid items-start gap-8 sm:grid-cols-2">
      <FeatureGroup
        title="Interior Features"
        name="interiorFeatures"
        options={INTERIOR_FEATURES}
        value={form.interiorFeatures}
        onChange={onRadioChange}
      />
      <FeatureGroup
        title="Parking"
        name="parking"
        options={PARKING_OPTIONS}
        value={form.parking}
        onChange={onRadioChange}
      />
      <FeatureGroup
        title="Building features"
        name="buildingFeatures"
        options={BUILDING_FEATURES}
        value={form.buildingFeatures}
        onChange={onRadioChange}
      />
    </div>
  );
}
