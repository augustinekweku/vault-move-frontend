import { Field, Input } from "~/components/ui/Input";
import { PhoneCodeMenu } from "~/components/onboarding/PhoneCodeMenu";
import { ChecklistCard } from "~/components/onboarding/ChecklistCard";
import { UploadDropzone } from "~/components/onboarding/UploadDropzone";
import { UploadedFileList } from "~/components/onboarding/UploadedFileList";
import { LANDLORD_COMPANY_DOCUMENTS } from "~/data/auth";
import type { OnboardingForm, UploadedFile } from "~/types";

type FieldChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

export type CompanyAnswer = "yes" | "no";

/** Step 3 — company information. One shared screen for every audience: an
 *  individual landlord answers No and skips ahead, while a developer or
 *  agent answers Yes and fills in the company block. */
export function CompanyInfoStep({
  form,
  onFieldChange,
  hasCompany,
  onHasCompanyChange,
  officePhoneCode,
  onOfficePhoneCodeChange,
  certs,
  certInputRef,
  onCertClick,
  onCertChange,
  onCertDragOver,
  onCertDrop,
  onCertDelete,
  regError,
  tinError,
}: {
  form: Pick<
    OnboardingForm,
    | "companyName"
    | "officePhone"
    | "companyRegNo"
    | "tinNumber"
    | "officeAddress"
  >;
  onFieldChange: FieldChange;
  hasCompany: CompanyAnswer;
  onHasCompanyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  officePhoneCode: string;
  onOfficePhoneCodeChange: (code: string) => void;
  certs: UploadedFile[];
  certInputRef: React.RefObject<HTMLInputElement | null>;
  onCertClick: () => void;
  onCertChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCertDragOver: (event: React.DragEvent) => void;
  onCertDrop: (event: React.DragEvent) => void;
  onCertDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  regError: string | null;
  tinError: string | null;
}) {
  return (
    <>
      <fieldset>
        <legend className="text-[15px] font-semibold text-ink">
          Do you have a registered company?
        </legend>
        <div className="mt-3 space-y-2.5">
          <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-700">
            <input
              type="radio"
              name="hasCompany"
              value="yes"
              checked={hasCompany === "yes"}
              onChange={onHasCompanyChange}
              className="size-4 cursor-pointer accent-brand"
            />
            Yes
          </label>
          <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-700">
            <input
              type="radio"
              name="hasCompany"
              value="no"
              checked={hasCompany === "no"}
              onChange={onHasCompanyChange}
              className="size-4 cursor-pointer accent-brand"
            />
            No
          </label>
        </div>
      </fieldset>
      {hasCompany === "no" && <div aria-hidden className="h-28" />}
      {hasCompany === "yes" && (
        <>
          <Input
            label="Name of Company"
            name="companyName"
            placeholder="Name of company"
            autoComplete="organization"
            value={form.companyName}
            onChange={onFieldChange}
            required
          />
          <Field label="Office Phone number">
            <div className="flex h-11 w-full items-stretch rounded-lg border border-line bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus-within:border-brand">
              <PhoneCodeMenu
                value={officePhoneCode}
                onChange={onOfficePhoneCodeChange}
              />
              <span aria-hidden className="my-3 w-px shrink-0 bg-line-soft" />
              <input
                name="officePhone"
                type="tel"
                autoComplete="tel"
                placeholder="(57) 1543210"
                value={form.officePhone}
                onChange={onFieldChange}
                required
                className="h-full min-w-0 flex-1 rounded-r-lg bg-transparent px-3 text-[15px] text-ink placeholder:text-muted-500 focus:outline-none"
              />
            </div>
          </Field>
          <Input
            label="Company registration number"
            name="companyRegNo"
            placeholder="Enter registration number"
            value={form.companyRegNo}
            onChange={onFieldChange}
            required
            error={regError}
            errorId="company-reg-error"
            id="company-reg-no"
          />
          <Input
            label="Tin Number"
            name="tinNumber"
            placeholder="Enter TIN number"
            value={form.tinNumber}
            onChange={onFieldChange}
            error={tinError}
            errorId="tin-number-error"
            id="tin-number"
          />
          <Input
            label="Office Address"
            name="officeAddress"
            placeholder="Enter office address"
            value={form.officeAddress}
            onChange={onFieldChange}
          />
          <Field label="Upload Company Registration Certificates">
            <ChecklistCard
              title="Documents you can upload."
              items={LANDLORD_COMPANY_DOCUMENTS}
            />
            <div className="mt-4">
              <UploadDropzone
                inputRef={certInputRef}
                accept=".png,.jpg,.jpeg,.pdf"
                multiple
                onPick={onCertClick}
                onFileChange={onCertChange}
                onDragOver={onCertDragOver}
                onDrop={onCertDrop}
              />
            </div>
            <UploadedFileList files={certs} onDelete={onCertDelete} />
          </Field>
        </>
      )}
    </>
  );
}
