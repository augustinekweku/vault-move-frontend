import type { ReactNode } from "react";
import type { DealUpload } from "~/types";
import { cn } from "~/lib/utils";
import { DeleteIcon } from "~/components/ui/icons";

export interface UploadFileRowProps {
  upload: DealUpload;
  /** Leading icon — matches the row the file was uploaded against. */
  icon: ReactNode;
  onDelete: () => void;
  /** Root tag — "li" as a list sibling, "div" when nested inside a row. */
  as?: "li" | "div";
  className?: string;
}

/** The tinted row shown once a file is picked: file name, simulated
 *  progress bar on a bordered track and a delete action. */
export function UploadFileRow({
  upload,
  icon,
  onDelete,
  as: Tag = "li",
  className,
}: UploadFileRowProps) {
  return (
    <Tag
      className={cn(
        "flex items-center gap-4 rounded-xl bg-surface-alt px-6 py-2",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-4">
          {icon}
          <p className="truncate text-sm text-brand-navy/54">
            {upload.fileName}
          </p>
        </div>
        <div className="mt-1 h-3 rounded-full border border-line">
          <div
            className="h-full rounded-full bg-brand"
            style={{ width: `${upload.progress}%` }}
          />
        </div>
      </div>
      <button
        type="button"
        aria-label={`Delete ${upload.fileName}`}
        onClick={onDelete}
        className="shrink-0 text-brand transition-opacity hover:opacity-70"
      >
        <DeleteIcon aria-hidden className="size-6" />
      </button>
    </Tag>
  );
}
