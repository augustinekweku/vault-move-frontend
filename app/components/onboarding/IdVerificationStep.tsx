import { Field, Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { ChecklistCard } from "~/components/onboarding/ChecklistCard";
import { UploadDropzone } from "~/components/onboarding/UploadDropzone";
import { UploadedFileList } from "~/components/onboarding/UploadedFileList";
import { LANDLORD_ID_CHECKLIST, LANDLORD_ID_TYPES } from "~/data/auth";
import type { OnboardingForm, UploadedFile } from "~/types";

type FieldChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

/** Step 4 — ID verification: ID type and number, front/back images plus a
 *  selfie. Submitting here finishes the wizard. */
export function IdVerificationStep({
  form,
  onFieldChange,
  idType,
  onIdTypeChange,
  idDocs,
  idInputRef,
  onIdPick,
  onIdFileChange,
  onIdDragOver,
  onIdDrop,
  onIdDocDelete,
  selfieInputRef,
  onSelfieClick,
  onSelfieChange,
}: {
  form: Pick<OnboardingForm, "idNumber">;
  onFieldChange: FieldChange;
  idType: string;
  onIdTypeChange: (value: string) => void;
  idDocs: UploadedFile[];
  idInputRef: React.RefObject<HTMLInputElement | null>;
  onIdPick: () => void;
  onIdFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIdDragOver: (event: React.DragEvent) => void;
  onIdDrop: (event: React.DragEvent) => void;
  onIdDocDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selfieInputRef: React.RefObject<HTMLInputElement | null>;
  onSelfieClick: () => void;
  onSelfieChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <Select
        label="Select ID"
        placeholder="eg Ghana Card"
        options={LANDLORD_ID_TYPES}
        value={idType}
        onChange={onIdTypeChange}
      />
      <Input
        label="ID Number"
        name="idNumber"
        placeholder="Enter ID number"
        value={form.idNumber}
        onChange={onFieldChange}
        required
      />
      <ChecklistCard title="Verify your ID" items={LANDLORD_ID_CHECKLIST} />
      <UploadDropzone
        inputRef={idInputRef}
        accept="image/*"
        multiple
        onPick={onIdPick}
        onFileChange={onIdFileChange}
        onDragOver={onIdDragOver}
        onDrop={onIdDrop}
      />
      <UploadedFileList files={idDocs} onDelete={onIdDocDelete} />
      <button
        type="button"
        onClick={onSelfieClick}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-[15px] text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="size-5 text-muted-500"
        >
          <path
            d="M4 8h3l2-2.2h6L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="13.5"
            r="3.2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
        Take a selfie
      </button>
      <input
        ref={selfieInputRef}
        type="file"
        accept="image/*"
        capture="user"
        tabIndex={-1}
        aria-hidden
        className="hidden"
        onChange={onSelfieChange}
      />
    </>
  );
}
