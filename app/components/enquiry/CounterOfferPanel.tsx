import { useEffect, useState } from "react";
import type { CounterOffer, Property } from "~/types";
import { ACCEPT_OFFER_PROGRESS_STEPS } from "~/data/messages";
import { Toast } from "~/components/ui/Toast";
import { LocationIcon } from "~/components/ui/icons";

interface CounterOfferPanelProps {
  property: Property;
  /** Full location line shown under the property title. */
  address: string;
  /** The landlord's counter offer under review. */
  offer: CounterOffer;
  /** Whether the sheet is visible. */
  open: boolean;
  /** Backdrop click / Escape — dismisses the sheet. */
  onClose: () => void;
  /** "Decline offer" — withdraws the offer (mock). */
  onDecline: () => void;
  /** "Make a counter offer" — reopens the offer form. */
  onMakeCounterOffer: () => void;
}

/** One detail row of an offer card: the icon in a tinted circle beside the
 *  grey label and bold value. Shared by the renter counter-offer sheet and
 *  the portal full-offer sheet. */
export function CounterOfferRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-alt">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs leading-6 text-muted-500">{label}</p>
        <p className="text-base leading-6 font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

/** The "Counter Offer" sheet: a modal panel pinned to the right edge of the
 *  viewport over a dimmed backdrop, opened from the offer card's "View
 *  Counter Offer". Shows the landlord's countered terms — amount, move-in
 *  date, stay duration and notes — in a card under the heading, with the
 *  actions below: "Accept offer" closes the sheet and pops a success toast
 *  (mock), "Decline offer" withdraws the offer, "Make a counter offer"
 *  reopens the offer form. Closes on backdrop click and Escape; the page
 *  behind keeps its layout (only rendered while `open`, so SSR markup
 *  stays deterministic). */
export function CounterOfferPanel({
  property,
  address,
  offer,
  open,
  onClose,
  onDecline,
  onMakeCounterOffer,
}: CounterOfferPanelProps) {
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50"
          onClick={onClose}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="counter-offer-title"
            className="h-full w-full overflow-y-auto bg-white shadow-[-3px_3px_4px_rgba(0,0,0,0.1)] sm:w-147"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-full max-w-106.75 px-6 py-10 sm:py-16">
              <h2
                id="counter-offer-title"
                className="text-2xl font-extrabold text-black"
              >
                Counter Offer
              </h2>
              <p className="mt-4 text-lg leading-8 text-ink-soft">
                The landlord made a counter offer. You can review this and
                make another offer or accept this offer.
              </p>

              <div className="mt-8 rounded-xl border border-line bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                <h3 className="text-2xl leading-6 font-extrabold text-black">
                  {property.title}
                </h3>
                <p className="mt-3 flex items-center gap-1.5 text-xs leading-6 text-muted-500">
                  <LocationIcon className="size-4 shrink-0" />
                  {address}
                </p>

                <div className="mt-6 flex flex-col gap-4.5">
                  <CounterOfferRow
                    icon={
                      <img
                        src="/icons/offer-icon.svg"
                        alt=""
                        className="size-6"
                      />
                    }
                    label="Offer Amount"
                    value={
                      <>
                        {offer.amount} {property.currency}
                        {property.priceUnit === "month" ? (
                          <span className="text-xs font-normal text-muted-500">
                            {" "}
                            / month
                          </span>
                        ) : null}
                      </>
                    }
                  />
                  <CounterOfferRow
                    icon={
                      <img src="/icons/home.svg" alt="" className="size-6" />
                    }
                    label="Move in date"
                    value={offer.moveInDate}
                  />
                  <CounterOfferRow
                    icon={
                      <img src="/icons/watch.svg" alt="" className="size-6" />
                    }
                    label="Stay duration"
                    value={offer.stayDuration}
                  />
                </div>

                <p className="mt-6 rounded-md bg-surface-alt px-4 py-2 text-xs leading-6 text-muted-500">
                  {offer.notes}
                </p>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  type="button"
                  onClick={onDecline}
                  className="flex-1 rounded-lg border border-line bg-white py-2.5 text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
                >
                  Decline offer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setToastOpen(true);
                  }}
                  className="flex-1 rounded-lg bg-brand py-2.5 text-sm text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90"
                >
                  Accept offer
                </button>
              </div>
              <button
                type="button"
                onClick={onMakeCounterOffer}
                className="mt-4 w-full rounded-lg border border-line bg-white py-2.5 text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
              >
                Make a counter offer
              </button>
            </div>
          </section>
        </div>
      )}

      {toastOpen && (
        <Toast
          title="Success!"
          message="You have accepted the landlord's counter offer. The deal room has been created."
          steps={ACCEPT_OFFER_PROGRESS_STEPS}
          onClose={() => setToastOpen(false)}
        />
      )}
    </>
  );
}
