import { useState } from "react";
import { cn } from "~/lib/utils";
import { FILTER_COLUMNS } from "~/data/listings";
import type { FilterBlock } from "~/types";
import { Modal } from "~/components/ui/Modal";
import { Button } from "~/components/ui/Button";
import { Select } from "~/components/ui/Select";
import { ChevronDownIcon, CloseIcon } from "~/components/ui/icons";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
  /** Called with the number of active filters when the user applies. */
  onApply: (count: number) => void;
}

/** Collapsible section wrapper used by every filter block. */
function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 text-left text-[15px] font-semibold text-brand-dark"
      >
        {title}
        <ChevronDownIcon
          className={cn(
            "size-4.5 shrink-0 text-ink transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

/** Filters dialog opened from the search results page. Selections are
 *  local mock state — applying reports the count up and closes. */
export function FiltersModal({ open, onClose, onApply }: FiltersModalProps) {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [selectValues, setSelectValues] = useState<Record<string, string>>({});
  const [budget, setBudget] = useState("");

  const count =
    Object.values(selections).reduce((n, arr) => n + arr.length, 0) +
    Object.values(selectValues).filter(Boolean).length +
    (budget.trim() ? 1 : 0);

  function toggleOption(groupId: string, option: string) {
    setSelections((prev) => {
      const current = prev[groupId] ?? [];
      return {
        ...prev,
        [groupId]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  }

  function renderBlock(block: FilterBlock) {
    if (block.kind === "options") {
      const selected = selections[block.id] ?? [];
      return (
        <FilterSection key={block.id} title={block.title}>
          <ul className="flex flex-col gap-2.5">
            {block.options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => toggleOption(block.id, option)}
                    className="flex items-center gap-2.5 text-left text-sm text-ink-soft"
                  >
                    <span
                      className={cn(
                        "flex size-4.5 shrink-0 items-center justify-center rounded-full border transition-colors",
                        isSelected
                          ? "border-brand bg-brand"
                          : "border-line bg-white",
                      )}
                    >
                      {isSelected && (
                        <svg
                          viewBox="0 0 10 8"
                          className="size-2.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 4l2.5 2.5L9 1" />
                        </svg>
                      )}
                    </span>
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        </FilterSection>
      );
    }

    if (block.kind === "select") {
      return (
        <FilterSection key={block.id} title={block.title}>
          <Select
            placeholder={block.placeholder}
            options={block.options}
            value={selectValues[block.id] ?? ""}
            onChange={(v) =>
              setSelectValues((prev) => ({ ...prev, [block.id]: v }))
            }
          />
        </FilterSection>
      );
    }

    return (
      <FilterSection key={block.id} title={block.title}>
        <div className="relative">
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder={block.placeholder}
            inputMode="numeric"
            className="h-11 w-full rounded-lg border border-line bg-white pr-12 pl-3.5 text-[15px] text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)] placeholder:text-muted-500 focus:border-brand focus:outline-none"
          />
          <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-sm text-muted-500">
            {block.suffix}
          </span>
        </div>
      </FilterSection>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="filters-modal-title"
      className="flex max-h-[90vh] max-w-[1277px] flex-col rounded-xl border border-line shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center justify-between px-5 pt-7 pb-5 sm:px-8">
        <h2
          id="filters-modal-title"
          className="text-2xl font-bold text-brand-dark"
        >
          Filters
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="text-ink hover:text-brand-dark"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-8 overflow-y-auto px-5 pb-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {FILTER_COLUMNS.map((column, i) => (
          <div key={i} className="flex flex-col gap-8">
            {column.map(renderBlock)}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="self-start rounded-lg border border-line bg-white px-3.5 py-2.5 text-[15px] leading-6 whitespace-nowrap text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
          {count} Filters Selected
        </span>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button onClick={() => onApply(count)} className="flex-1 whitespace-nowrap sm:flex-none">
            Apply Filters
          </Button>
        </div>
      </div>
    </Modal>
  );
}
