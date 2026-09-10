import type { ListingDetailsForm } from "~/types";
import { Field, Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { LocationIcon } from "~/components/ui/icons";
import {
  AREA_OPTIONS,
  CITY_OPTIONS,
  LANDMARK_OPTIONS,
} from "~/data/listing";

/** Step 2 — location: street address, area and city dropdowns, the map pin
 *  and the closest-landmark radio group. */
export function LocationStep({
  form,
  onFieldChange,
  onSelectChange,
  onRadioChange,
}: {
  form: ListingDetailsForm;
  onFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string, name?: string) => void;
  onRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  function renderLandmarkOption(option: string) {
    return (
      <label
        key={option}
        className="flex w-fit cursor-pointer items-center gap-3 text-[15px] text-ink"
      >
        <input
          type="radio"
          name="closestLandmark"
          value={option}
          checked={form.closestLandmark === option}
          onChange={onRadioChange}
          className="size-4 cursor-pointer accent-brand"
        />
        {option}
      </label>
    );
  }

  return (
    <>
      <Input
        label="Property address"
        name="address"
        placeholder="Enter property address"
        value={form.address}
        onChange={onFieldChange}
      />

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Select
          label="Area / Neighborhood"
          name="area"
          placeholder="eg Achimota"
          options={AREA_OPTIONS}
          value={form.area}
          onChange={onSelectChange}
        />
        <Select
          label="City"
          name="city"
          placeholder="eg Accra"
          options={CITY_OPTIONS}
          value={form.city}
          onChange={onSelectChange}
        />
      </div>

      <Field label="Pin location on maps" className="mt-5">
        {/* The map picker isn't built yet, so the pin field stays inert. */}
        <button
          type="button"
          className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-line bg-white px-3.5 text-left text-[15px] text-muted-500 shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
        >
          <span className="truncate">Pin the location on map</span>
          <LocationIcon className="size-5 shrink-0" />
        </button>
      </Field>

      <fieldset className="mt-6">
        <legend className="text-[13px] font-medium text-muted-700">
          Select the closest Landmarks
        </legend>
        <div className="mt-4 flex flex-col gap-5">
          {LANDMARK_OPTIONS.map(renderLandmarkOption)}
        </div>
        {/* Custom landmarks aren't supported yet, so the action stays inert. */}
        <button
          type="button"
          className="mt-5 text-sm text-ink underline underline-offset-2"
        >
          Add new
        </button>
      </fieldset>
    </>
  );
}
