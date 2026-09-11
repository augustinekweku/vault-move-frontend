import type { ReactNode } from "react";
import { cn } from "~/lib/utils";
import { VerifiedIcon } from "~/components/ui/icons";

interface ProfileChipProps {
  avatar: string;
  name: string;
  /** Shows the verified badge overlapping the avatar. */
  verified?: boolean;
  /** Second line under the name — a role label, a profile link, etc. */
  subline?: ReactNode;
  /** Trailing action, e.g. the message shortcut. */
  action?: ReactNode;
  className?: string;
}

/** Person chip shared by the deal-room, enquiry and offer surfaces: photo
 *  avatar with verified badge, bold brand-navy name and a sub-line inside
 *  the tinted rounded shell. */
export function ProfileChip({
  avatar,
  name,
  verified = false,
  subline,
  action,
  className,
}: ProfileChipProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl bg-surface-alt p-3",
        className,
      )}
    >
      <div className="relative size-9 shrink-0">
        <img
          src={avatar}
          alt=""
          className="size-full rounded-full object-cover"
        />
        {verified && (
          <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-white">
            <VerifiedIcon className="size-3.5 text-black" />
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-brand-navy">{name}</p>
        {subline}
      </div>
      {action}
    </div>
  );
}
