import type { PortalDealDetail } from "~/types";
import { DealProgressSection } from "~/components/deal-room/DealProgressSection";
import { WhatsNextCard } from "~/components/deal-room/WhatsNextCard";
import { PortalDocumentsPanel } from "~/components/deals/PortalDocumentsPanel";
import { PortalDealPropertyCard } from "~/components/deals/PortalDealPropertyCard";
import { TenantCard } from "~/components/deals/TenantCard";

/** Body of the portal deal workspace: the step tab bar (opening on the
 *  landlord's Documents step with only the viewed tab underlined, later
 *  steps reuse the shared step panels) beside the property, tenant and
 *  What's Next? sidebar. The tab bar and the property image share a top
 *  edge, with breathing room under the portal header. The guidance card
 *  shows the Documents copy the workspace opens on. */
export function PortalDealDetailSection({
  detail,
}: {
  detail: PortalDealDetail;
}) {
  const { deal, details, tenant } = detail;
  const whatsNext = details.whatsNext[0];

  return (
    <div className="flex flex-col gap-8 pt-2 lg:flex-row">
      <div className="min-w-0 flex-1">
        <DealProgressSection
          details={details}
          initialStep={0}
          hideHeading
          activeTabOnly
          documentsPanel={
            <PortalDocumentsPanel
              landlordRequirements={details.landlordRequirements}
              tenantRequirements={details.renterRequirements}
              className="mt-6"
            />
          }
        />
      </div>
      <div className="w-full shrink-0 space-y-8 lg:w-86.25">
        <PortalDealPropertyCard
          deal={deal}
          tag={detail.propertyTag}
          rating={detail.rating}
          ratingLabel={detail.ratingLabel}
          monthlyRent={detail.monthlyRent}
        />
        <TenantCard tenant={tenant} messageHref="/dashboard/enquiries" />
        {whatsNext && <WhatsNextCard text={whatsNext} />}
      </div>
    </div>
  );
}
