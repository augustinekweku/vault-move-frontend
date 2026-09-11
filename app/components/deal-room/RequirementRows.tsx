import { Fragment, useEffect, useState } from "react";
import type { RefObject } from "react";
import type { DealRequirement } from "~/types";
import { useSimulatedUpload } from "~/components/deal-room/useSimulatedUpload";
import { RequirementGlyph } from "~/components/deal-room/RequirementGlyph";
import {
  PendingAction,
  ReviewAction,
  UploadAction,
} from "~/components/deal-room/RequirementActions";
import { UploadFileRow } from "~/components/deal-room/UploadFileRow";

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
            <RequirementGlyph
              icon={requirement.icon}
              className="size-5 text-brand"
            />
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
            <RequirementGlyph
              icon={requirement.icon}
              className="size-6 shrink-0 text-brand"
            />
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
      <div className="flex items-center gap-3 px-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-alt">
          <RequirementGlyph icon="document" className="size-5" />
        </span>
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
            <RequirementGlyph icon="document" className="size-6 shrink-0" />
          }
          onDelete={handleDeleteClick}
          className="mt-3"
        />
      )}
    </li>
  );
}
