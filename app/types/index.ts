import type { ComponentType, SVGProps } from "react";
import type { AccordionItem } from "~/components/ui/Accordion";

export type ListingCategory = "rent" | "buy";

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  role: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: "month" | "total";
  currency: string;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  image: string;
  category: ListingCategory;
  tag: string;
  agent: Agent;
  /** Approximate map position — used for the pins on the map view. */
  coordinates: { lat: number; lng: number };
}

/** Icon keys for property facts — kept as strings (not component refs) so
 *  PropertyDetails stays JSON-serialisable across the loader boundary. */
export type PropertyFactIcon = "home" | "bed" | "bath" | "sofa" | "building";

export interface PropertyFact {
  label: string;
  value: string;
  icon: PropertyFactIcon;
}

export interface PropertyCharge {
  label: string;
  amount: string;
}

export interface PropertyFeatureGroup {
  title: string;
  items: string[];
}

/** One star band in the ratings breakdown (e.g. 5 stars → 182 ratings). */
export interface RatingBreakdownRow {
  stars: number;
  count: number;
}

export interface PropertyReviewSummary {
  /** Average score out of 5, shown in the donut gauge. */
  average: number;
  /** Total number of ratings, shown under the gauge. */
  total: number;
  /** One row per star band, ordered 5 → 1. */
  breakdown: RatingBreakdownRow[];
}

export interface PropertyReview {
  id: string;
  author: string;
  avatar: string;
  /** Score out of 5 given by this reviewer. */
  rating: number;
  text: string;
}

/** Everything on the "Reviews" tab of the property details page. */
export interface PropertyReviews {
  summary: PropertyReviewSummary;
  items: PropertyReview[];
}

/** Extra content shown on the property details page (beyond the card data). */
export interface PropertyDetails {
  /** First image is the large one; the rest fill the 2x2 thumbnail grid. */
  gallery: string[];
  /** Full location line, e.g. "Achimota, Accra". */
  address: string;
  availability: string;
  charges: PropertyCharge[];
  facts: PropertyFact[];
  description: string[];
  /** Chip groups under the "Building features" heading. */
  featureGroups: PropertyFeatureGroup[];
  /** Chips under "Amenities and Utilities". */
  amenities: string[];
  /** Bullet list under "House Rules". */
  houseRules: string[];
  /** Rating summary + individual reviews for the "Reviews" tab. */
  reviews: PropertyReviews;
}

/** Public landlord profile page (/landlords/:landlordId). */
export interface LandlordProfile {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  /** e.g. "Verified Landlord". */
  role: string;
  /** e.g. "Achimota, Accra". */
  location: string;
  /** Average score out of 5, shown as stars next to the name. */
  rating: number;
  /** Body paragraphs on the "Landlord's Profile" tab. */
  bio: string[];
  /** The four figures in the stats card (Listed Properties, Views, ...). */
  stats: Stat[];
  /** Rating summary + individual reviews for the "Reviews" tab. */
  reviews: PropertyReviews;
}

/** One checklist row in the ui/Toast `steps` variant (enquiry-submitted
 *  success toast): done rows get the teal check, pending rows a grey ring. */
export interface ToastStep {
  label: string;
  done: boolean;
}

/** Viewing lifecycle status — drives the action row of the ViewingCard
 *  (confirm/cancel for upcoming, "Make an Offer" for completed, red
 *  "Cancelled" bar for cancelled). */
export type ViewingStatus = "upcoming" | "completed" | "cancelled";

/** Offer-list filters in the Offers tab sidebar (property-contact page). */
export type OfferFilter =
  | "all"
  | "accepted"
  | "pending"
  | "declined"
  | "drafts";

/** Lifecycle status of a submitted offer — drives the status bar and action
 *  row of the OfferCard (awaiting the landlord's review, the landlord sent a
 *  counter offer, or the landlord accepted the renter's counter offer). */
export type OfferStatus = "pending" | "countered" | "accepted";

/** Terminal outcome of an offer negotiation — drives the OfferOutcomeModal
 *  (the renter outcomes speak to the renter; the `portal-*` outcomes speak
 *  to the landlord reviewing bids on the offer-detail page). */
export type OfferOutcome =
  | "accepted"
  | "declined"
  | "counter-declined"
  | "portal-accepted"
  | "portal-declined";

/** The landlord's counter offer under review in the Counter Offer panel
 *  (Offers tab of the property-contact page) — the countered terms. */
export interface CounterOffer {
  /** Countered rent amount, e.g. "1350". */
  amount: string;
  /** e.g. "18th July 2026". */
  moveInDate: string;
  /** e.g. "3 years". */
  stayDuration: string;
  /** Landlord's note shown in the tinted strip, e.g. "I can allow small
   *  pets only". */
  notes: string;
}

/** One conversation row in the "Recent Messages" sidebar (enquiry page). */
export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  /** e.g. "Verified Landlord". */
  role: string;
  /** Relative timestamp, e.g. "2 mins ago". */
  time: string;
  /** Shows the green presence dot next to the timestamp. */
  online: boolean;
}

