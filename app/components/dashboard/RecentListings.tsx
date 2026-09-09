import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { EmptyState } from "~/components/dashboard/EmptyState";

/** "Recent Listings" panel: the heading with the add-listing action and —
 *  until the signed-in account has listings — the shared empty state. */
export function RecentListings({ className }: { className?: string }) {
  return (
    <section className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-ink">Recent Listings</h2>
        {/* The add-listing form isn't built yet, so the button stays inert. */}
        <Button
          variant="outline"
          size="sm"
          className="h-9 border-line px-4 text-sm text-muted-700"
        >
          Add new listing
        </Button>
      </div>

      <EmptyState className="min-h-80 flex-1 justify-center py-10" />
    </section>
  );
}
