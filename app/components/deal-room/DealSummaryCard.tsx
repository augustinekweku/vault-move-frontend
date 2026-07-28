import type { Deal } from "~/types";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/Badge";
import {
  CalendarIcon,
  FlagIcon,
  LocationIcon,
} from "~/components/ui/icons";

interface DealSummaryCardProps {
  deal: Deal;
  /** e.g. "30th June 2026". */
  startedDate: string;
  className?: string;
}

/** Header card of the deal detail page: the property summary (thumbnail,
 *  badge, title, location and move-in date) on the left; the deal reference
 *  + started date at the top right and the red-outline "Report an Issue"
 *  button pinned to the bottom right (a visual mock for now). */
export function DealSummaryCard({
  deal,
  startedDate,
  className,
}: DealSummaryCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-6 rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)] sm:h-45.75 sm:flex-row",
        className,
      )}
    >
      <img
        src={deal.image}
        alt={deal.propertyTitle}
        className="h-44 w-full shrink-0 rounded-xl border border-line object-cover sm:h-37.75 sm:w-37.75"
      />

      <div className="min-w-0 flex-1">
        <Badge>{deal.propertyTag}</Badge>
        <h1 className="mt-1.5 text-base font-extrabold text-black">
          {deal.propertyTitle}
        </h1>
        <ul className="mt-2 space-y-1.5 text-xs leading-6 text-muted-500">
          <li className="flex items-center gap-2">
            <LocationIcon aria-hidden className="size-6 shrink-0" />
            <span>Location - {deal.location}</span>
          </li>
          <li className="flex items-center gap-2">
            <CalendarIcon aria-hidden className="size-6 shrink-0" />
            <span>Move in date- {deal.date}</span>
          </li>
        </ul>
      </div>

      <div className="flex shrink-0 flex-col justify-between gap-4 sm:items-end sm:text-right">
        <div>
          <p className="text-sm font-semibold text-ink">
            Deal ID: {deal.reference}
          </p>
          <p className="mt-1 text-xs text-muted-500">
            Started: {startedDate}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 self-start rounded-lg border border-[#d92d20]/40 px-4 py-2 text-sm text-[#d92d20] hover:bg-[#d92d20]/5 sm:self-end"
        >
          <FlagIcon aria-hidden className="size-4" />
          Report an Issue
        </button>
      </div>
    </article>
  );
}
