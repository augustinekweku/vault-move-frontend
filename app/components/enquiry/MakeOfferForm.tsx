import { useEffect, useRef, useState } from "react";
import type { Property } from "~/types";
import { OFFER_PROGRESS_STEPS } from "~/data/messages";
import { cn } from "~/lib/utils";
import { Toast } from "~/components/ui/Toast";
import { ChevronDownIcon } from "~/components/ui/icons";
import { EnquiryPropertyCard } from "~/components/enquiry/EnquiryPropertyCard";

interface MakeOfferFormProps {
  property: Property;
  /** Full location line shown on the shared property card. */
  address: string;
  /** "< Back" — return to the offers list. */
  onBack: () => void;
  className?: string;
}

const fieldClasses =
  "h-10.75 w-full rounded-lg border border-line bg-white px-3.5 text-[15.5px] leading-6 shadow-[0_1px_2px_rgba(16,24,40,0.05)] placeholder:text-muted-500 focus:border-brand focus:outline-none";
const labelClasses = "text-[13.5px] leading-5 font-medium text-muted-700";

/** One labelled text field of the offer form. `suffix` renders a grey unit
 *  (e.g. "/mo") inside the right edge of the input. */
function OfferField({
  label,
  suffix,
  ...props
}: { label: string; suffix?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClasses}>{label}</span>
      <span className="relative block">
        <input
          className={cn(fieldClasses, "text-ink", suffix && "pr-12")}
          {...props}
        />
        {suffix ? (
          <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[15.5px] leading-6 text-muted-500">
            {suffix}
          </span>
        ) : null}
      </span>
    </label>
  );
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function ordinal(day: number) {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

/** "2026-07-04" → "4th July 2026". */
function formatDisplay(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${ordinal(day)} ${MONTHS[month - 1]} ${year}`;
}

/** "Move in date" field: a button styled like the other inputs that opens
 *  an in-page month-grid popover (the browser's native date popup can't be
 *  styled or sized and overflows small viewports). Weeks run Monday–Sunday;
 *  days outside the current month are shown dimmed and can't be picked.
 *  Selection is reported as an ISO date string ("2026-07-04"). The popover
 *  only renders after interaction, so SSR markup stays deterministic. */
function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (iso: string) => void;
}) {
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
  // Monday-first offset of the 1st, then 42 cells (6 fixed rows) around it.
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();
  const isSelected = (day: number) =>
    Boolean(selected) &&
    day === selected!.getDate() &&
    month === selected!.getMonth() &&
    year === selected!.getFullYear();

  function select(day: number) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(iso);
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
          "text-left",
          value ? "text-ink" : "text-muted-500",
        )}
      >
        {value ? formatDisplay(value) : "select date"}
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
            {Array.from({ length: 42 }, (_, i) => {
              const d = i - startOffset + 1;
              const inMonth = d >= 1 && d <= daysInMonth;
              const day = d < 1 ? daysInPrev + d : inMonth ? d : d - daysInMonth;
              return (
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
                    isSelected(day) && inMonth && "bg-brand text-white",
                    isToday(day) && inMonth && !isSelected(day) && "ring-1 ring-brand",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/** The Offers-tab "Make an Offer" screen: the shared property card above a
 *  centred form (rent amount, move-in date, stay duration, additional
 *  notes). Submit stays disabled until the required fields are filled.
 *  Submitting is a mock — the button flips to a disabled "Loading" state
 *  and the offer-submitted toast pops with the progress checklist. */
export function MakeOfferForm({
  property,
  address,
  onBack,
  className,
}: MakeOfferFormProps) {
  const [rent, setRent] = useState("");
  const [moveIn, setMoveIn] = useState("");
  const [stay, setStay] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const ready = Boolean(rent.trim() && moveIn.trim() && stay.trim());

  return (
    <>
      <section className={className}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold text-black">Make an Offer</h2>
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-muted-500 hover:text-ink"
          >
            &lt; Back
          </button>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-106.75 flex-col">
          <EnquiryPropertyCard property={property} address={address} />

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ready || submitted) return;
              setSubmitted(true);
              setToastOpen(true);
            }}
          >
            <OfferField
              label="Rent Amount"
              placeholder="eg 3500/mo"
              suffix="/mo"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
            <DateField label="Move in date" value={moveIn} onChange={setMoveIn} />
            <OfferField
              label="Stay duration"
              placeholder="eg 2 years then consideration for renewal"
              value={stay}
              onChange={(e) => setStay(e.target.value)}
            />
            <OfferField
              label="Additional notes"
              placeholder="Add additional notes,"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              type="submit"
              disabled={!ready || submitted}
              className="mt-4 h-10.5 w-full rounded-lg bg-brand text-[15.5px] leading-6 font-medium text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] not-disabled:hover:bg-brand/90 disabled:bg-brand/25"
            >
              {submitted ? "Loading" : "Submit offer"}
            </button>
          </form>
        </div>
      </section>
      {toastOpen && (
        <Toast
          title="Success!"
          message="Your offer has been submitted! You will be notified once it is accepted."
          steps={OFFER_PROGRESS_STEPS}
          onClose={() => setToastOpen(false)}
        />
      )}
    </>
  );
}
