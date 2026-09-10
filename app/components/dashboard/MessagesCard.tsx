import { cn } from "~/lib/utils";
import { EmptyState } from "~/components/dashboard/EmptyState";

export interface DashboardMessage {
  sender: string;
  time: string;
  body: string;
}

/** "Messages" panel card: the latest system message once documents are
 *  submitted, otherwise the shared empty state. */
export function MessagesCard({
  className,
  message,
}: {
  className?: string;
  message?: DashboardMessage;
}) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <h2 className="text-base font-semibold text-ink">Messages</h2>
      {message ? (
        <div className="mt-3 border-y border-line-soft py-3">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-medium text-ink">{message.sender}</p>
            <p className="shrink-0 text-xs text-muted-400">{message.time}</p>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-500">
            {message.body}
          </p>
        </div>
      ) : (
        <EmptyState className="flex-1 justify-center py-10" />
      )}
    </section>
  );
}
