import type { LandlordProfile } from "~/types";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import {
  LocationIcon,
  MailIcon,
  StarIcon,
  VerifiedIcon,
} from "~/components/ui/icons";

interface LandlordHeaderProps {
  landlord: LandlordProfile;
  /** Where the "Message Landlord" button links (the enquiry chat). */
  messageHref?: string;
  className?: string;
}

/** Identity block of the landlord profile page: avatar with verified badge,
 *  name, role, location, star rating and the "Message Landlord" action. */
export function LandlordHeader({
  landlord,
  messageHref,
  className,
}: LandlordHeaderProps) {
  const messageLabel = (
    <>
      <MailIcon className="size-4.5" />
      Message Landlord
    </>
  );
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex items-center gap-6">
        <div className="relative size-38.75 shrink-0">
          <img
            src={landlord.avatar}
            alt={landlord.name}
            className="size-full rounded-full object-cover"
          />
          {landlord.verified && (
            <span className="absolute right-1 bottom-1 flex size-9 items-center justify-center rounded-full bg-white">
              <VerifiedIcon className="size-7 text-brand" />
            </span>
          )}
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            {landlord.name}
          </h2>
          <p className="mt-1 text-sm text-ink/60">{landlord.role}</p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/60">
            <LocationIcon className="size-5 text-muted-500" />
            {landlord.location}
          </p>
          <p className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-5",
                  i < Math.round(landlord.rating) ? "text-star" : "text-line",
                )}
              />
            ))}
            <span className="ml-2 text-sm text-ink/60">
              {landlord.rating.toFixed(1)}/5.0
            </span>
          </p>
        </div>
      </div>
      {messageHref ? (
        <Button to={messageHref} className="shrink-0">
          {messageLabel}
        </Button>
      ) : (
        <Button className="shrink-0">{messageLabel}</Button>
      )}
    </div>
  );
}
