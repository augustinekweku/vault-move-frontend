import type { ListingDraft } from "~/types";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { EmptyState } from "~/components/dashboard/EmptyState";
import { ListingDraftCard } from "~/components/dashboard/ListingDraftCard";
import { MOCK_LISTING_DRAFTS } from "~/data/listing";

/** "Recent Listings" panel: the heading with the add-listing action and —
 *  until the signed-in account has listings — the in-progress drafts, falling
 *  back to the shared empty state when there are none. `published` flips the
 *  draft cards to their Active Listing state after the publish flow lands
 *  back here (per-listing status comes from the listings API when live). */
export function RecentListings({
  className,
  published = false,
}: {
  className?: string;
  published?: boolean;
}) {
  // Needs the published flag, so the row renderer lives with the state.
  function renderDraft(draft: ListingDraft) {
    return (
      <li key={draft.id}>
        <ListingDraftCard draft={draft} active={published} />
      </li>
    );
  }

  return (
    <section className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-ink">Recent Listings</h2>
        <Button
          to="/dashboard/create-listing"
          variant="outline"
          size="sm"
          className="h-9 border-line px-4 text-sm text-muted-700"
        >
          Add new listing
        </Button>
      </div>

      {MOCK_LISTING_DRAFTS.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-4">
          {MOCK_LISTING_DRAFTS.map(renderDraft)}
        </ul>
      ) : (
        <EmptyState className="min-h-80 flex-1 justify-center py-10" />
      )}
    </section>
  );
}
