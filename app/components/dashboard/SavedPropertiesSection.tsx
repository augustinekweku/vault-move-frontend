import { MOCK_LISTINGS } from "~/data/listings";
import { useWishlist } from "~/lib/wishlist";
import { PropertyGrid } from "~/components/property/PropertyGrid";

/** Saved-properties grid: the wishlist's properties from the listings, or a
 *  muted empty state before anything is saved. Unsaving a card removes it
 *  from the grid. */
export function SavedPropertiesSection({ className }: { className?: string }) {
  const wishlist = useWishlist();
  const savedProperties = MOCK_LISTINGS.filter((property) =>
    wishlist.includes(property.id),
  );

  return (
    <section className={className}>
      {savedProperties.length > 0 ? (
        <PropertyGrid properties={savedProperties} />
      ) : (
        <p className="text-sm text-ink/60">
          You haven&rsquo;t saved any properties yet.
        </p>
      )}
    </section>
  );
}
