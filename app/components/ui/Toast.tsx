import { useEffect } from "react";
import type { ToastStep } from "~/types";
import { cn } from "~/lib/utils";
import { CloseIcon, PendingIcon } from "~/components/ui/icons";

/** Success toast pinned to the top-right edge of the viewport: a pale-green
 *  pill rounded on the left only, with a check icon, bold title, message
 *  and a close button. Pass `steps` to add the progress checklist below the
 *  message (enquiry/offer-submitted variants on the message-landlord page).
 *  Width is content-driven but capped just under the viewport so small
 *  screens keep the pill on-screen (the text column wraps instead).
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
        className="fixed top-20 right-0 z-50 max-w-[calc(100vw-1rem)] rounded-l-[60px] border border-line bg-success-soft py-4 pr-8 pl-6 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-start gap-6">
        {/* mt-2.5 parks the circle level with the title rather than centred
            against the whole title+message block. */}
        <span className="mt-2.5 flex size-12 shrink-0 items-center justify-center rounded-full bg-white">
          <img src="/icons/check-circle.svg" alt="" className="size-6" />
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
          className="mt-2.25 ml-2 text-brand-dark hover:text-ink"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>
      {steps?.length ? (
        <ul className="mt-10 mb-3.25 ml-14.25 flex flex-col gap-1.5">
          {steps.map((step) => (
            <li
              key={step.label}
              className="flex items-center gap-2 text-lg leading-8"
            >
              {step.done ? (
                <img
                  src="/icons/check-circle.svg"
                  alt=""
                  className="size-4 shrink-0"
                />
              ) : (
                /* The pending glyph is a 16px mark inset 4px in a 24px box —
                   size-6 with -m-1 keeps its mark aligned with the 16px
                   check icons of the done rows. */
                <PendingIcon className="-m-1 size-6 shrink-0 text-black/24" />
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
