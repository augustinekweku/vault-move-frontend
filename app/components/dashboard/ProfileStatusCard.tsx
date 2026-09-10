import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import {
  PROFILE_COMPLETION_PERCENT,
  VERIFIED_PROFILE_CARD,
  FAILED_VERIFICATION_CARD,
} from "~/data/dashboard";

export type VerificationStatus = "default" | "pending" | "verified" | "failed";

const CARD_CLASS =
  "rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]";

function CardShell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <section className={cn(CARD_CLASS, className)}>{children}</section>;
}

/** Right-column verification card of the landlord/agent/developer dashboard.
 *  `default` prompts into the onboarding wizard, `pending` covers the review
 *  window, `verified` unlocks listing, and `failed` opens the reviewer query
 *  dialog via `onViewQuery`. */
export function ProfileStatusCard({
  className,
  status = "default",
  onViewQuery,
}: {
  className?: string;
  status?: VerificationStatus;
  onViewQuery?: () => void;
}) {
  if (status === "verified") {
    return (
      <CardShell className={className}>
        <h2 className="text-base font-semibold text-ink">
          {VERIFIED_PROFILE_CARD.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-500">
          {VERIFIED_PROFILE_CARD.body}
        </p>

        {/* The wizard's first step is live; later steps land behind it. */}
        <Button
          to="/dashboard/create-listing"
          size="sm"
          className="mt-4 h-11 w-full text-[15px]"
        >
          {VERIFIED_PROFILE_CARD.actionLabel}
        </Button>
      </CardShell>
    );
  }

  if (status === "failed") {
    return (
      <CardShell className={className}>
        <h2 className="text-base font-semibold text-ink">
          {FAILED_VERIFICATION_CARD.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-500">
          {FAILED_VERIFICATION_CARD.body}
        </p>

        <Button
          size="sm"
          onClick={onViewQuery}
          className="mt-4 h-11 w-full bg-danger text-[15px] text-white hover:bg-danger/90"
        >
          {FAILED_VERIFICATION_CARD.actionLabel}
        </Button>
      </CardShell>
    );
  }

  if (status === "pending") {
    return (
      <CardShell className={className}>
        <h2 className="text-base font-semibold text-ink">Profile Status</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-500">
          Thanks! We&rsquo;ve received your submission and are currently
          verifying your information. We&rsquo;ll notify you as soon as your
          verification is complete. This usually takes 1-3 business days.
        </p>

        <span className="mt-4 flex h-9 w-full items-center justify-center rounded-lg bg-warning text-sm font-medium text-white">
          Verification in progress
        </span>
      </CardShell>
    );
  }

  const percent = PROFILE_COMPLETION_PERCENT;

  return (
    <CardShell className={className}>
      <h2 className="text-base font-semibold text-ink">Profile Status</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-500">
        Complete your profile and verify your ID to protect your account,
        increase your credibility, and securely connect with others.
      </p>

      <div className="mt-4 flex items-center gap-2">
        <div
          role="progressbar"
          aria-label="Profile completion"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-line-soft"
        >
          <div
            className="h-full rounded-full bg-brand-navy"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs font-medium text-muted-700">{percent}%</span>
      </div>

      <Button
        to="/landlord-onboarding"
        size="sm"
        className="mt-4 h-9 w-full bg-brand/70 text-sm hover:bg-brand"
      >
        Complete Profile
      </Button>
    </CardShell>
  );
}
