import { cn } from "~/lib/utils";
import { EmptyState } from "~/components/dashboard/EmptyState";

/** "Messages" panel card: centred empty state until the signed-in account
 *  has conversations. */
export function MessagesCard({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-lg border border-line-soft bg-white p-4",
        className,
      )}
    >
      <h2 className="text-base font-semibold text-ink">Messages</h2>
      <EmptyState className="flex-1 justify-center py-10" />
    </section>
  );
}
