import { useEffect } from "react";
import type { ToastStep } from "~/types";
import { cn } from "~/lib/utils";
import { AlertIcon, CloseIcon, PendingIcon } from "~/components/ui/icons";

/** Toast pinned to the top-right edge of the viewport: a pill rounded on
 *  the left only, with a status icon, bold title, message and a close
 *  button. `variant` switches the success treatment (pale green,
 *  content-width, check) to the error one (pale pink fixed-width pill, alert
 *  glyph, bold headline-sized copy) and raises an assertive live region.
 *  Pass `steps` to add the progress checklist below the message
 *  (enquiry/offer-submitted variants on the message-landlord page).
 *  Width is content-driven but capped just under the viewport so small
 *  screens keep the pill on-screen (the text column wraps instead).
 *  Auto-dismisses after `duration` ms (pass 0 to keep it until manually
 *  closed). */
export function Toast({
  title,
  message,
  steps,
  variant = "success",
  onClose,
  duration = 5000,
}: {
  title: string;
  message?: string;
  steps?: ToastStep[];
  variant?: "success" | "error";
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const isError = variant === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={cn(
        "fixed top-20 right-0 z-50 max-w-[calc(100vw-1rem)] rounded-l-[60px] border border-line shadow-[0px_4px_4px_rgba(0,0,0,0.05)]",
        isError
          ? "w-150 bg-danger-soft px-9 py-4"
          : "bg-success-soft py-3 pr-6 pl-5",
      )}
    >
      <div
        className={cn(
          "flex",
          isError ? "items-center gap-6" : "items-start gap-4",
        )}
      >
        {/* Success parks the circle level with the title rather than centred
            against the whole title+message block; the error circle stays
            centred against its taller copy. */}
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-white",
            isError ? "size-12" : "mt-0.5 size-9",
          )}
        >
          {isError ? (
            <AlertIcon className="size-6 text-alert" />
          ) : (
            <img src="/icons/check-circle.svg" alt="" className="size-4.5" />
          )}
        </span>
        {/* max-w-80 caps long success messages at a readable width — only kicks
            in for long messages; short ones keep the pill hugging content. The
            error copy fills its fixed pill instead. */}
        <div className={cn(isError ? "min-w-0 flex-1" : "max-w-80 pr-2")}>
          <p
            className={
              isError
                ? "text-lg leading-8 font-bold text-ink-soft"
                : "text-sm leading-6 font-bold text-ink-soft"
            }
          >
            {title}
          </p>
          {message ? (
            <p
              className={
                isError
                  ? "text-lg leading-8 text-ink-soft"
                  : "text-sm leading-6 text-ink-soft mt-3"
              }
            >
              {message}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className={cn(
            "ml-1 shrink-0 text-brand-dark hover:text-ink",
            !isError && "mt-1",
          )}
        >
          <CloseIcon className={isError ? "size-4" : "size-3.5"} />
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
