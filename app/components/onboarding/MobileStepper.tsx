import { cn } from "~/lib/utils";
import { CheckIcon } from "~/components/ui/icons";
import { LANDLORD_ONBOARDING_STEPS } from "~/data/auth";
import type { LandlordOnboardingStep } from "~/data/auth";

/** Mobile progress indicator — the brand sidebar with the step list only
 *  renders on desktop, so small screens get this segmented stepper:
 *  numbered nodes joined by connectors that fill in brand as you advance. */
export function MobileStepper({
  currentStep,
}: {
  currentStep: LandlordOnboardingStep;
}) {
  /** One node: status circle plus the connector to the next node. Needs the
   *  current step, so it lives with the state. */
  function renderStep(item: LandlordOnboardingStep, index: number) {
    const done = item < currentStep;
    const current = item === currentStep;
    return (
      <li
        key={item}
        aria-current={current ? "step" : undefined}
        className="flex flex-1 items-center last:flex-none"
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            done && "bg-brand text-white",
            current && "border-2 border-brand bg-white text-brand",
            !done && !current && "bg-line-soft text-muted-500",
          )}
        >
          {done ? <CheckIcon className="size-4" /> : item}
        </span>
        {index < LANDLORD_ONBOARDING_STEPS.length - 1 && (
          <span
            aria-hidden
            className={cn(
              "mx-1.5 h-0.5 flex-1 rounded-full",
              item < currentStep ? "bg-brand" : "bg-line-soft",
            )}
          />
        )}
      </li>
    );
  }

  return (
    <div className="mb-8 lg:hidden">
      <p className="text-xs font-medium text-muted-700">
        Step {currentStep} of {LANDLORD_ONBOARDING_STEPS.length}
      </p>
      <ol className="mt-3 flex items-center">
        {LANDLORD_ONBOARDING_STEPS.map(renderStep)}
      </ol>
    </div>
  );
}
