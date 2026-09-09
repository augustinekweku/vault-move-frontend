import { Input, Textarea } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { LANDLORD_SPECIALIZATIONS } from "~/data/auth";
import type { OnboardingForm } from "~/types";

type FieldChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

/** Step 2 — professional information: years of experience, areas of
 *  specialization and a short bio. */
export function ProfessionalInfoStep({
  form,
  onFieldChange,
  specialization,
  onSpecializationChange,
}: {
  form: Pick<OnboardingForm, "experience" | "bio">;
  onFieldChange: FieldChange;
  specialization: string;
  onSpecializationChange: (value: string) => void;
}) {
  return (
    <>
      <Input
        label="How many years of experience do you have?"
        name="experience"
        inputMode="numeric"
        placeholder="Years of experience"
        value={form.experience}
        onChange={onFieldChange}
        required
      />
      <Select
        label="Areas of specialization"
        placeholder="eg apartment, townhouses, etc"
        options={LANDLORD_SPECIALIZATIONS}
        value={specialization}
        onChange={onSpecializationChange}
      />
      <Textarea
        label="Short Bio"
        name="bio"
        rows={3}
        placeholder="Short professional bio"
        value={form.bio}
        onChange={onFieldChange}
      />
    </>
  );
}
