import type { DealRequirement } from "~/types";
import { cn } from "~/lib/utils";
import { RequirementRow } from "~/components/deal-room/RequirementRows";

interface IdVerificationPanelProps {
  /** Documents the renter must upload (Upload action rows). */
  renterRequirements: DealRequirement[];
  /** Documents awaited from the landlord (Pending action rows). */
  landlordRequirements: DealRequirement[];
  className?: string;
}

/** How long the landlord rows wait before flipping to Review — mocking the
 *  landlord sending their documents — and the extra stagger per row. */
const REVIEW_DELAY_MS = 6000;
const REVIEW_STAGGER_MS = 2500;

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
 *  few seconds in — until the document flow is wired. */
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
