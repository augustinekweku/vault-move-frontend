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
      className="fixed top-20 right-0 z-50 max-w-[calc(100vw-1rem)] rounded-l-[60px] border border-line bg-success-soft py-3 pr-6 pl-5 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-start gap-4">
        {/* mt-0.5 parks the circle level with the title rather than centred
            against the whole title+message block. */}
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-white">
          <img src="/icons/check-circle.svg" alt="" className="size-4.5" />
        </span>
        {/* max-w-80 caps long messages at a readable width — only kicks in
            for long messages; short ones keep the pill hugging content. */}
        <div className="max-w-80 pr-2">
          <p className="text-sm leading-6 font-bold text-ink-soft">{title}</p>
          {message ? (
            <p className="text-sm leading-6 text-ink-soft mt-1">{message}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="mt-1 ml-1 text-brand-dark hover:text-ink"
        >
          <CloseIcon className="size-3.5" />
        </button>
      </div>
      {steps?.length ? (
        /* ml-18 lines the checklist up with the title/message column
           (padding + circle + gap). */
        <ul className="mt-5 md:mt-6 mb-1 ml-18 flex flex-col gap-1">
          {steps.map((step) => (
            <li
              key={step.label}
              className="flex items-center gap-2 text-sm leading-6"
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
