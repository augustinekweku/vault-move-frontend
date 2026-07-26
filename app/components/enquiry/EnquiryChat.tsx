import { useState } from "react";
import type { LandlordProfile, Property } from "~/types";
import { ENQUIRY_PROGRESS_STEPS, MOCK_VIEWING } from "~/data/messages";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/Input";
import { Toast } from "~/components/ui/Toast";
import { VerifiedIcon } from "~/components/ui/icons";
import { EnquiryPropertyCard } from "~/components/enquiry/EnquiryPropertyCard";
import { EnquiryForm } from "~/components/enquiry/EnquiryForm";
import { ViewingCard } from "~/components/enquiry/ViewingCard";

interface EnquiryChatProps {
  property: Property;
  /** Full location line shown on the shared property card. */
  address: string;
  landlord: LandlordProfile;
  className?: string;
}

/** The chat panel of the enquiry page: landlord header, the shared property
 *  card, the structured enquiry form, the landlord's "Viewing Scheduled"
 *  card and the message composer. Sending is a mock — messages just appear
 *  in the thread. Toasts are mocked too: the "You're all set" viewing toast
 *  shows on mount (the viewing is pre-scheduled in the mock thread), and
 *  each send swaps it for the enquiry-submitted toast. */
export function EnquiryChat({
  property,
  address,
  landlord,
  className,
}: EnquiryChatProps) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const [toast, setToast] = useState<"viewing" | "enquiry" | null>("viewing");

  function send() {
    const text = message.trim();
    if (!text) return;
    setSent((prev) => [...prev, text]);
    setMessage("");
    setToast("enquiry");
  }

  return (
    <>
      <section
        className={cn(
          "rounded-xl border border-line bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
          className,
        )}
      >
        <div className="flex items-center gap-3 px-5 pt-5 sm:px-8">
          <div className="relative size-9 shrink-0">
            <img
              src={landlord.avatar}
              alt=""
              className="size-full rounded-full object-cover"
            />
            {landlord.verified && (
              <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-white">
                <VerifiedIcon className="size-3.5 text-black" />
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-brand-navy">{landlord.name}</p>
            <p className="text-xs text-brand-navy/54">{landlord.role}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4 px-5 sm:px-8">
          <div aria-hidden className="h-px flex-1 bg-line-soft" />
          <span className="text-xs text-muted-500">Today</span>
          <div aria-hidden className="h-px flex-1 bg-line-soft" />
        </div>

        <div className="flex flex-col gap-6 px-5 py-6 sm:px-8">
          <div className="ml-auto w-full max-w-107">
            <EnquiryPropertyCard property={property} address={address} />
            <p className="mt-2 text-right text-xs text-muted-500">
              Friday 2:20pm
            </p>
          </div>
          <EnquiryForm className="ml-auto w-full max-w-107" />
          <div className="mr-auto w-full max-w-107">
            <div className="mb-2 flex items-center gap-2">
              <span className="relative shrink-0">
                <img
                  src={landlord.avatar}
                  alt=""
                  className="size-6 rounded-full object-cover"
                />
                <span
                  aria-hidden
                  className="absolute right-0 bottom-0 size-2.5 rounded-full bg-success ring-2 ring-white"
                />
              </span>
              <p className="text-xs font-semibold text-ink">{landlord.name}</p>
              <span className="ml-auto text-xs text-muted-500">
                Friday 2:40pm
              </span>
            </div>
            {/* The landlord's share (Figma "Component 2"): both cards sit in
                a translucent grey 20px-radius bubble. */}
            <div className="flex flex-col gap-4 rounded-[20px] bg-line/24 p-4">
              <EnquiryPropertyCard property={property} address={address} />
              <ViewingCard date={MOCK_VIEWING.date} time={MOCK_VIEWING.time} />
            </div>
          </div>
          {sent.map((text, i) => (
            <p
              key={i}
              className="ml-auto max-w-107 rounded-xl bg-brand px-4 py-2.5 text-sm wrap-break-word text-white"
            >
              {text}
            </p>
          ))}
        </div>

        <form
          className="flex items-center gap-4 border-t border-line-soft px-5 py-4 sm:px-8"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            aria-label="Type your message"
            className="flex-1"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="h-11 w-19 shrink-0 rounded-lg bg-brand text-base font-medium text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] not-disabled:hover:bg-brand/90 disabled:bg-brand/25"
          >
            Send
          </button>
        </form>
      </section>
      {toast === "viewing" && (
        <Toast
          title="Success!"
          message="You're all set! After your viewing, confirm that you've visited the property to keep your transaction moving."
          onClose={() => setToast(null)}
        />
      )}
      {toast === "enquiry" && (
        <Toast
          title="Success!"
          message="Your enquiry has been submitted!"
          steps={ENQUIRY_PROGRESS_STEPS}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
