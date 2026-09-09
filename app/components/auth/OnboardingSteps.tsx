import { cn } from "~/lib/utils";
import { CheckIcon } from "~/components/ui/icons";
import {
  LANDLORD_ONBOARDING_STEPS,
  LANDLORD_ONBOARDING_TITLES,
  type LandlordOnboardingStep,
} from "~/data/auth";

/** Sidebar step list for the landlord onboarding panel — same brand panel
 *  and wordmark as the login sidebar, with the four setup steps below. */
export function OnboardingSteps({
  currentStep,
}: {
  currentStep: LandlordOnboardingStep;
}) {
  function renderStep(step: LandlordOnboardingStep) {
    const done = step <= currentStep;
    return (
      <li key={step} className="flex items-center gap-3">
        <span
          aria-hidden
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-full",
            done ? "bg-white" : "bg-white/30",
          )}
        >
          {done && <CheckIcon className="size-3 text-brand" />}
        </span>
        <span className="flex flex-col">
          <span
            className={cn(
              "text-[13px] leading-5",
              done ? "font-semibold text-white" : "text-white/60",
            )}
          >
            {LANDLORD_ONBOARDING_TITLES[step]}
          </span>
          <span className="text-[11px] leading-4 text-white/60">
            Step {step} of 4
          </span>
        </span>
      </li>
    );
  }

  return (
    <ol className="flex flex-col gap-7">
      {LANDLORD_ONBOARDING_STEPS.map(renderStep)}
    </ol>
  );
}
