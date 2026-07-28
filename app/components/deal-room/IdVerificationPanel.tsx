import { Fragment, useEffect, useRef, useState } from "react";
import type { DealRequirement, DealUpload } from "~/types";
import { cn } from "~/lib/utils";
import { DeleteIcon, IdIcon, UploadIcon } from "~/components/ui/icons";

interface IdVerificationPanelProps {
  /** Documents the renter must upload (Upload action rows). */
  renterRequirements: DealRequirement[];
  /** Documents awaited from the landlord (Pending action rows). */
  landlordRequirements: DealRequirement[];
  className?: string;
}

/** Pace of the simulated upload progress. */
const UPLOAD_TICK_MS = 150;
const UPLOAD_TICK_STEP = 7;

/** How long the landlord rows wait before flipping to Review — mocking the
 *  landlord sending their documents — and the extra stagger per row. */
const REVIEW_DELAY_MS = 6000;
const REVIEW_STAGGER_MS = 2500;

interface RequirementRowProps {
  requirement: DealRequirement;
  /** Delay before a "pending" row flips to Review — set on landlord rows to
   *  mock the landlord sending the document. */
  reviewDelayMs?: number;
}

/** One requirement row. "upload" rows carry an Upload action that opens a
 *  file picker; picking a file adds the tinted file row under the
 *  requirement — file name, simulated progress bar and a delete action —
 *  until the renter deletes it. "pending" rows show a disabled Pending
 *  action and flip to the Review action once the landlord's document
 *  arrives. */
function RequirementRow({ requirement, reviewDelayMs }: RequirementRowProps) {
  const [upload, setUpload] = useState<DealUpload | null>(
    requirement.upload ?? null,
  );
  const [reviewable, setReviewable] = useState(requirement.state === "review");
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

  /* Mock the landlord sending their documents: a pending row flips to
     Review after a short delay. */
  useEffect(() => {
    if (requirement.state !== "pending" || reviewDelayMs === undefined) return;
    const timer = setTimeout(() => setReviewable(true), reviewDelayMs);
    return () => clearTimeout(timer);
  }, [requirement.state, reviewDelayMs]);

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
        {requirement.state === "upload" ? (
          <Fragment>
            <button
              type="button"
              onClick={handleUploadClick}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
            >
              <UploadIcon aria-hidden className="size-4" />
              Upload
            </button>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </Fragment>
        ) : reviewable ? (
          <button
            type="button"
            className="shrink-0 rounded-lg border border-line px-6 py-2 text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
          >
            Review
          </button>
        ) : (
          <span className="shrink-0 rounded-lg border border-line px-4 py-2 text-center text-sm text-muted-400">
            Pending
          </span>
        )}
      </li>
      {upload && (
        <li className="flex items-center gap-4 rounded-xl bg-surface-alt px-6 py-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-4">
              <IdIcon aria-hidden className="size-6 shrink-0 text-brand" />
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
            onClick={handleDeleteClick}
            className="shrink-0 text-brand transition-opacity hover:opacity-70"
          >
            <DeleteIcon aria-hidden className="size-6" />
          </button>
        </li>
      )}
    </Fragment>
  );
}

/** Module-level so both list `.map()`s take named functions, not inline
 *  callbacks. */
function renderRenterRow(requirement: DealRequirement) {
  return <RequirementRow key={requirement.id} requirement={requirement} />;
}

function renderLandlordRow(requirement: DealRequirement, index: number) {
  return (
    <RequirementRow
      key={requirement.id}
      requirement={requirement}
      reviewDelayMs={REVIEW_DELAY_MS + index * REVIEW_STAGGER_MS}
    />
  );
}

/** The "ID Verification" step panel of the deal detail page: the renter's
 *  outstanding uploads followed by the documents awaited from the landlord.
 *  Uploads are simulated locally — the picked file's progress bar fills over
 *  a couple of seconds, and the landlord rows flip from Pending to Review a
 *  few seconds in — until the document flow is wired. The Review action is
 *  a visual mock. */
export function IdVerificationPanel({
  renterRequirements,
  landlordRequirements,
  className,
}: IdVerificationPanelProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-line bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <h3 className="text-base font-bold text-ink">ID Verification</h3>
      <p className="mt-1 text-sm text-muted-500">
        We&apos;re verifying your information and documents. Some documents
        required from the landlord.
      </p>

      <h4 className="mt-6 text-sm font-bold text-ink">Required from you</h4>
      <ul className="mt-3 space-y-3">
        {renterRequirements.map(renderRenterRow)}
      </ul>

      <h4 className="mt-8 text-sm font-bold text-ink">
        Required from landlord
      </h4>
      <p className="mt-1 text-sm text-muted-500">
        We&apos;re verifying your information and documents. Some documents
        required from the landlord.
      </p>
      <ul className="mt-3 space-y-3">
        {landlordRequirements.map(renderLandlordRow)}
      </ul>
    </article>
  );
}
