import { Link } from "react-router";
import type { OfferOutcome } from "~/types";
import { cn } from "~/lib/utils";
import { Modal } from "~/components/ui/Modal";
import { CloseIcon } from "~/components/ui/icons";

interface OfferOutcomeModalProps {
  /** The negotiation outcome to show — null keeps the modal closed. */
  outcome: OfferOutcome | null;
  /** Search-results page the decline outcomes' "View more properties"
   *  button links to. */
  searchHref: string;
  /** Close button, backdrop click or Escape. */
  onClose: () => void;
}

const OUTCOME_CONTENT: Record<
  OfferOutcome,
  { icon: string; tint: string; title: string; body: string; cta: string }
> = {
  accepted: {
    icon: "/icons/check-circle-navy.svg",
    tint: "bg-[#edf1fa]",
    title: "Offer Accepted!",
    body: "Great news! The landlord has accepted your offer. We've created a dedicated Deal Room where you can securely manage the rest of your transaction.",
    cta: "Go to the Deal room",
  },
  declined: {
    icon: "/icons/x-circle.svg",
    tint: "bg-[#fef3f2]",
    title: "Offer Declined!",
    body: "Unfortunately, your offer wasn't accepted by the landlord this time. You can continue the conversation, submit a revised offer if invited, or explore other properties that match your preferences.",
    cta: "View more properties",
  },
  "counter-declined": {
    icon: "/icons/x-circle.svg",
    tint: "bg-[#fef3f2]",
    title: "Counter Offer Declined!",
    body: "You've chosen not to accept the landlord's counter offer. This transaction has been closed. You can continue exploring other properties or start a new enquiry whenever you're ready.",
    cta: "View more properties",
  },
};

/** Centred end-of-negotiation dialog: a tinted outcome icon over the title,
 *  supporting copy and a single call to action — "Go to the Deal room" when
 *  the landlord accepted, "View more properties" after a decline (the
 *  renter declining the landlord's counter offer closes the transaction). */
export function OfferOutcomeModal({
  outcome,
  searchHref,
  onClose,
}: OfferOutcomeModalProps) {
  if (outcome === null) return null;
  const content = OUTCOME_CONTENT[outcome];
  /* The deal room lives in the signed-in area — the dashboard is its home
     until a dedicated page exists. */
  const ctaHref = outcome === "accepted" ? "/dashboard" : searchHref;

  return (
    <Modal
      open
      onClose={onClose}
      labelledBy="offer-outcome-title"
      className="max-w-125 rounded-2xl"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 text-ink hover:text-brand"
      >
        <CloseIcon className="size-4" />
      </button>

      <div className="flex flex-col items-center px-8 pt-10 pb-8 text-center">
        <span
          className={cn(
            "flex size-25 items-center justify-center rounded-full",
            content.tint,
          )}
        >
          <img src={content.icon} alt="" className="size-12" />
        </span>

        <h2
          id="offer-outcome-title"
          className="mt-6 text-2xl font-extrabold text-black"
        >
          {content.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-muted-500">
          {content.body}
        </p>

        <Link
          to={ctaHref}
          className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-brand text-[15.5px] leading-6 font-medium text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90"
        >
          {content.cta}
        </Link>
      </div>
    </Modal>
  );
}
