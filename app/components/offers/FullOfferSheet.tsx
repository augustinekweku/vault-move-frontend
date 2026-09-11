import type { OfferBid } from "~/types";
import { Sheet } from "~/components/ui/Sheet";
import { ProfileChip } from "~/components/common/ProfileChip";
import { CounterOfferRow } from "~/components/enquiry/CounterOfferPanel";
import { CloseIcon, LocationIcon } from "~/components/ui/icons";

interface FullOfferSheetProps {
  bid: OfferBid | null;
  propertyTitle: string;
  location: string;
  onClose: () => void;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onCounter: (id: string) => void;
}

/** Slide-over panel behind "View full offer": the applicant, the offered
 *  terms and the accept / decline / counter actions. The term rows reuse
 *  the counter-offer sheet's detail row, so both sheets stay identical.
 *  Rendered only while a bid is selected. */
export function FullOfferSheet({
  bid,
  propertyTitle,
  location,
  onClose,
  onAccept,
  onDecline,
  onCounter,
}: FullOfferSheetProps) {
  function handleAcceptClick(event: React.MouseEvent<HTMLButtonElement>) {
    onAccept(event.currentTarget.dataset.id ?? "");
  }

  function handleDeclineClick(event: React.MouseEvent<HTMLButtonElement>) {
    onDecline(event.currentTarget.dataset.id ?? "");
  }

  function handleCounterClick(event: React.MouseEvent<HTMLButtonElement>) {
    onCounter(event.currentTarget.dataset.id ?? "");
  }

  function handleViewProfile() {
    // TODO: open the applicant's profile once the renter-profile page
    // exists.
  }

  return (
    <Sheet
      open={bid !== null}
      onClose={onClose}
      labelledBy="full-offer-title"
      className="max-w-sm p-6"
    >
      {bid && (
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <h2 id="full-offer-title" className="text-lg font-bold text-ink">
              Offer
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close offer"
              className="shrink-0 text-muted-500 transition-colors hover:text-ink"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
          <p className="mt-1 text-sm leading-6 text-ink-soft">
            Take a moment to review the applicant&apos;s offer and profile.
            You can accept the offer, decline it, or send a counter offer if
            you&apos;d like to negotiate.
          </p>

          <ProfileChip
            avatar={bid.avatar}
            name={bid.bidderName}
            verified={bid.verified}
            subline={
              <button
                type="button"
                onClick={handleViewProfile}
                className="mt-0.5 text-sm text-brand-navy/54 transition-colors hover:text-brand"
              >
                View profile
              </button>
            }
            className="mt-5"
          />

          <div className="mt-4 rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
            <p className="text-base font-extrabold text-ink">{propertyTitle}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-500">
              <LocationIcon className="size-4 shrink-0" />
              {location}
            </p>

            <div className="mt-4 flex flex-col gap-4">
              <CounterOfferRow
                icon={
                  <img
                    src="/icons/offer-icon.svg"
                    alt=""
                    className="size-6"
                  />
                }
                label="Offer Amount"
                value={bid.amountDetail}
              />
              <CounterOfferRow
                icon={
                  <img src="/icons/home.svg" alt="" className="size-6" />
                }
                label="Move in date"
                value={bid.moveInFull}
              />
              <CounterOfferRow
                icon={
                  <img src="/icons/watch.svg" alt="" className="size-6" />
                }
                label="Stay duration"
                value={bid.stayFull}
              />
            </div>

            <p className="mt-4 rounded-md bg-surface-alt px-4 py-2 text-xs leading-6 text-muted-500">
              {bid.note}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              data-id={bid.id}
              onClick={handleDeclineClick}
              className="h-11 rounded-lg border border-line bg-white text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
            >
              Decline offer
            </button>
            <button
              type="button"
              data-id={bid.id}
              onClick={handleAcceptClick}
              className="h-11 rounded-lg bg-brand text-sm text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90"
            >
              Accept offer
            </button>
          </div>
          <button
            type="button"
            data-id={bid.id}
            onClick={handleCounterClick}
            className="mt-3 h-11 w-full rounded-lg border border-line bg-white text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
          >
            Make a counter offer
          </button>
        </div>
      )}
    </Sheet>
  );
}