/** Lifecycle status of a deal — drives which deal-room tab lists it. */
export type DealStatus = "pending" | "rejected" | "closed";

/** Tabs on the deal-room page — "all" and "reports" are views, the rest
 *  match a DealStatus. */
export type DealTab = "all" | "reports" | DealStatus;

/** Tabs on the My Account page. */
export type AccountTab = "profile" | "payments" | "history" | "settings";

/** One card on the deal-room page: the property the deal is for, plus the
 *  buyer/renter's verification progress and next action. */
export interface Deal {
  id: string;
  /** Reference in the "Deal ID" row, e.g. "23500-AB". */
  reference: string;
  propertyTitle: string;
  /** Listing badge, e.g. "Apartment for Rent". */
  propertyTag: string;
  /** e.g. "Achimota, Accra". */
  location: string;
  image: string;
  /** e.g. "4th July 2026". */
  date: string;
  status: DealStatus;
  /** Verification progress — the "0/5 Steps completed" line. */
  stepsCompleted: number;
  stepsTotal: number;
  /** Next verification action button, e.g. "Upload ID". */
  nextStepLabel: string;
}

/** A document the renter has uploaded against a requirement — shown as the
 *  tinted file row with a progress bar and delete action. */
export interface DealUpload {
  /** e.g. "Jane Doe utility bill_". */
  fileName: string;
  /** Upload progress, 0–100. */
  progress: number;
}

/** One document row in a deal's ID Verification step — "upload" rows ask
 *  the renter for a document (Upload action), "pending" rows wait on the
 *  landlord (disabled Pending action) and flip to "review" (Review action)
 *  once the landlord has sent the document. */
export interface DealRequirement {
  id: string;
  /** e.g. "Upload utility bill /Proof of current address". */
  title: string;
  /** Helper line under the title, e.g. "Recent utility bill or tenancy
   *  proof" — omitted on the landlord rows. */
  description?: string;
  state: "upload" | "pending" | "review";
  /** The renter's uploaded file for this requirement, if any. */
  upload?: DealUpload;
}

/** One amount row in the Payment step's "Payment Summary" breakdown. */
export interface PaymentBreakdownRow {
  /** e.g. "Security Deposit (2 months)". */
  label: string;
  /** Formatted amount, e.g. "3,600.00". */
  amount: string;
}

/** One milestone row in the Payment step's "Escrow Timeline" card — the
 *  circle turns brand once the milestone is done. */
export interface EscrowTimelineItem {
  /** e.g. "Payment Made". */
  label: string;
  done: boolean;
}

/** One checkbox group in the Handing Over step's checklist. */
export interface HandoverGroup {
  /** e.g. "Property Inspection". */
  title: string;
  /** Checkbox labels, e.g. "Property inspected". */
  items: string[];
}

/** Everything on the deal detail page (/deal-room/:dealId) beyond the
 *  list-card Deal data. */
export interface DealDetails {
  /** e.g. "30th June 2026". */
  startedDate: string;
  /** Listing the deal is for — "Message Landlord" links to its enquiry
   *  chat. */
  propertyId: string;
  /** Landlord shown in the "Listed By" card. */
  landlord: Agent;
  /** Ordered deal-progress step labels ("ID Verification" … "Closing"). */
  steps: string[];
  /** 1-based current step — the "Step 1 of 5" line. */
  currentStep: number;
  /** Documents the renter must upload. */
  renterRequirements: DealRequirement[];
  /** Documents awaited from the landlord. */
  landlordRequirements: DealRequirement[];
  /** Contract step: documents the landlord shared for review. */
  contractDocuments: DealRequirement[];
  /** Contract step: signed copies the renter must upload. */
  signedContracts: DealRequirement[];
  /** Payment step: "Payment Summary" breakdown rows. */
  paymentBreakdown: PaymentBreakdownRow[];
  /** Payment step: total line, e.g. "GHS 5,580.00". */
  paymentTotal: string;
  /** Payment step: "Escrow Timeline" milestones, in order. */
  escrowTimeline: EscrowTimelineItem[];
  /** Handing Over step: checklist groups (2×2 grid). */
  handoverChecklist: HandoverGroup[];
  /** Body of the "What's Next?" card — one entry per step, in step order;
   *  steps without copy use an empty string (no card). */
  whatsNext: string[];
}

