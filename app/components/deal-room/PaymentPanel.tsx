import type { PaymentBreakdownRow } from "~/types";
import { cn } from "~/lib/utils";
import { ESCROW_ASSURANCES } from "~/data/deals";
import { CheckIcon } from "~/components/ui/icons";

/** The round check badge used across the payment step — brand once the
 *  milestone is done, grey while it is pending. */
export function CheckCircleBadge({ done = true }: { done?: boolean }) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full",
        done ? "bg-brand" : "bg-line",
      )}
    >
      <CheckIcon aria-hidden className="size-4 text-line-soft" />
    </span>
  );
}

/** Module-level so the list `.map()`s take named functions, not inline
 *  callbacks. */
function renderAssurance(text: string) {
  return (
    <li key={text} className="flex items-center gap-2">
      <CheckCircleBadge />
      <span className="text-base text-ink-soft">{text}</span>
    </li>
  );
}

function renderBreakdownRow(row: PaymentBreakdownRow) {
  return (
    <li
      key={row.label}
      className="flex items-center justify-between gap-4 border-b border-line-soft py-3 text-sm"
    >
      <span className="text-muted-500">{row.label}</span>
      <span className="text-ink-soft">{row.amount}</span>
    </li>
  );
}

interface PaymentPanelProps {
  /** "Payment Summary" breakdown rows. */
  breakdown: PaymentBreakdownRow[];
  /** Total line, e.g. "GHS 5,580.00". */
  total: string;
  className?: string;
}

/** The "Payment" step panel of the deal detail page: the escrow assurance
 *  checklist and "Payment Summary" breakdown in one card, then the "Make
 *  Payment" card — its method boxes are empty placeholders until the
 *  payment methods are designed. */
export function PaymentPanel({
  breakdown,
  total,
  className,
}: PaymentPanelProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <article className="rounded-xl border border-line bg-white p-5 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
        <h3 className="text-base font-bold text-ink mt-2 mb-3">
          Payment in Escrow
        </h3>
        <div className="mt-4 rounded-md bg-surface-alt p-5 shadow-[0_1px_4px_rgba(85,69,150,0.05)] sm:p-6">
          <h4 className="text-base font-semibold text-brand">
            Your Funds are secure
          </h4>
          <ul className="mt-6 space-y-4">
            {ESCROW_ASSURANCES.map(renderAssurance)}
          </ul>
        </div>

        <h4 className="mt-10 text-sm font-bold text-ink">Payment Summary</h4>
        <div className="mt-6">
          <div className="flex items-center justify-between gap-4 border-b border-line-soft py-3 text-sm text-muted-500">
            <span>Breakdown</span>
            <span>Amount (GHC)</span>
          </div>
          <ul>{breakdown.map(renderBreakdownRow)}</ul>
          <div className="py-4 text-right">
            <p className="text-sm text-muted-500">Total amount due</p>
            <p className="mt-1 text-3xl font-bold text-muted-500">{total}</p>
          </div>
        </div>
      </article>

      <article className="rounded-xl border border-line bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
        <h3 className="text-base font-bold text-ink">Make Payment</h3>
        <p className="mt-1 text-sm text-muted-500">
          Choose your preferred payment method to securely fund your escrow
          payment.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="h-28 rounded-xl bg-surface-alt" />
          <div className="h-28 rounded-xl bg-surface-alt" />
        </div>
      </article>
    </div>
  );
}
