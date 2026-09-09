import { useEffect } from "react";
import { cn } from "~/lib/utils";

/** Right-anchored slide-over sheet over a dimmed backdrop: task flows that
 *  sit beside the page instead of covering it. Closes on backdrop click and
 *  Escape. Only rendered while `open`, so SSR markup stays deterministic —
 *  the enter motion is a mount-only CSS animation. */
export function Sheet({
  open,
  onClose,
  labelledBy,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  /** id of the element that titles the dialog (aria-labelledby). */
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden
        onClick={onClose}
        className="vm-fade-in absolute inset-0 bg-black/50"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          "vm-sheet-in absolute top-0 right-0 h-full w-full overflow-y-auto bg-white shadow-xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
