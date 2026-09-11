import { useState } from "react";
import type { ReactNode } from "react";
import type { DealDetails } from "~/types";
import { cn } from "~/lib/utils";
import { IdVerificationPanel } from "~/components/deal-room/IdVerificationPanel";
import { RentersContractPanel } from "~/components/deal-room/RentersContractPanel";
import { PaymentPanel } from "~/components/deal-room/PaymentPanel";
import { HandoverPanel } from "~/components/deal-room/HandoverPanel";
import { ClosingPanel } from "~/components/deal-room/ClosingPanel";

interface DealProgressSectionProps {
  details: DealDetails;
  className?: string;
  /** 0-based step shown first — defaults to the current step. The portal
   *  deal workspace opens on Documents even mid-deal. */
  initialStep?: number;
  /** Replaces the step-0 panel — the portal passes its Documents panel. */
  documentsPanel?: ReactNode;
  /** Hides the "Deal Progress / Step n of 5" heading — the portal
   *  workspace shows just the tab bar. */
  hideHeading?: boolean;
  /** Underlines only the viewed tab instead of every reached step — the
   *  portal tab bar highlights the active tab alone. */
  activeTabOnly?: boolean;
}

/** "Deal Progress" section of the deal detail page: the heading with the
 *  "Step n of 5" line, the step tab bar (ID Verification … Closing) and the
 *  step panel. The tab bar is a progress stepper — every step up to the
 *  current one stays underlined in full brand and can be re-viewed (the
 *  viewed step's label goes bold brand-navy as its identifier); later
 *  steps are disabled. */
export function DealProgressSection({
  details,
  className,
  initialStep,
  documentsPanel,
  hideHeading = false,
  activeTabOnly = false,
}: DealProgressSectionProps) {
  const currentIndex = details.currentStep - 1;
  const [viewedStep, setViewedStep] = useState(initialStep ?? currentIndex);

  function handleStepClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { step } = event.currentTarget.dataset;
    if (step !== undefined) setViewedStep(Number(step));
  }

  /* The handover confirmation modal's Done advances the view to Closing. */
  function handleHandoverConfirmed() {
    setViewedStep(4);
  }

  function renderStepTab(step: string, index: number) {
    const reached = index <= currentIndex;
    const viewing = index === viewedStep;
    return (
      <button
        key={step}
        type="button"
        data-step={index}
        onClick={handleStepClick}
        disabled={!reached}
        aria-selected={viewing}
        className={cn(
          "-mb-px border-b-4 whitespace-nowrap transition-colors",
          activeTabOnly
            ? viewing
              ? "border-brand pb-3 text-base font-semibold text-brand"
              : "border-transparent pb-3 text-base font-normal text-ink-soft"
            : cn(
                "px-4 pb-3 text-sm first:pl-0",
                viewing ? "text-primary font-bold" : "font-semibold",
                reached
                  ? "border-brand text-brand"
                  : "border-transparent text-ink/50",
              ),
        )}
      >
        {step}
      </button>
    );
  }

  return (
    <section className={className}>
      {!hideHeading && (
        <div className="flex items-baseline gap-4">
          <h2 className="text-xl font-bold text-ink">Deal Progress</h2>
          <p className="text-sm text-muted-500">
            Step {viewedStep + 1} of {details.steps.length}
          </p>
        </div>
      )}

      <div className={hideHeading ? "border-b border-line" : "mt-4 border-b border-line"}>
        <div
          className={
            activeTabOnly
              ? "no-scrollbar flex gap-10 overflow-x-auto"
              : "no-scrollbar flex overflow-x-auto"
          }
        >
          {details.steps.map(renderStepTab)}
        </div>
      </div>

      {viewedStep === 0 ? (
        (documentsPanel ?? (
          <IdVerificationPanel
            renterRequirements={details.renterRequirements}
            landlordRequirements={details.landlordRequirements}
            className="mt-6"
          />
        ))
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
      ) : viewedStep === 3 ? (
        <HandoverPanel
          groups={details.handoverChecklist}
          onConfirmed={handleHandoverConfirmed}
          className="mt-6"
        />
      ) : viewedStep === 4 ? (
        <ClosingPanel className="mt-6" />
      ) : (
        <p className="mt-6 text-sm text-ink/60">
          This step hasn&apos;t started yet.
        </p>
      )}
    </section>
  );
}
