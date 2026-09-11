import type { DealRequirement } from "~/types";
import { cn } from "~/lib/utils";
import {
  ContractDocumentRow,
  RequirementRow,
} from "~/components/deal-room/RequirementRows";

interface PortalDocumentsPanelProps {
  /** Documents the landlord must upload (Upload action rows). */
  landlordRequirements: DealRequirement[];
  /** Documents awaited from the tenant (disabled Pending action rows). */
  tenantRequirements: DealRequirement[];
  className?: string;
}

/** Module-level so both list `.map()`s take named functions, not inline
 *  callbacks. */
function renderLandlordRow(requirement: DealRequirement) {
  return <RequirementRow key={requirement.id} requirement={requirement} />;
}

function renderTenantRow(requirement: DealRequirement) {
  return <ContractDocumentRow key={requirement.id} requirement={requirement} />;
}

/** The "Documents" step panel of the portal deal workspace: the landlord's
 *  own proofs to upload ("Required from you", bordered cards) followed by
 *  the documents awaited from the tenant ("Required from Tenant", bare
 *  divider rows). Uploads are simulated locally until the document flow is
 *  wired. */
export function PortalDocumentsPanel({
  landlordRequirements,
  tenantRequirements,
  className,
}: PortalDocumentsPanelProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-line bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <h3 className="text-base font-bold text-ink">
        Upload property documents
      </h3>
      <p className="mt-1 text-sm text-muted-500">
        We&apos;re verifying your information and documents. Some documents
        required from the landlord.
      </p>

      <h4 className="mt-6 text-sm font-bold text-ink">Required from you</h4>
      <ul className="mt-3 space-y-3">
        {landlordRequirements.map(renderLandlordRow)}
      </ul>

      <h4 className="mt-8 text-sm font-bold text-ink">
        Required from Tenant
      </h4>
      <p className="mt-1 text-sm text-muted-500">
        We&apos;re verifying your information and documents. Some documents
        required from the landlord.
      </p>
      <ul className="mt-7 space-y-4 sm:mt-6">
        {tenantRequirements.map(renderTenantRow)}
      </ul>
    </article>
  );
}