export interface SearchListingsParams {
  category?: ListingCategory;
  propertyType?: string;
  priceRange?: string;
  location?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

/** An entry in the portal side menu — `icon` is an /icons asset path, kept
 *  as a string so menu data stays serialisable. */
export interface SideMenuLink {
  label: string;
  href: string;
  icon: string;
  /** Entry whose page doesn't exist yet — it links at the dashboard and
   *  never renders as the active item. */
  placeholder?: boolean;
}

/** A numbered step with an icon — portal onboarding steps, the landing
 *  "How it works" steps, etc. */
export interface NumberedStep {
  number: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface Stat {
  value: string;
  label: string;
}

/** A sign-up password requirement, ticked live while typing. */
export interface PasswordRule {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

/** One file row in the onboarding uploaders: the name shown plus
 *  the simulated upload progress (0–100). */
export interface UploadedFile {
  id: string;
  name: string;
  progress: number;
}

/** Every free-text field in the landlord onboarding wizard, keyed by its
 *  input `name` so one generic change handler serves them all. */
export interface OnboardingForm {
  address: string;
  gpsAddress: string;
  phoneNumber: string;
  experience: string;
  bio: string;
  companyName: string;
  officePhone: string;
  companyRegNo: string;
  tinNumber: string;
  officeAddress: string;
  idNumber: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

/** An in-progress listing shown in the dashboard Recent Listings panel,
 *  with its wizard progress badge. */
export interface ListingDraft {
  id: string;
  image: string;
  typeLabel: string;
  title: string;
  location: string;
  stars: number;
  rating: string;
  createdOn: string;
  stepLabel: string;
  bedrooms: string;
  bathrooms: string;
  furnishing: string;
}

/** Lifecycle state of a landlord/agent/developer portal listing row. */
export type PortalListingStatus = "active" | "pending" | "inactive";

/** One row of the portal Listings table: the property summary, its review
 *  status, rent label, type and view count. */
export interface PortalListing {
  id: string;
  image: string;
  title: string;
  location: string;
  status: PortalListingStatus;
  priceLabel: string;
  propertyType: string;
  views: number;
}

/** One row of the portal Offers table: the property summary, rent label,
 *  type and the received-offer count. */
export interface PortalOffer {
  id: string;
  image: string;
  title: string;
  location: string;
  status: PortalListingStatus;
  priceLabel: string;
  propertyType: string;
  offers: number;
}

/** Review state of one bid on the portal offer-detail page — drives the
 *  All / Accepted / Declined tabs. */
export type OfferBidStatus = "pending" | "accepted" | "declined";

/** One bid row on the portal offer-detail page: who offered, the offered
 *  rent, move-in date and stay duration — plus the full-offer sheet fields
 *  (photo, detailed terms and the applicant's note). */
export interface OfferBid {
  id: string;
  bidderName: string;
  initials: string;
  avatar: string;
  amountLabel: string;
  amountDetail: string;
  moveInDate: string;
  moveInFull: string;
  stayDuration: string;
  stayFull: string;
  note: string;
  verified: boolean;
  status: OfferBidStatus;
}

/** Rent summary panel of the portal offer-detail header. */
export interface OfferDetailPricing {
  monthlyRent: string;
  availability: string;
  serviceCharge: string;
  utilityFees: string;
}

/** One row of the portal Deal Room table: the property summary, rent
 *  label, type and deal status. */
export interface PortalDeal {
  id: string;
  image: string;
  title: string;
  location: string;
  status: PortalListingStatus;
  priceLabel: string;
  propertyType: string;
}

/** A landlord-scheduled viewing: display-ready date/time labels. */
export interface ScheduledViewing {
  id: string;
  dateLabel: string;
  timeLabel: string;
}

/** Scalar fields of the create-listing wizard, keyed by control `name` so one
 *  generic handler serves inputs and selects alike. Media uploads live in
 *  separate uploader state; later steps extend this interface. */
export interface ListingDetailsForm {
  title: string;
  description: string;
  propertyType: string;
  listingType: string;
  furnishing: string;
  bedrooms: string;
  availability: string;
  bathrooms: string;
  buildingCondition: string;
  address: string;
  area: string;
  city: string;
  closestLandmark: string;
  monthlyRent: string;
  securityDeposit: string;
  paymentFrequency: string;
  rentDuration: string;
  serviceCharge: string;
  serviceChargeFrequency: string;
  interiorFeatures: string;
  parking: string;
  buildingFeatures: string;
  amenities: string;
  petsAllowed: string;
  smokingAllowed: string;
  partiesAllowed: string;
  maxOccupants: string;
  noiseRestrictions: string;
  additionalTerms: string;
}

export interface ContactMethod {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  value: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: AccordionItem[];
}

export interface LegalSection {
  /** Omit for the untitled intro block. */
  heading?: string;
  paragraphs: string[];
}

export interface ResourceArticle {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  /** Body paragraphs rendered on the article detail page. */
  body: string[];
}

export interface ResourceSection {
  id: string;
  articles: ResourceArticle[];
}

export interface PortalFeature {
  title: string;
  description: string;
}

export interface PortalFeatureBlock {
  id: string;
  titleTop: string;
  titleBottom: string;
  features: PortalFeature[];
}

/** An audience option on the "Select user type" onboarding page. */
export interface PortalUserType {
  id: "developers" | "landlords" | "agents";
  label: string;
  /** The first tile's caption is left-aligned in the design, the rest centred. */
  labelAlign?: "left" | "center";
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface FilterOptionsGroup {
  kind: "options";
  id: string;
  title: string;
  options: string[];
}

export interface FilterSelectBlock {
  kind: "select";
  id: string;
  title: string;
  placeholder: string;
  options: string[];
}

export interface FilterBudgetBlock {
  kind: "budget";
  id: string;
  title: string;
  placeholder: string;
  suffix: string;
}

export type FilterBlock =
  | FilterOptionsGroup
  | FilterSelectBlock
  | FilterBudgetBlock;
