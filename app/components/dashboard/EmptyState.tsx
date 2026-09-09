import { cn } from "~/lib/utils";
import { DASHBOARD_EMPTY_STATE } from "~/data/dashboard";

const GHOST_ICON = "/icons/ghost.svg";

/** Shared dashboard empty state: ghost mark with the "Nothing to see here"
 *  headline and its guidance line (Recent Listings, Messages). */
export function EmptyState({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <img src={GHOST_ICON} alt="" className="size-29.25" />
      <p className="mt-10 text-[13px] leading-8.25 font-medium tracking-[-0.02em] text-gray-3">
        {DASHBOARD_EMPTY_STATE.title}
      </p>
      <p className="max-w-58.75 text-xs leading-3.75 tracking-[0.01em] text-gray-3">
        {DASHBOARD_EMPTY_STATE.body}
      </p>
    </div>
  );
}
