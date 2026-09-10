import { cn } from "~/lib/utils";
import { CheckIcon } from "~/components/ui/icons";
import { CREATE_LISTING_STEPS } from "~/data/listing";

/** Vertical stepper of the create-listing wizard: navy dots with the step
 *  title and counter. Reached steps (including the current one) carry the
 *  white check; later steps are plain dots. Display-only until the later
 *  step panels are built. */
export function CreateListingSteps({
  currentStep,
  className,
}: {
  /** 1-based index of the active step. */
  currentStep: number;
  className?: string;
}) {
  function renderStep(label: string, index: number) {
    const step = index + 1;
    const reached = step <= currentStep;
    return (
      <li
        key={label}
        aria-current={step === currentStep ? "step" : undefined}
        className="flex items-start gap-6"
      >
        <span
          aria-hidden
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-deep text-white"
        >
          {reached && <CheckIcon className="size-3.5" />}
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className="text-base leading-[1.3] font-semibold text-ink">
            {label}
          </span>
          <span className="text-sm leading-[1.3] text-muted-500">
            Step {step} of {CREATE_LISTING_STEPS.length}
          </span>
        </span>
      </li>
    );
  }

  return (
    <ol className={cn("flex flex-col gap-10", className)}>
      {CREATE_LISTING_STEPS.map(renderStep)}
    </ol>
  );
}
