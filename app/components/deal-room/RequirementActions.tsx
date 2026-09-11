import { Fragment } from "react";
import type { RefObject } from "react";
import { UploadIcon } from "~/components/ui/icons";

interface UploadActionProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onUploadClick: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/** The outlined Upload action and its hidden file input. */
export function UploadAction({
  inputRef,
  onUploadClick,
  onFileChange,
}: UploadActionProps) {
  return (
    <Fragment>
      <button
        type="button"
        onClick={onUploadClick}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
      >
        <UploadIcon aria-hidden className="size-4" />
        Upload
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
      />
    </Fragment>
  );
}

/** The outlined Review action — a visual mock until the document viewer is
 *  wired. */
export function ReviewAction() {
  return (
    <button
      type="button"
      className="shrink-0 rounded-lg border border-line px-6 py-2 text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
    >
      Review
    </button>
  );
}

/** The disabled Pending action shown while waiting on the landlord. */
export function PendingAction() {
  return (
    <span className="shrink-0 rounded-lg border border-line px-4 py-2 text-center text-sm text-muted-400">
      Pending
    </span>
  );
}
