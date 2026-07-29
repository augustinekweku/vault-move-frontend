import { cn } from "~/lib/utils";
import { HANDOVER_CONFIRMATION } from "~/data/deals";

/** The "Closing" step panel of the deal detail page: the centred success
 *  state once the handover is confirmed — check badge, confirmation copy,
 *  "Rate this experience" and "Download Certificate" (both visual mocks
 *  until the flows are wired). */
export function ClosingPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col items-center py-16 text-center", className)}
    >
      <span className="flex size-20 items-center justify-center rounded-full bg-[#edf1fa]">
        <img src="/icons/success.svg" alt="" className="size-10" />
      </span>
      <h3 className="mt-6 text-xl font-bold text-ink">
        {HANDOVER_CONFIRMATION.title}
      </h3>
      <p className="mt-3 max-w-md text-sm text-muted-500">
        {HANDOVER_CONFIRMATION.body}
      </p>
      <button
        type="button"
        className="mt-8 w-full max-w-xs rounded-lg bg-brand px-6 py-2.5 text-sm text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90"
      >
        Rate this experience
      </button>
      <button
        type="button"
        className="mt-4 text-sm text-muted-500 hover:text-brand"
      >
        Download Certificate
      </button>
    </div>
  );
}
