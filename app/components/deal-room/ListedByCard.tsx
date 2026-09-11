import { Link } from "react-router";
import type { Agent } from "~/types";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { ProfileChip } from "~/components/common/ProfileChip";
import { MailIcon } from "~/components/ui/icons";

interface ListedByCardProps {
  landlord: Agent;
  /** Enquiry chat the "Message Landlord" actions link to. */
  messageHref: string;
  className?: string;
}

/** "Listed By" card on the deal detail page: the landlord chip (avatar with
 *  verified badge, name, role and a mail shortcut) above the full-width
 *  "Message Landlord" and "View Profile" buttons. */
export function ListedByCard({
  landlord,
  messageHref,
  className,
}: ListedByCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <h2 className="text-base font-extrabold text-black">Listed By</h2>

      <ProfileChip
        avatar={landlord.avatar}
        name={landlord.name}
        verified={landlord.verified}
        subline={
          <p className="mt-0.5 text-sm text-brand-navy/54">{landlord.role}</p>
        }
        action={
          <Link
            to={messageHref}
            aria-label="Message Landlord"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white hover:bg-brand/90"
          >
            <MailIcon aria-hidden className="size-4.5" />
          </Link>
        }
        className="mt-4"
      />

      <Button to={messageHref} className="mt-4 w-full">
        <MailIcon aria-hidden className="size-4.5" />
        Message Landlord
      </Button>
      <Button
        to={`/landlords/${landlord.id}`}
        variant="outline"
        className="mt-3 w-full"
      >
        View Profile
      </Button>
    </article>
  );
}
