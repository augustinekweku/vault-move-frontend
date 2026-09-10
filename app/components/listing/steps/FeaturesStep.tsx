import type { ListingDetailsForm } from "~/types";
import {
  BUILDING_FEATURES,
  INTERIOR_FEATURES,
  PARKING_OPTIONS,
} from "~/data/listing";

type RadioChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

/** One radio group of the features step: titled set of options with its own
 *  inert "Add new" action. */
function FeatureGroup({
  title,
  name,
  options,
  value,
  onChange,
}: {
  title: string;
  name: string;
  options: string[];
  value: string;
  onChange: RadioChange;
}) {
  function renderOption(option: string) {
    return (
      <label
        key={option}
        className="flex w-fit cursor-pointer items-center gap-3 text-[15px] text-ink"
      >
        <input
          type="radio"
          name={name}
          value={option}
          checked={value === option}
          onChange={onChange}
          className="size-4 cursor-pointer accent-brand"
        />
        {option}
      </label>
    );
  }

  return (
    <fieldset>
      <legend className="text-[15px] font-semibold text-ink">{title}</legend>
      <div className="mt-4 flex flex-col gap-4">
        {options.map(renderOption)}
      </div>
      {/* Custom features aren't supported yet, so the action stays inert. */}
      <button
        type="button"
        className="mt-4 text-sm text-ink underline underline-offset-2"
      >
        Add new
      </button>
    </fieldset>
  );
}

/** Step 4 — features: interior, parking and building radio groups. */
export function FeaturesStep({
  form,
  onRadioChange,
}: {
  form: ListingDetailsForm;
  onRadioChange: RadioChange;
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
