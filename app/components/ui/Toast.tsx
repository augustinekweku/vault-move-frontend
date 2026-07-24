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
      className="fixed top-20 right-0 z-50 flex min-h-25 items-center gap-6 rounded-l-[60px] border border-line bg-success-soft py-4 pr-8 pl-6 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white">
        <CheckCircleIcon className="size-6 text-[#48cc99]" />
      </span>
      <div className="pr-4">
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
  );
}
