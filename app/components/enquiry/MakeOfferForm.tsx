import { useState } from "react";
import type { Property } from "~/types";
import { OFFER_PROGRESS_STEPS } from "~/data/messages";
import { cn } from "~/lib/utils";
import { Toast } from "~/components/ui/Toast";
import { DateField } from "~/components/ui/DateField";
import { EnquiryPropertyCard } from "~/components/enquiry/EnquiryPropertyCard";

interface MakeOfferFormProps {
  property: Property;
  /** Full location line shown on the shared property card. */
  address: string;
  /** "counter" reuses the same form for the reply to the landlord's counter
   *  offer — only the heading and submit label change ("Make a Counter
   *  offer" / "Submit counter offer"). */
  variant?: "offer" | "counter";
  /** "< Back" — return to the offers list. */
  onBack: () => void;
  /** Called with the entered rent amount once the submission toast
   *  dismisses — the route then lists the offer in the Offers panel. */
  onSubmitted: (amount: string) => void;
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

/** The Offers-tab "Make an Offer" screen: the shared property card above a
 *  centred form (rent amount, move-in date, stay duration, additional
 *  notes). Submit stays disabled until the required fields are filled.
 *  Submitting is a mock — the button flips to a disabled "Loading" state
 *  and the offer-submitted toast pops with the progress checklist; when the
 *  toast dismisses, `onSubmitted` hands the entered amount to the route so
 *  the Offers panel can list the pending offer. */
export function MakeOfferForm({
  property,
  address,
  variant = "offer",
  onBack,
  onSubmitted,
  className,
}: MakeOfferFormProps) {
  const [rent, setRent] = useState("");
  const [moveIn, setMoveIn] = useState("");
  const [stay, setStay] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const ready = Boolean(rent.trim() && moveIn.trim() && stay.trim());
  const counter = variant === "counter";

  return (
    <>
      <section className={className}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold text-black">
            {counter ? "Make a Counter offer" : "Make an Offer"}
          </h2>
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
              {submitted
                ? "Loading"
                : counter
                  ? "Submit counter offer"
                  : "Submit offer"}
            </button>
          </form>
        </div>
      </section>
      {toastOpen && (
        <Toast
          title="Success!"
          message="Your offer has been submitted! You will be notified once it is accepted."
          steps={OFFER_PROGRESS_STEPS}
          onClose={() => {
            setToastOpen(false);
            onSubmitted(rent.trim());
          }}
        />
      )}
    </>
  );
}
