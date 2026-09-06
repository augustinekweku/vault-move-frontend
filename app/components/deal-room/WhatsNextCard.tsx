import { cn } from "~/lib/utils";

interface WhatsNextCardProps {
  /** Body copy inside the tinted panel. */
  text: string;
  className?: string;
}

/** "What's Next?" card on the deal detail page — a short guidance note in a
 *  tinted panel. */
export function WhatsNextCard({ text, className }: WhatsNextCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <h2 className="text-base font-extrabold text-black">
        What&apos;s Next?
      </h2>
      <p className="mt-4 rounded-xl bg-surface-alt p-4 text-sm leading-6 text-ink/70">
        {text}
      </p>
    </article>
  );
}
