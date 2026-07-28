import type { Route } from "./+types/property-contact";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { OfferOutcome, OfferStatus } from "~/types";
import { getListingById } from "~/services/listings.service";
import { getLandlordById } from "~/services/landlords.service";
import { MOCK_COUNTER_OFFER } from "~/data/messages";
import { cn, scrollToTop } from "~/lib/utils";
import { Container } from "~/components/ui/Container";
import { ConversationList } from "~/components/enquiry/ConversationList";
import { EnquiryChat } from "~/components/enquiry/EnquiryChat";
import { ViewingPanel } from "~/components/enquiry/ViewingPanel";
import { OffersPanel } from "~/components/enquiry/OffersPanel";
import { CounterOfferPanel } from "~/components/enquiry/CounterOfferPanel";
import { MakeOfferForm } from "~/components/enquiry/MakeOfferForm";
import { MakeOfferModal } from "~/components/enquiry/MakeOfferModal";
import { OfferOutcomeModal } from "~/components/enquiry/OfferOutcomeModal";
import { WaitlistSection } from "~/components/common/WaitlistSection";

export function meta({ loaderData }: Route.MetaArgs) {
  const landlordName = loaderData?.landlord.name ?? "Landlord";
  const title = loaderData?.property.title ?? "Property";
  return [
    { title: `Message ${landlordName} — Vault Move Africa` },
    {
      name: "description",
      content: `Make an enquiry about ${title} — message ${landlordName} on Vault Move Africa.`,
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const result = await getListingById(params.propertyId);
  if (!result) throw new Response(null, { status: 404 });
  const landlordResult = await getLandlordById(result.property.agent.id);
  if (!landlordResult) throw new Response(null, { status: 404 });
  return { ...result, landlord: landlordResult.landlord };
}

const TABS = [
  { value: "enquiries", label: "Enquiries" },
  { value: "viewing", label: "Property Viewing" },
  { value: "offers", label: "Offers" },
];

export default function PropertyContact({ loaderData }: Route.ComponentProps) {
  const { property, details, landlord } = loaderData;
  const [tab, setTab] = useState("enquiries");
  // The make-an-offer prompt pops on page load (mock: the viewing is already
  // done in the thread). "Make an offer now" — or the completed viewing
  // card's "Make an Offer" — opens the offer form in the Offers tab;
  // "< Back" returns to the offers list, and switching tabs resets the
  // form. A submitted offer (its rent amount) is listed in the Offers
  // panel as a pending-review card until it is cancelled. Once the mock
  // landlord counters, "View Counter Offer" opens the Counter Offer sheet
  // over the page — declining withdraws the offer and pops the "Counter
  // Offer Declined!" outcome modal, and "Make a counter offer" reopens the
  // offer form in its counter variant; submitting that mocks the landlord
  // accepting the counter a few seconds later ("Offer Accepted!" modal).
  const [offerOpen, setOfferOpen] = useState(true);
  const [makingOffer, setMakingOffer] = useState(false);
  const [offerFormMode, setOfferFormMode] = useState<"offer" | "counter">(
    "offer",
  );
  const [offerAmount, setOfferAmount] = useState<string | null>(null);
  const [offerIsCounter, setOfferIsCounter] = useState(false);
  const [offerStatus, setOfferStatus] = useState<OfferStatus>("pending");
  const [viewingCounter, setViewingCounter] = useState(false);
  const [outcome, setOutcome] = useState<OfferOutcome | null>(null);

  // Mock the landlord's response: a few seconds after submission the
  // pending card flips — a lowball offer (under two-thirds of asking) is
  // declined outright, otherwise a first offer gets countered and a
  // counter offer gets accepted; both terminal states pop the outcome
  // modal.
  useEffect(() => {
    if (offerAmount === null) return;
    setOfferStatus("pending");
    const timer = setTimeout(() => {
      const value = Number(offerAmount.replace(/[^0-9.]/g, ""));
      if (value > 0 && value < (property.price * 2) / 3) {
        setOfferAmount(null);
        setOfferIsCounter(false);
        setOutcome("declined");
      } else if (offerIsCounter) {
        setOfferStatus("accepted");
        setOutcome("accepted");
      } else {
        setOfferStatus("countered");
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [offerAmount, offerIsCounter, property.price]);
  const searchHref = property.category === "buy" ? "/buy" : "/rent";
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Search", href: searchHref },
    { label: "Search Results", href: searchHref },
    { label: "Property details page", href: `/properties/${property.id}` },
    { label: "Message Landlord" },
  ];

  return (
    <>
      <Container className="py-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-ink/70"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-2">
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-brand">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <span>›</span>}
            </span>
          ))}
        </nav>

        <div className="mt-6 border-b border-line">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {TABS.map(({ value, label }) => {
              const active = tab === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setTab(value);
                    setMakingOffer(false);
                    setViewingCounter(false);
                  }}
                  aria-selected={active}
                  className={cn(
                    "-mb-px border-b-2 pb-3 text-sm font-semibold whitespace-nowrap transition-colors",
                    active
                      ? "border-brand text-brand"
                      : "border-transparent text-ink/50 hover:text-ink",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {tab === "enquiries" ? (
          <div className="mt-8 flex flex-col gap-10 pb-16 lg:flex-row lg:items-start">
            <ConversationList className="w-full shrink-0 lg:w-78.25" />
            <EnquiryChat
              property={property}
              address={details.address}
              landlord={landlord}
              className="min-w-0 flex-1"
            />
          </div>
        ) : tab === "viewing" ? (
          <ViewingPanel
            property={property}
            address={details.address}
            onMakeOffer={() => {
              setTab("offers");
              setOfferFormMode("offer");
              setMakingOffer(true);
              scrollToTop();
            }}
            className="mt-8 pb-16"
          />
        ) : makingOffer ? (
          <MakeOfferForm
            property={property}
            address={details.address}
            variant={offerFormMode}
            onBack={() => {
              setMakingOffer(false);
              scrollToTop();
            }}
            onSubmitted={(amount) => {
              setOfferIsCounter(offerFormMode === "counter");
              setOfferAmount(amount);
              setMakingOffer(false);
              scrollToTop();
            }}
            className="mt-8 pb-16"
          />
        ) : (
          <OffersPanel
            property={property}
            address={details.address}
            offerAmount={offerAmount}
            offerStatus={offerStatus}
            onViewCounterOffer={() => setViewingCounter(true)}
            onCancelOffer={() => {
              setOfferAmount(null);
              setOfferIsCounter(false);
              setViewingCounter(false);
            }}
            className="mt-8 pb-16"
          />
        )}
      </Container>

      <WaitlistSection />

      <MakeOfferModal
        open={offerOpen}
        onClose={() => setOfferOpen(false)}
        onMakeOffer={() => {
          setOfferOpen(false);
          setTab("offers");
          setOfferFormMode("offer");
          setMakingOffer(true);
        }}
      />

      <CounterOfferPanel
        property={property}
        address={details.address}
        offer={MOCK_COUNTER_OFFER}
        open={
          viewingCounter && offerAmount !== null && offerStatus === "countered"
        }
        onClose={() => setViewingCounter(false)}
        onDecline={() => {
          setOfferAmount(null);
          setOfferIsCounter(false);
          setViewingCounter(false);
          setOutcome("counter-declined");
        }}
        onMakeCounterOffer={() => {
          setViewingCounter(false);
          setOfferFormMode("counter");
          setMakingOffer(true);
          scrollToTop();
        }}
      />

      <OfferOutcomeModal
        outcome={outcome}
        searchHref={searchHref}
        onClose={() => setOutcome(null)}
      />
    </>
  );
}
