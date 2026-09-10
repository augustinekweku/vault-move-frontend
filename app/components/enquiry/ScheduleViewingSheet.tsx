import { useEffect, useRef, useState } from "react";
import type { PortalListing, ScheduledViewing } from "~/types";
import { VIEWING_TIME_SLOTS } from "~/data/messages";
import { formatIsoDate } from "~/lib/date";
import { cn } from "~/lib/utils";
import { Sheet } from "~/components/ui/Sheet";
import { Button } from "~/components/ui/Button";
import { DateField } from "~/components/ui/DateField";
import {
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  CloseIcon,
} from "~/components/ui/icons";

interface ScheduleViewingSheetProps {
  open: boolean;
  properties: PortalListing[];
  onClose: () => void;
  onScheduled: (viewing: ScheduledViewing) => void;
}

/** Landlord schedule-a-viewing sheet: property picker (thumbnail rows),
 *  date and time fields, then the Schedule Viewing / Cancel pair.
 *  Submitting reports the viewing to the caller (mock until the viewings
 *  API is live). */
export function ScheduleViewingSheet({
  open,
  properties,
  onClose,
  onScheduled,
}: ScheduleViewingSheetProps) {
  const [propertyId, setPropertyId] = useState("");
  const [dateIso, setDateIso] = useState("");
  const [time, setTime] = useState("");
  const [openMenu, setOpenMenu] = useState<"property" | "time" | null>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    function onClick(e: MouseEvent) {
      if (fieldsRef.current && !fieldsRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openMenu]);

  function togglePropertyMenu() {
    setOpenMenu((current) => (current === "property" ? null : "property"));
  }

  function toggleTimeMenu() {
    setOpenMenu((current) => (current === "time" ? null : "time"));
  }

  function handlePropertyPick(event: React.MouseEvent<HTMLButtonElement>) {
    setPropertyId(event.currentTarget.dataset.id ?? "");
    setOpenMenu(null);
  }

  function handleTimePick(event: React.MouseEvent<HTMLButtonElement>) {
    setTime(event.currentTarget.dataset.value ?? "");
    setOpenMenu(null);
  }

  function handleDateChange(iso: string) {
    setDateIso(iso);
  }

  function handleSubmit() {
    if (!propertyId || !dateIso || !time.trim()) return;
    onScheduled({
      id: `${propertyId}-${dateIso}-${time.trim()}`,
      dateLabel: formatIsoDate(dateIso),
      timeLabel: time.trim(),
    });
    setPropertyId("");
    setDateIso("");
    setTime("");
  }

  function renderPropertyOption(item: PortalListing) {
    return (
      <li key={item.id}>
        <button
          type="button"
          data-id={item.id}
          onClick={handlePropertyPick}
          className={cn(
            "flex w-full items-center gap-3 px-3.5 py-2.5 text-left hover:bg-surface-alt",
            item.id === propertyId && "bg-surface-alt",
          )}
        >
          <img
            src={item.image}
            alt=""
            className="size-10 shrink-0 rounded object-cover"
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-ink">
              {item.title}
            </span>
            <span className="mt-0.5 block truncate text-xs text-muted-500">
              {item.location}
            </span>
          </span>
        </button>
      </li>
    );
  }

  function renderTimeOption(slot: string) {
    return (
      <li key={slot}>
        <button
          type="button"
          data-value={slot}
          onClick={handleTimePick}
          className={cn(
            "block w-full px-3.5 py-2 text-left text-sm hover:bg-surface-alt",
            slot === time ? "font-medium text-brand" : "text-ink",
          )}
        >
          {slot}
        </button>
      </li>
    );
  }

  const selected = properties.find((item) => item.id === propertyId);
  const complete = propertyId !== "" && dateIso !== "" && time !== "";

  return (
    <Sheet
      open={open}
      onClose={onClose}
      labelledBy="schedule-viewing-title"
      className="sm:max-w-lg"
    >
      <div className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h2
            id="schedule-viewing-title"
            className="text-xl font-bold text-ink"
          >
            Schedule a viewing
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close schedule viewing"
            className="shrink-0 text-brand-dark hover:text-ink"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <div ref={fieldsRef} className="mt-8 flex flex-col gap-5">
          <div className="relative flex flex-col gap-1.5">
            <span className="text-[13.5px] leading-5 font-medium text-muted-700">
              Select Property
            </span>
            <button
              type="button"
              onClick={togglePropertyMenu}
              aria-expanded={openMenu === "property"}
              className="flex h-11 w-full items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-left text-[15px] shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:border-brand focus:outline-none"
            >
              <span
                className={cn(
                  "min-w-0 flex-1 truncate",
                  selected ? "text-ink" : "text-muted-500",
                )}
              >
                {selected ? selected.title : "Select Property"}
              </span>
              <ChevronDownIcon
                className={cn(
                  "size-5 shrink-0 text-muted-500 transition-transform",
                  openMenu === "property" && "rotate-180",
                )}
              />
            </button>
            {openMenu === "property" && (
              <ul className="absolute top-full right-0 left-0 z-30 mt-1.5 divide-y divide-line-soft overflow-hidden rounded-lg border border-line bg-white py-1 shadow-lg">
                {properties.map(renderPropertyOption)}
              </ul>
            )}
          </div>

          <DateField
            label="Select Date"
            value={dateIso}
            onChange={handleDateChange}
            suffix={
              <CalendarIcon className="size-5 shrink-0 text-muted-500" />
            }
          />

          <div className="relative flex flex-col gap-1.5">
            <span className="text-[13.5px] leading-5 font-medium text-muted-700">
              Select Time
            </span>
            <button
              type="button"
              onClick={toggleTimeMenu}
              aria-expanded={openMenu === "time"}
              className="flex h-11 w-full items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-left text-[15px] shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:border-brand focus:outline-none"
            >
              <span
                className={cn(
                  "min-w-0 flex-1 truncate",
                  time ? "text-ink" : "text-muted-500",
                )}
              >
                {time || "Select Time"}
              </span>
              <ClockIcon className="size-5 shrink-0 text-muted-500" />
            </button>
            {openMenu === "time" && (
              <ul className="absolute top-full right-0 left-0 z-30 mt-1.5 max-h-60 overflow-auto rounded-lg border border-line bg-white py-1 shadow-lg">
                {VIEWING_TIME_SLOTS.map(renderTimeOption)}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-10">
          <Button onClick={handleSubmit} disabled={!complete}>
            Schedule Viewing
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
