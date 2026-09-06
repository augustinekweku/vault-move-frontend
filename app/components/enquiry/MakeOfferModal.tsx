import { Modal } from "~/components/ui/Modal";
import { CloseIcon } from "~/components/ui/icons";

interface MakeOfferModalProps {
  open: boolean;
  onClose: () => void;
  /** Called when the user picks "Make an offer now". */
  onMakeOffer: () => void;
}

/** Centred prompt inviting the buyer/renter to submit an offer once they've
 *  viewed the property: tag icon, title, supporting copy and two stacked
 *  actions — "Make an offer now" (primary) and "Do this later" (outline).
 *  Mock: no offer form exists yet, so the primary action just hops to the
 *  Offers tab. */
export function MakeOfferModal({
  open,
  onClose,
  onMakeOffer,
}: MakeOfferModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="make-offer-title"
      className="max-w-125 rounded-xl"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 text-ink hover:text-brand"
      >
        <CloseIcon className="size-4" />
      </button>

      <div className="flex flex-col items-center px-8 pt-6 pb-6 text-center">
        <span className="flex size-25 items-center justify-center rounded-full bg-surface-alt">
          <img src="/icons/offer-icon.svg" alt="" className="size-9.25" />
        </span>

        <h2
          id="make-offer-title"
          className="mt-4.5 text-xl leading-6 font-bold tracking-[-0.02em] text-ink"
        >
          Make an Offer
        </h2>

        <p className="mt-6 text-lg leading-8 text-ink-soft">
          Now that you&apos;ve viewed the property, you&apos;re ready to
          submit an offer. Enter your proposed terms and send them directly to
          the landlord or agent for review.
        </p>

        <div className="mt-12.75 flex w-full flex-col items-center gap-5">
          <button
            type="button"
            onClick={onMakeOffer}
            className="h-10.5 w-full max-w-87.25 rounded-lg bg-brand text-[15.5px] leading-6 font-medium text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90"
          >
            Make an offer now
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10.5 w-full max-w-87.25 rounded-lg border border-line bg-white text-[15.5px] leading-6 text-muted-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
          >
            Do this later
          </button>
        </div>
      </div>
    </Modal>
  );
}
