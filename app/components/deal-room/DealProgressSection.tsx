import { useState } from "react";
import type { DealDetails } from "~/types";
import { cn } from "~/lib/utils";
import { IdVerificationPanel } from "~/components/deal-room/IdVerificationPanel";
import { RentersContractPanel } from "~/components/deal-room/RentersContractPanel";
import { PaymentPanel } from "~/components/deal-room/PaymentPanel";

interface DealProgressSectionProps {
  details: DealDetails;
  className?: string;
}

/** "Deal Progress" section of the deal detail page: the heading with the
 *  "Step n of 5" line, the step tab bar (ID Verification … Closing) and the
 *  step panel. The tab bar is a progress stepper — every step up to the
 *  current one stays underlined and can be re-viewed; later steps are
 *  disabled. Only the first three steps have panels so far. */
export function DealProgressSection({
  details,
  className,
}: DealProgressSectionProps) {
  const currentIndex = details.currentStep - 1;
  const [viewedStep, setViewedStep] = useState(currentIndex);

  function handleStepClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { step } = event.currentTarget.dataset;
    if (step !== undefined) setViewedStep(Number(step));
  }

  function renderStepTab(step: string, index: number) {
    const reached = index <= currentIndex;
    return (
      <button
        key={step}
        type="button"
        data-step={index}
        onClick={handleStepClick}
        disabled={!reached}
        aria-selected={index === viewedStep}
        className={cn(
          "-mb-px border-b-4 px-4 pb-3 text-sm font-semibold whitespace-nowrap transition-colors first:pl-0",
          reached
            ? "border-brand text-brand"
            : "border-transparent text-ink/50",
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
          Step {viewedStep + 1} of {details.steps.length}
        </p>
      </div>

      <div className="mt-4 border-b border-line">
        <div className="no-scrollbar flex overflow-x-auto">
          {details.steps.map(renderStepTab)}
        </div>
      </div>

      {viewedStep === 0 ? (
        <IdVerificationPanel
          renterRequirements={details.renterRequirements}
          landlordRequirements={details.landlordRequirements}
          className="mt-6"
        />
      ) : viewedStep === 1 ? (
        <RentersContractPanel
          documents={details.contractDocuments}
          signedContracts={details.signedContracts}
          className="mt-6"
        />
      ) : viewedStep === 2 ? (
        <PaymentPanel
          breakdown={details.paymentBreakdown}
          total={details.paymentTotal}
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
