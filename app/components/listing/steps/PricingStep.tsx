import type { ListingDetailsForm } from "~/types";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import {
  PAYMENT_FREQUENCIES,
  RENT_DURATIONS,
  SERVICE_CHARGES,
} from "~/data/listing";

/** Step 3 — pricing: rent and deposit amounts, payment rhythms and the
 *  service charge. */
export function PricingStep({
  form,
  onFieldChange,
  onSelectChange,
}: {
  form: ListingDetailsForm;
  onFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string, name?: string) => void;
}) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Monthly Rent"
          name="monthlyRent"
          inputMode="decimal"
          placeholder="Enter amount"
          value={form.monthlyRent}
          onChange={onFieldChange}
        />
        <Input
          label="Security Deposit"
          name="securityDeposit"
          inputMode="decimal"
          placeholder="Enter amount"
          value={form.securityDeposit}
          onChange={onFieldChange}
        />
        <Select
          label="Payment frequency"
          name="paymentFrequency"
          placeholder="eg monthly, quarterly, yearly"
          options={PAYMENT_FREQUENCIES}
          value={form.paymentFrequency}
          onChange={onSelectChange}
        />
        <Select
          label="Rent duration"
          name="rentDuration"
          placeholder="eg Short term, long term"
          options={RENT_DURATIONS}
          value={form.rentDuration}
          onChange={onSelectChange}
        />
        <Select
          label="Service charge"
          name="serviceCharge"
          placeholder="eg 450 ghc"
          options={SERVICE_CHARGES}
          value={form.serviceCharge}
          onChange={onSelectChange}
        />
        <Select
          label="Service charge frequency"
          name="serviceChargeFrequency"
          placeholder="eg monthly, quarterly, yearly"
          options={PAYMENT_FREQUENCIES}
          value={form.serviceChargeFrequency}
          onChange={onSelectChange}
        />
      </div>

      {/* Custom charges aren't supported yet, so the action stays inert. */}
      <button
        type="button"
        className="mt-5 self-start text-sm text-ink underline underline-offset-2"
      >
        Add new
      </button>
    </>
  );
}
