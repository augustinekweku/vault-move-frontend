import { useState } from "react";
import type { DealDetails } from "~/types";
import { cn } from "~/lib/utils";
import { IdVerificationPanel } from "~/components/deal-room/IdVerificationPanel";

interface DealProgressSectionProps {
  details: DealDetails;
  className?: string;
}

/** "Deal Progress" section of the deal detail page: the heading with the
 *  "Step n of 5" line, the step tab bar (ID Verification … Closing) and the
 *  active step's panel. Only the ID Verification step has content so far. */
export function DealProgressSection({
  details,
  className,
}: DealProgressSectionProps) {
  const [activeStep, setActiveStep] = useState(details.currentStep - 1);

  function handleStepClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { step } = event.currentTarget.dataset;
    if (step !== undefined) setActiveStep(Number(step));
  }

  function renderStepTab(step: string, index: number) {
    const active = index === activeStep;
    return (
      <button
        key={step}
        type="button"
        data-step={index}
        onClick={handleStepClick}
        aria-selected={active}
        className={cn(
          "-mb-px border-b-2 pb-3 text-sm font-semibold whitespace-nowrap transition-colors",
          active
            ? "border-brand text-brand"
            : "border-transparent text-ink/50 hover:text-ink",
        )}
      >
        {step}
      </button>
    );
  }

  return (
    <section className={className}>
      <div className="flex items-baseline gap-4">
        <h2 className="text-xl font-bold text-ink">Deal Progress</h2>
        <p className="text-sm text-muted-500">
          Step {activeStep + 1} of {details.steps.length}
        </p>
      </div>

      <div className="mt-4 border-b border-line">
        <div className="no-scrollbar flex gap-8 overflow-x-auto">
          {details.steps.map(renderStepTab)}
        </div>
      </div>

      {activeStep === 0 ? (
        <IdVerificationPanel
          renterRequirements={details.renterRequirements}
          landlordRequirements={details.landlordRequirements}
          className="mt-6"
        />
      ) : (
        <p className="mt-6 text-sm text-ink/60">
          This step hasn&apos;t started yet.
        </p>
      )}
    </section>
  );
}
