import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { PROFILE_COMPLETION_PERCENT } from "~/data/dashboard";

/** "Profile Status" card: why completing the profile matters, the completion
 *  progress and the action into the landlord onboarding wizard. Once the
 *  onboarding documents are submitted (`pending`), it switches to the
 *  verification-in-progress state instead. */
export function ProfileStatusCard({
  className,
  pending = false,
}: {
  className?: string;
  pending?: boolean;
}) {
  const percent = PROFILE_COMPLETION_PERCENT;

  if (pending) {
    return (
      <section
        className={cn(
          "rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
          className,
        )}
      >
        <h2 className="text-base font-semibold text-ink">Profile Status</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-500">
          Thanks! We&rsquo;ve received your submission and are currently
          verifying your information. We&rsquo;ll notify you as soon as your
          verification is complete. This usually takes 1–3 business days.
        </p>

        <span className="mt-4 flex h-9 w-full items-center justify-center rounded-lg bg-warning text-sm font-medium text-white">
          Verification in progress
        </span>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
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
    </section>
  );
}
