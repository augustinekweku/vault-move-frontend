import { cn } from "~/lib/utils";
import { ChevronDownIcon } from "~/components/ui/icons";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  /** Range note on the left, e.g. "Showing 1-6 Offers". */
  note: string;
  /** Accessible label of the page nav, e.g. "Offers pages". */
  navLabel: string;
  onPageChange: (page: number) => void;
}

function pageNumbers(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

/** Shared footer of the portal tables (Listings, Offers): the range note on
 *  the left, prev / numbered / next controls on the right, split from the
 *  rows by a top hairline. Sections push it to the bottom of the content
 *  well with a flex spacer, so it sits at the viewport bottom on short
 *  pages. Page switches are visual until each API paginates. */
export function TablePagination({
  page,
  totalPages,
  note,
  navLabel,
  onPageChange,
}: TablePaginationProps) {
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
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
      <p className="text-sm text-muted-500">{note}</p>
      <nav aria-label={navLabel} className="flex items-center gap-2">
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
