import { Fragment, useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import type { DealRequirement, DealUpload } from "~/types";
import { cn } from "~/lib/utils";
import { DeleteIcon, IdIcon, UploadIcon } from "~/components/ui/icons";

/** Pace of the simulated upload progress. */
const UPLOAD_TICK_MS = 150;
const UPLOAD_TICK_STEP = 7;

/** Simulates a document upload against a requirement: picking a file from
 *  the hidden input sets it uploading, the progress ticking up to full over
 *  a couple of seconds, until the renter deletes it. */
function useSimulatedUpload(initial?: DealUpload) {
  const [upload, setUpload] = useState<DealUpload | null>(initial ?? null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearTimer() {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  /* Stop the simulated progress once the bar fills. */
  useEffect(() => {
    if (upload && upload.progress >= 100) clearTimer();
  }, [upload]);

  /* Clear the timer if the row unmounts mid-upload. */
  useEffect(() => clearTimer, []);

  function handleUploadClick() {
    inputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    /* Reset the input so picking the same file again re-fires change. */
    input.value = "";
    if (!file) return;
    clearTimer();
    setUpload({ fileName: file.name, progress: 0 });
    timerRef.current = setInterval(() => {
      setUpload((current) =>
        current
          ? {
              ...current,
              progress: Math.min(current.progress + UPLOAD_TICK_STEP, 100),
            }
          : current,
      );
    }, UPLOAD_TICK_MS);
  }

  function handleDeleteClick() {
    clearTimer();
    setUpload(null);
  }

  return {
    upload,
    inputRef,
    handleUploadClick,
    handleFileChange,
    handleDeleteClick,
  };
}

interface UploadActionProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onUploadClick: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/** The outlined Upload action and its hidden file input. */
function UploadAction({
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
function ReviewAction() {
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
function PendingAction() {
  return (
    <span className="shrink-0 rounded-lg border border-line px-4 py-2 text-center text-sm text-muted-400">
      Pending
    </span>
  );
}

interface UploadFileRowProps {
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
function UploadFileRow({
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

/** Picks the trailing action for a row: Upload (with its file input),
 *  Review once the landlord's document is in, or a disabled Pending. */
function RowAction({
  state,
  reviewable,
  inputRef,
  onUploadClick,
  onFileChange,
}: {
  state: DealRequirement["state"];
  reviewable: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onUploadClick: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (state === "upload") {
    return (
      <UploadAction
        inputRef={inputRef}
        onUploadClick={onUploadClick}
        onFileChange={onFileChange}
      />
    );
  }
  return reviewable ? <ReviewAction /> : <PendingAction />;
}

export interface RequirementRowProps {
  requirement: DealRequirement;
  /** Delay before a "pending" row flips to Review — set on landlord rows to
   *  mock the landlord sending the document. */
  reviewDelayMs?: number;
}

/** One verification-step requirement row (bordered card, id icon, title and
 *  description). "upload" rows carry the Upload action — picking a file
 *  adds the tinted file row under the card; "pending" rows show a disabled
 *  Pending action and flip to Review once the landlord's document arrives. */
export function RequirementRow({
  requirement,
  reviewDelayMs,
}: RequirementRowProps) {
  const {
    upload,
    inputRef,
    handleUploadClick,
    handleFileChange,
    handleDeleteClick,
  } = useSimulatedUpload(requirement.upload);
  const [reviewable, setReviewable] = useState(requirement.state === "review");

  /* Mock the landlord sending their documents: a pending row flips to
     Review after a short delay. */
  useEffect(() => {
    if (requirement.state !== "pending" || reviewDelayMs === undefined) return;
    const timer = setTimeout(() => setReviewable(true), reviewDelayMs);
    return () => clearTimeout(timer);
  }, [requirement.state, reviewDelayMs]);

  return (
    <Fragment>
      <li className="flex flex-col gap-3 rounded-xl border border-line-soft p-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-alt">
            <IdIcon aria-hidden className="size-5 text-brand" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-brand-navy/54">
              {requirement.title}
            </p>
            {requirement.description && (
              <p className="mt-0.5 text-sm text-brand-navy/54">
                {requirement.description}
              </p>
            )}
          </div>
        </div>
        <RowAction
          state={requirement.state}
          reviewable={reviewable}
          inputRef={inputRef}
          onUploadClick={handleUploadClick}
          onFileChange={handleFileChange}
        />
      </li>
      {upload && (
        <UploadFileRow
          upload={upload}
          icon={
            <IdIcon aria-hidden className="size-6 shrink-0 text-brand" />
          }
          onDelete={handleDeleteClick}
        />
      )}
    </Fragment>
  );
}

/** One contract-step document row: a bare row (document icon, title,
 *  action) with a bottom divider, plus the tinted file row nested under it
 *  once the renter picks a signed copy to upload. */
export function ContractDocumentRow({
  requirement,
}: {
  requirement: DealRequirement;
}) {
  const {
    upload,
    inputRef,
    handleUploadClick,
    handleFileChange,
    handleDeleteClick,
  } = useSimulatedUpload(requirement.upload);

  return (
    <li className="border-b border-line-soft pb-4">
      <div className="flex items-center gap-3">
        <img
          src="/icons/document.svg"
          alt=""
          className="size-6 shrink-0"
        />
        <p className="min-w-0 flex-1 text-sm font-bold text-brand-navy/54">
          {requirement.title}
        </p>
        <RowAction
          state={requirement.state}
          reviewable={requirement.state === "review"}
          inputRef={inputRef}
          onUploadClick={handleUploadClick}
          onFileChange={handleFileChange}
        />
      </div>
      {upload && (
        <UploadFileRow
          as="div"
          upload={upload}
          icon={
            <img
              src="/icons/document.svg"
              alt=""
              className="size-6 shrink-0"
            />
          }
          onDelete={handleDeleteClick}
          className="mt-3"
        />
      )}
    </li>
  );
}
