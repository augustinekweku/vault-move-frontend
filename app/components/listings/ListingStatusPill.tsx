import type { PortalListingStatus } from "~/types";
import { cn } from "~/lib/utils";

const STYLES: Record<PortalListingStatus, { pill: string; dot: string }> = {
  active: {
    pill: "border-accent bg-accent/24 text-brand-navy",
    dot: "bg-accent",
  },
  pending: {
    pill: "border-warning bg-warning/10 text-brand-navy",
    dot: "bg-warning",
  },
  inactive: {
    pill: "border-line bg-surface-alt text-muted-500",
    dot: "bg-muted-400",
  },
};

const LABELS: Record<PortalListingStatus, string> = {
  active: "Active",
  pending: "Pending review",
  inactive: "Inactive",
};

/** Status pill of a portal Listings row: dot + label. */
export function ListingStatusPill({ status }: { status: PortalListingStatus }) {
  const styles = STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-md border px-1.5 py-0.75 text-[8px] whitespace-nowrap",
        styles.pill,
      )}
    >
      <span aria-hidden className={cn("size-2.5 rounded-full", styles.dot)} />
      <span className="translate-y-px leading-none">{LABELS[status]}</span>
    </span>
  );
}
