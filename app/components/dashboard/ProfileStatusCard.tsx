import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { PROFILE_COMPLETION_PERCENT } from "~/data/dashboard";

/** "Profile Status" card: why completing the profile matters, the completion
 *  progress and the action into the landlord onboarding wizard. */
export function ProfileStatusCard({ className }: { className?: string }) {
  const percent = PROFILE_COMPLETION_PERCENT;

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
