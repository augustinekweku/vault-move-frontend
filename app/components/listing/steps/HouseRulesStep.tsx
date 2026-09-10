import type { ListingDetailsForm } from "~/types";
import { Textarea } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { MAX_OCCUPANTS, YES_NO_OPTIONS } from "~/data/listing";

/** Step 6 — house rules: permission dropdowns, capacity and the free-text
 *  additional terms. */
export function HouseRulesStep({
  form,
  onFieldChange,
  onSelectChange,
}: {
  form: ListingDetailsForm;
  onFieldChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSelectChange: (value: string, name?: string) => void;
}) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Are pets allowed?"
          name="petsAllowed"
          placeholder="Yes/No"
          options={YES_NO_OPTIONS}
          value={form.petsAllowed}
          onChange={onSelectChange}
        />
        <Select
          label="Is smoking allowed"
          name="smokingAllowed"
          placeholder="Yes/No"
          options={YES_NO_OPTIONS}
          value={form.smokingAllowed}
          onChange={onSelectChange}
        />
        <Select
          label="Parties / Events allowed?"
          name="partiesAllowed"
          placeholder="Yes/No"
          options={YES_NO_OPTIONS}
          value={form.partiesAllowed}
          onChange={onSelectChange}
        />
        <Select
          label="Maximum occupants"
          name="maxOccupants"
          placeholder="Select"
          options={MAX_OCCUPANTS}
          value={form.maxOccupants}
          onChange={onSelectChange}
        />
        <Select
          label="Noise Restrictions?"
          name="noiseRestrictions"
          placeholder="Yes/No"
          options={YES_NO_OPTIONS}
          value={form.noiseRestrictions}
          onChange={onSelectChange}
        />
      </div>

      <Textarea
        label="Add additional terms"
        name="additionalTerms"
        rows={3}
        placeholder="Enter any additional house rules."
        value={form.additionalTerms}
        onChange={onFieldChange}
        wrapperClassName="mt-5"
      />
    </>
  );
}
