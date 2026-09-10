import { useEffect, useRef, useState } from "react";
import {
  buildMonthCells,
  formatIsoDate,
  isSameDay,
  MONTHS,
  toIsoDate,
  WEEKDAYS,
} from "~/lib/date";
import { cn } from "~/lib/utils";
import { ChevronDownIcon } from "~/components/ui/icons";

interface DateFieldProps {
  label: string;
  /** The selected date as an ISO string ("2026-07-04"), empty when unset. */
  value: string;
  /** Reports the selection as an ISO date string. */
  onChange: (iso: string) => void;
  /** Trailing glyph in the field button (e.g. a calendar icon). */
  suffix?: React.ReactNode;
}

const fieldClasses =
  "h-10.75 w-full rounded-lg border border-line bg-white px-3.5 text-[15.5px] leading-6 shadow-[0_1px_2px_rgba(16,24,40,0.05)] placeholder:text-muted-500 focus:border-brand focus:outline-none";
const labelClasses = "text-[13.5px] leading-5 font-medium text-muted-700";

/** A date field: a button styled like the other form inputs that opens an
 *  in-page month-grid popover (the browser's native date popup can't be
 *  styled or sized and overflows small viewports). Weeks run Monday–Sunday;
 *  days outside the current month are shown dimmed and can't be picked.
 *  The popover only renders after interaction, so SSR markup stays
 *  deterministic. */
export function DateField({ label, value, onChange, suffix }: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => new Date());
  const ref = useRef<HTMLDivElement>(null);
  const selected = value ? new Date(`${value}T00:00:00`) : null;

  useEffect(() => {
    if (!open) return;
    function handleDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const cells = buildMonthCells(year, month);
  const today = new Date();
  const isToday = (day: number) =>
    isSameDay(today, new Date(year, month, day));
  const isSelected = (day: number) =>
    selected !== null && isSameDay(selected, new Date(year, month, day));

  function select(day: number) {
    onChange(toIsoDate(year, month, day));
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative flex flex-col gap-1.5">
      <span className={labelClasses}>{label}</span>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          if (!open) setView(selected ?? new Date());
          setOpen((o) => !o);
        }}
        className={cn(
          fieldClasses,
          "flex items-center gap-2 text-left",
          value ? "text-ink" : "text-muted-500",
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          {value ? formatIsoDate(value) : "select date"}
        </span>
        {suffix}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose move in date"
          className="absolute top-full right-0 left-0 z-20 mt-1.5 rounded-lg border border-line bg-white p-3 shadow-[0_4px_12px_rgba(16,24,40,0.12)]"
        >
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-semibold text-ink">
              {MONTHS[month]} {year}
            </p>
            <div className="flex gap-1">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setView(new Date(year, month - 1, 1))}
                className="flex size-7 items-center justify-center rounded-md text-ink hover:bg-surface-alt"
              >
                <ChevronDownIcon className="size-4 rotate-90" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setView(new Date(year, month + 1, 1))}
                className="flex size-7 items-center justify-center rounded-md text-ink hover:bg-surface-alt"
              >
                <ChevronDownIcon className="size-4 -rotate-90" />
              </button>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-7 text-center text-xs text-muted-500">
            {WEEKDAYS.map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map(({ day, inMonth }, i) => (
              <button
                key={i}
                type="button"
                disabled={!inMonth}
                onClick={() => select(day)}
                className={cn(
                  "mx-auto flex size-9 items-center justify-center rounded-full text-sm",
                  inMonth
                    ? "text-ink not-disabled:hover:bg-surface-alt"
                    : "text-muted-300",
                  inMonth && isSelected(day) && "bg-brand text-white",
                  inMonth &&
                    isToday(day) &&
                    !isSelected(day) &&
                    "ring-1 ring-brand",
                )}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
