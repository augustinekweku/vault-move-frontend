import type { Deal } from "~/types";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/Badge";
import {
  CalendarIcon,
  IdIcon,
  LocationIcon,
  SidebarIcon,
} from "~/components/ui/icons";

interface DealCardProps {
  deal: Deal;
  className?: string;
}

/** One deal-room card: the property summary (thumbnail, listing badge,
 *  title and the location / deal-ID / date icon rows) beside the
 *  verification panel — the steps-completed line, the "Complete your
 *  Verification" prompt and the next-step action button (a visual mock
 *  until the verification flow is wired up). */
export function DealCard({ deal, className }: DealCardProps) {
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
        <h2 className="mt-1.5 text-base font-extrabold text-black">
          {deal.propertyTitle}
        </h2>
        <ul className="mt-2 space-y-1.5 text-xs leading-6 text-muted-500">
          <li className="flex items-center gap-2">
            <LocationIcon aria-hidden className="size-6 shrink-0" />
            <span>Location - {deal.location}</span>
          </li>
          <li className="flex items-center gap-2">
            <SidebarIcon aria-hidden className="size-6 shrink-0" />
            <span>Deal ID - {deal.reference}</span>
          </li>
          <li className="flex items-center gap-2">
            <CalendarIcon aria-hidden className="size-6 shrink-0" />
            <span>{deal.date}</span>
          </li>
        </ul>
      </div>

      <div className="flex w-full shrink-0 flex-col rounded-xl border border-line bg-white p-3 shadow-[0_4px_4px_rgba(0,0,0,0.05)] sm:w-97.25">
        <p className="text-xs leading-6 font-medium text-brand">
          {deal.stepsCompleted}/{deal.stepsTotal} Steps completed
        </p>
        <div className="mt-1.5 flex items-center gap-2.5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-alt">
            <IdIcon aria-hidden className="size-6 text-brand" />
          </span>
          <p className="text-base leading-6 font-bold text-ink">
            Complete your Verification
          </p>
        </div>
        <button
          type="button"
          className="mt-2.5 w-full rounded-lg bg-brand py-2.5 text-sm text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90 sm:mt-auto"
        >
          {deal.nextStepLabel}
        </button>
      </div>
    </article>
  );
}
