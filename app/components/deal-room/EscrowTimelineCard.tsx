import type { EscrowTimelineItem } from "~/types";
import { cn } from "~/lib/utils";
import { CheckCircleBadge } from "~/components/deal-room/PaymentPanel";

interface EscrowTimelineCardProps {
  /** Milestones, in order. */
  items: EscrowTimelineItem[];
  className?: string;
}

/** Module-level so the list `.map()` takes a named function, not an inline
 *  callback. */
function renderItem(item: EscrowTimelineItem) {
  return (
    <li key={item.label} className="flex items-start gap-6">
      <CheckCircleBadge done={item.done} />
      <div>
        <p className="text-base font-semibold text-brand-navy/54">
          {item.label}
        </p>
        <p className="text-sm text-brand-navy/54">
          {item.done ? "done" : "pending"}
        </p>
      </div>
    </li>
  );
}

/** The payment-step sidebar card: the escrow milestones and their state. */
export function EscrowTimelineCard({
  items,
  className,
}: EscrowTimelineCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-line bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <h3 className="text-base font-bold text-ink">Escrow Timeline</h3>
      <ul className="mt-6 space-y-5 sm:space-y-8">{items.map(renderItem)}</ul>
    </article>
  );
}
