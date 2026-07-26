import { useEffect } from "react";
import type { ToastStep } from "~/types";
import { cn } from "~/lib/utils";
import { CheckCircleIcon, CloseIcon } from "~/components/ui/icons";

/** Success toast pinned to the top-right edge of the viewport: a pale-green
 *  pill rounded on the left only, with a check icon, bold title, message
 *  and a close button. Pass `steps` to add the progress checklist below the
 *  message (enquiry-submitted variant on the message-landlord page).
 *  Auto-dismisses after `duration` ms (pass 0 to keep it until manually
 *  closed). */
export function Toast({
  title,
  message,
  steps,
  onClose,
  duration = 5000,
}: {
  title: string;
  message?: string;
  steps?: ToastStep[];
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      role="status"
      className="fixed top-20 right-0 z-50 rounded-l-[60px] border border-line bg-success-soft py-4 pr-8 pl-6 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      <div className="flex min-h-25 items-center gap-6">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white">
          <CheckCircleIcon className="size-6 text-[#48cc99]" />
        </span>
        {/* max-w-105 caps long messages at a readable width — only kicks in
            for long messages; short ones keep the pill hugging content. */}
        <div className="max-w-105 pr-4">
          <p className="text-lg leading-8 font-bold text-ink-soft">{title}</p>
          {message ? (
            <p className="text-lg leading-8 text-ink-soft">{message}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="ml-2 self-start text-brand-dark hover:text-ink"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>
      {steps?.length ? (
        /* ml-18 + the container's pl-6 = 96px, aligning the checklist under
           the title/message column. */
        <ul className="mt-1 mb-2 ml-18 flex flex-col gap-2.5">
          {steps.map((step) => (
            <li key={step.label} className="flex items-center gap-2 text-sm">
              {step.done ? (
                <CheckCircleIcon className="size-4 shrink-0 text-[#48cc99]" />
              ) : (
                <span
                  aria-hidden
                  className="size-4 shrink-0 rounded-full border border-muted-400 bg-white"
                />
              )}
              <span
                className={cn(step.done ? "text-ink-soft" : "text-muted-500")}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
