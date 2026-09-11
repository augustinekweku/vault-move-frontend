import type { Agent } from "~/types";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { ProfileChip } from "~/components/common/ProfileChip";
import { MailIcon } from "~/components/ui/icons";

interface TenantCardProps {
  tenant: Agent;
  /** Portal enquiries page the Message action links to. */
  messageHref: string;
  className?: string;
}

/** "Tenant" card in the portal deal workspace sidebar: the tenant chip
 *  (avatar with verified badge, name, Verified line) above the
 *  full-width "Message" and "View Profile" buttons. */
export function TenantCard({ tenant, messageHref, className }: TenantCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <h2 className="text-base font-extrabold text-black">Tenant</h2>

      <ProfileChip
        avatar={tenant.avatar}
        name={tenant.name}
        verified={tenant.verified}
        subline={
          <p className="mt-0.5 text-sm text-brand-navy/54">Verified</p>
        }
        className="mt-4"
      />

      <Button to={messageHref} className="mt-4 w-full">
        <MailIcon aria-hidden className="size-4.5" />
        Message
      </Button>
      {/* TODO: link to the tenant profile once the route exists. */}
      <Button variant="outline" className="mt-3 w-full">
        View Profile
      </Button>
    </article>
  );
}
