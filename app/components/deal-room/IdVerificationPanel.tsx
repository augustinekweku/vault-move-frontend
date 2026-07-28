import type { DealRequirement } from "~/types";
import { cn } from "~/lib/utils";
import { IdIcon, UploadIcon } from "~/components/ui/icons";

interface IdVerificationPanelProps {
  /** Documents the renter must upload (Upload action rows). */
  renterRequirements: DealRequirement[];
  /** Documents awaited from the landlord (Pending action rows). */
  landlordRequirements: DealRequirement[];
  className?: string;
}

/** Renders one requirement row — module-level so both list `.map()`s take a
 *  named function, not an inline callback. */
function renderRequirement(requirement: DealRequirement) {
  return (
    <li
      key={requirement.id}
      className="flex items-center gap-3 rounded-xl border border-line-soft p-3"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-alt">
        <IdIcon aria-hidden className="size-5 text-brand" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ink">{requirement.title}</p>
        {requirement.description && (
          <p className="mt-0.5 text-xs text-muted-500">
            {requirement.description}
          </p>
        )}
      </div>
      {requirement.state === "upload" ? (
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
        >
          <UploadIcon aria-hidden className="size-4" />
          Upload
        </button>
      ) : (
        <span className="shrink-0 rounded-lg border border-line px-4 py-2 text-sm text-muted-400">
          Pending
        </span>
      )}
    </li>
  );
}

/** The "ID Verification" step panel of the deal detail page: the renter's
 *  outstanding uploads followed by the documents awaited from the landlord.
 *  The Upload actions are visual mocks until the document flow is wired. */
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
        {renterRequirements.map(renderRequirement)}
      </ul>

      <h4 className="mt-8 text-sm font-bold text-ink">
        Required from landlord
      </h4>
      <p className="mt-1 text-sm text-muted-500">
        We&apos;re verifying your information and documents. Some documents
        required from the landlord.
      </p>
      <ul className="mt-3 space-y-3">
        {landlordRequirements.map(renderRequirement)}
      </ul>
    </article>
  );
}
