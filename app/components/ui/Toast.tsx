import { useEffect } from "react";
import { CheckCircleIcon, CloseIcon } from "~/components/ui/icons";

/** Success toast pinned to the top-right edge of the viewport (Figma
 *  "Rectangle 18339"): pale-green pill rounded on the left only, with a
 *  check icon, bold title, message and a close button. Auto-dismisses
 *  after `duration` ms (pass 0 to keep it until manually closed). */
export function Toast({
  title,
  message,
  onClose,
  duration = 5000,
}: {
  title: string;
  message?: string;
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
      className="fixed top-15 right-0 z-50 flex items-start gap-3 rounded-l-full border border-line bg-success-soft py-3.5 pr-6 pl-5 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-accent" />
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        {message ? (
          <p className="mt-0.5 text-[13px] text-ink-soft">{message}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="mt-0.5 ml-2 text-muted-500 hover:text-ink"
      >
        <CloseIcon className="size-4" />
      </button>
    </div>
  );
}
