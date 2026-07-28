import type { DealRequirement } from "~/types";
import { cn } from "~/lib/utils";
import { ContractDocumentRow } from "~/components/deal-room/RequirementRows";

interface RentersContractPanelProps {
  /** Documents the landlord shared for review (Review action rows). */
  documents: DealRequirement[];
  /** Signed copies the renter must upload (Upload action rows). */
  signedContracts: DealRequirement[];
  className?: string;
}

/** Module-level so both list `.map()`s take a named function, not an inline
 *  callback. */
function renderDocumentRow(requirement: DealRequirement) {
  return <ContractDocumentRow key={requirement.id} requirement={requirement} />;
}

/** The "Renters Contract" step panel of the deal detail page: the documents
 *  the landlord shared for review, then the renter's signed-copy uploads.
 *  The Review actions are visual mocks until the document viewer is wired. */
export function RentersContractPanel({
  documents,
  signedContracts,
  className,
}: RentersContractPanelProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-line bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <h3 className="text-base font-bold text-ink">Renters Contract</h3>
      <p className="mt-1 text-sm text-muted-500">
        Your landlord has shared the tenancy agreement for your review. Read
        through the document carefully and, if you have any questions or
        concerns, contact the landlord before signing.
      </p>
      <ul className="mt-7 sm:mt-6 space-y-4">
        {documents.map(renderDocumentRow)}
      </ul>

      <h4 className="mt-8 text-sm font-bold text-ink">Signed Contracts</h4>
      <p className="mt-1 text-sm text-muted-500">
        Upload a signed copy of the renters contract.
      </p>
      <ul className="mt-4 space-y-4">
        {signedContracts.map(renderDocumentRow)}
      </ul>
    </article>
  );
}
