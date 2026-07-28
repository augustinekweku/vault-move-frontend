import { Link } from "react-router";
import type { OfferStatus } from "~/types";
import { cn } from "~/lib/utils";

interface OfferCardProps {
  /** Offered amount as entered in the offer form, e.g. "1200". */
  amount: string;
  /** e.g. "GHC". */
  currency: string;
  /** "month" appends a "/ month" unit to the amount. */
  unit?: "month" | "total";
  /** pending = awaiting the landlord's review; countered = the landlord
   *  sent a counter offer (adds the "View Counter Offer" action);
   *  accepted = the landlord accepted the renter's counter offer (success
   *  bar + "Go to the Deal room", no withdraw action). */
  status?: OfferStatus;
  /** "View Counter Offer" (countered status) — opens the Counter Offer
   *  sheet. */
  onViewCounterOffer?: () => void;
  /** "Cancel offer" — withdraws the offer (mock). */
  onCancel?: () => void;
  className?: string;
}

/** The submitted-offer card in the Offers tab: the offered amount beside the
 *  offer tag icon in a tinted circle, a status bar ("being reviewed by the
 *  Landlord" while pending, "The landlord made a counter offer." once
 *  countered, "Your counter offer has been accepted!" once accepted) and
 *  the action buttons — "View Counter Offer" (countered only) above
 *  "Cancel offer", or a "Go to the Deal room" link when accepted. */
export function OfferCard({
  amount,
  currency,
  unit = "month",
  status = "pending",
  onViewCounterOffer,
  onCancel,
  className,
}: OfferCardProps) {
  const accepted = status === "accepted";
  return (
    <article
      className={cn(
        "rounded-xl border border-line bg-white p-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div className="mt-2 flex items-center gap-4 px-2">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-alt">
          <img src="/icons/offer-icon.svg" alt="" className="size-6" />
        </span>
        <div className="min-w-0">
          <p className="text-xs leading-6 text-muted-500">Offer Amount</p>
          <p className="text-base leading-6 font-bold text-ink">
            {amount} {currency}
            {unit === "month" ? (
              <span className="text-xs font-normal text-muted-500">
                {" "}
                / month
              </span>
            ) : null}
          </p>
        </div>
      </div>

      <p
        className={cn(
          "mt-4 flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm leading-6 text-muted-700",
          accepted
            ? "border-success/25 bg-success-soft"
            : "border-line bg-surface-alt",
        )}
      >
        <img
          src={
            accepted
              ? "/icons/check-circle.svg"
              : "/icons/material-symbols.svg"
          }
          alt=""
          className="size-6 shrink-0"
        />
        <span className="sm:whitespace-nowrap">
          {accepted
            ? "Your counter offer has been accepted!"
            : status === "countered"
              ? "The landlord made a counter offer."
              : "Your offer is being reviewed by the Landlord."}
        </span>
      </p>

      {accepted ? (
        /* The deal room lives in the signed-in area — the dashboard is its
           home until a dedicated page exists. */
        <Link
          to="/dashboard"
          className="mt-4 block w-full rounded-lg border border-line bg-white py-2.5 text-center text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
        >
          Go to the Deal room
        </Link>
      ) : (
        <>
          {status === "countered" && (
            <button
              type="button"
              onClick={onViewCounterOffer}
              className="mt-4 w-full rounded-lg bg-brand py-3 text-sm text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90"
            >
              View Counter Offer
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="mt-4 w-full rounded-lg border border-line bg-white py-2.5 text-sm text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
          >
            Cancel offer
          </button>
        </>
      )}
    </article>
  );
}
