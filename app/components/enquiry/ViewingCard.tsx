import type { ViewingStatus } from "~/types";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "~/components/ui/icons";

interface ViewingCardProps {
  /** e.g. "Monday, 2nd June 2026". */
  date: string;
  /** e.g. "10:00 AM". */
  time: string;
  /** Lifecycle status — drives the action row (see below). */
  status?: ViewingStatus;
  /** "Make an Offer" (completed status) — opens the offer form in the
   *  Offers tab. */
  onMakeOffer?: () => void;
  className?: string;
}

const primaryButton =
  "mt-4 w-full rounded-lg bg-brand py-3 text-sm text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90";

/** The "Viewing Scheduled" card the landlord shares in the enquiry chat: a
 *  brand-blue calendar in a tinted circle beside the label + date/time
 *  (split by a vertical divider). The action row depends on `status`:
 *  confirm + cancel buttons (upcoming), a "Make an Offer" button
 *  (completed — wired via `onMakeOffer`) or a red "Cancelled" status bar.
 *  The remaining actions are visual mocks until the backend is live. */
export function ViewingCard({
  date,
  time,
  status = "upcoming",
  onMakeOffer,
  className,
}: ViewingCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-line bg-white p-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div className="mt-2 flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-alt">
          <CalendarIcon className="size-6 text-brand" />
        </span>
        <div className="min-w-0">
          <p className="text-xs leading-6 text-muted-500">Viewing Scheduled</p>
          <p className="flex flex-wrap items-center gap-2 text-base leading-6 font-bold text-ink">
            <span>{date}</span>
            <span aria-hidden className="h-6 w-px shrink-0 bg-muted-300" />
            <span>{time}</span>
          </p>
        </div>
      </div>
      {status === "upcoming" && (
        <>
          <button type="button" className={primaryButton}>
            I have viewed this property
          </button>
          <button
            type="button"
            className="mt-5 w-full rounded-lg border border-line bg-white py-2.5 text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
          >
            Cancel Viewing
          </button>
        </>
      )}
      {status === "completed" && (
        <button type="button" onClick={onMakeOffer} className={primaryButton}>
          Make an Offer
        </button>
      )}
      {status === "cancelled" && (
        <p className="mt-4 w-full rounded-lg bg-[#d92d20] py-3 text-center text-sm text-white">
          Cancelled
        </p>
      )}
    </article>
  );
}
