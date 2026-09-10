import { DeleteIcon } from "~/components/ui/icons";
import type { UploadedFile } from "~/types";

/** Uploaded-file rows: tinted card with the file name and progress bar, plus
 *  a delete action handed its row id via data-*. Renders nothing until the
 *  first file lands. */
export function UploadedFileList({
  files,
  onDelete,
}: {
  files: UploadedFile[];
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  /** One row — needs the delete handler, so it lives with the props. */
  function renderRow(file: UploadedFile) {
    return (
      <li key={file.id} className="flex items-center gap-3">
        <div className="min-w-0 flex-1 rounded-xl bg-surface-alt px-4 py-3">
          <p className="flex items-center gap-2 text-sm text-muted-700">
            <img
              src="/icons/document-icon.svg"
              alt=""
              aria-hidden
              className="size-5 shrink-0"
            />
            <span className="truncate">{file.name}</span>
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-700"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          data-id={file.id}
          onClick={onDelete}
          aria-label={`Remove ${file.name}`}
          className="shrink-0 text-brand hover:text-brand-dark"
        >
          <DeleteIcon className="size-5" />
        </button>
      </li>
    );
  }

  if (files.length === 0) return null;
  return <ul className="mt-4 space-y-4">{files.map(renderRow)}</ul>;
}
