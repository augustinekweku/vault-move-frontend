import type { UploadedFile } from "~/types";
import { CheckIcon } from "~/components/ui/icons";
import { UploadDropzone } from "~/components/onboarding/UploadDropzone";
import { UploadedFileList } from "~/components/onboarding/UploadedFileList";
import {
  AUTHORITY_TO_LIST_OPTIONS,
  LEGAL_DOCUMENT_OPTIONS,
} from "~/data/listing";

/** Which checklist step 8 shows: landlords prove ownership, agents and
 *  developers prove authority to list. */
export type LegalDocumentsVariant = "ownership" | "authority";

/** Step 8 — legal documents: the proof-of-ownership or proof-of-authority
 *  checklist plus the document dropzone. File state lives in the wizard
 *  shell so picks survive step navigation. */
export function LegalDocumentsStep({
  variant = "ownership",
  documents,
  documentsInputRef,
  onPickDocuments,
  onDocumentsChange,
  onDragOver,
  onDocumentsDrop,
  onDocumentDelete,
}: {
  variant?: LegalDocumentsVariant;
  documents: UploadedFile[];
  documentsInputRef: React.RefObject<HTMLInputElement | null>;
  onPickDocuments: () => void;
  onDocumentsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (event: React.DragEvent) => void;
  onDocumentsDrop: (event: React.DragEvent) => void;
  onDocumentDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  function renderDocument(document: string) {
    return (
      <li key={document} className="flex items-start gap-3">
        <span
          aria-hidden
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-deep text-white"
        >
          <CheckIcon className="size-3.5" />
        </span>
        <span className="text-[15px] leading-normal text-ink-soft">
          {document}
        </span>
      </li>
    );
  }

  return (
    <>
      <h3 className="text-[15px] font-semibold text-ink">
        {variant === "authority"
          ? "Proof of Authority to List"
          : "Proof of Ownership"}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
        Upload one of the following:
      </p>

      <ul className="mt-6 flex flex-col gap-4">
        {(variant === "authority"
          ? AUTHORITY_TO_LIST_OPTIONS
          : LEGAL_DOCUMENT_OPTIONS
        ).map(renderDocument)}
      </ul>

      <div className="mt-7 md:mt-10">
        <UploadDropzone
          inputRef={documentsInputRef}
          accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
          multiple
          onPick={onPickDocuments}
          onFileChange={onDocumentsChange}
          onDragOver={onDragOver}
          onDrop={onDocumentsDrop}
        />
        <UploadedFileList files={documents} onDelete={onDocumentDelete} />
      </div>
    </>
  );
}
