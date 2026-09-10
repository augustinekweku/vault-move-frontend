import { cn } from "~/lib/utils";
import { ChevronDownIcon } from "~/components/ui/icons";
import { LISTINGS_FOOTER_NOTE } from "~/data/listing";

interface ListingsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function pageNumbers(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

/** Table footer of the portal Listings page: the range note on the left,
 *  prev / numbered / next controls on the right. Page switches are visual
 *  until the listings API paginates (see the section TODO). */
export function ListingsPagination({
  page,
  totalPages,
  onPageChange,
}: ListingsPaginationProps) {
  function handlePageClick(event: React.MouseEvent<HTMLButtonElement>) {
    onPageChange(Number(event.currentTarget.dataset.page));
  }

  function renderPageButton(pageNumber: number) {
    const isActive = pageNumber === page;
    return (
      <button
        key={pageNumber}
        type="button"
        data-page={pageNumber}
        onClick={handlePageClick}
        aria-label={`Go to page ${pageNumber}`}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex size-8 items-center justify-center rounded-md border text-sm transition-colors",
          isActive
            ? "border-brand bg-brand font-medium text-white"
            : "border-line text-muted-500 hover:border-brand hover:text-brand",
        )}
      >
        {pageNumber}
      </button>
    );
  }

  const pagerButton =
    "flex size-8 items-center justify-center rounded-md border border-line text-muted-500 transition-colors hover:border-brand hover:text-brand disabled:opacity-40 disabled:hover:border-line disabled:hover:text-muted-500";

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-500">{LISTINGS_FOOTER_NOTE}</p>
      <nav aria-label="Listings pages" className="flex items-center gap-2">
        <button
          type="button"
          data-page={page - 1}
          onClick={handlePageClick}
          disabled={page <= 1}
          aria-label="Go to previous page"
          className={pagerButton}
        >
          <ChevronDownIcon className="size-4 rotate-90" />
        </button>
        {pageNumbers(totalPages).map(renderPageButton)}
        <button
          type="button"
          data-page={page + 1}
          onClick={handlePageClick}
          disabled={page >= totalPages}
          aria-label="Go to next page"
          className={pagerButton}
        >
          <ChevronDownIcon className="size-4 -rotate-90" />
        </button>
      </nav>
    </div>
  );
}
