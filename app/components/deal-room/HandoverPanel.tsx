import { useState } from "react";
import type { HandoverGroup } from "~/types";
import { cn } from "~/lib/utils";
import { HANDOVER_CONFIRMATION } from "~/data/deals";
import { Modal } from "~/components/ui/Modal";
import { CheckIcon, CloseIcon } from "~/components/ui/icons";

interface HandoverPanelProps {
  /** Checklist groups (2×2 grid). */
  groups: HandoverGroup[];
  /** Called when the confirmation modal's "Done" is clicked — advances the
   *  view to the Closing step. */
  onConfirmed?: () => void;
  className?: string;
}

/** The "Handing Over" step panel of the deal detail page: the handover
 *  checklist — ticking items is local state until the flow is wired — and
 *  the "Confirm Property Handover" section, whose action unlocks once every
 *  item is ticked. Confirming pops the "Handover Confirmed" modal; its Done
 *  action closes it and hands off to `onConfirmed`. */
export function HandoverPanel({
  groups,
  onConfirmed,
  className,
}: HandoverPanelProps) {
  /* Tick state per item, keyed "group:label" — labels repeat across groups. */
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);
  const tickedCount = Object.values(ticked).filter(Boolean).length;
  const allTicked = totalItems > 0 && tickedCount === totalItems;

  function handleToggle(event: React.MouseEvent<HTMLButtonElement>) {
    const { item } = event.currentTarget.dataset;
    if (!item) return;
    setTicked((current) => ({ ...current, [item]: !current[item] }));
  }

  function handleConfirmClick() {
    setConfirmOpen(true);
  }

  function handleModalClose() {
    setConfirmOpen(false);
  }

  function handleDoneClick() {
    setConfirmOpen(false);
    onConfirmed?.();
  }

  function renderItem(group: HandoverGroup) {
    return function Item(label: string) {
      const key = `${group.title}:${label}`;
      const on = Boolean(ticked[key]);
      return (
        <li key={key}>
          <button
            type="button"
            role="checkbox"
            aria-checked={on}
            data-item={key}
            onClick={handleToggle}
            className="flex items-center gap-2"
          >
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-full border",
                on ? "border-accent bg-accent" : "border-line bg-white",
              )}
            >
              {on && <CheckIcon aria-hidden className="size-3 text-white" />}
            </span>
            <span className="text-sm font-medium text-muted-700">{label}</span>
          </button>
        </li>
      );
    };
  }

  function renderGroup(group: HandoverGroup) {
    return (
      <div key={group.title}>
        <h4 className="text-xs leading-6 font-bold text-ink">{group.title}</h4>
        <ul className="mt-6 space-y-4">{group.items.map(renderItem(group))}</ul>
      </div>
    );
  }

  return (
    <div className={className}>
      <article className="rounded-xl border border-line bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
        <h3 className="text-base font-bold text-ink">
          Handing Over Check list
        </h3>
        <div className="mt-6 grid gap-y-12 sm:grid-cols-2 sm:gap-x-16">
          {groups.map(renderGroup)}
        </div>
      </article>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <h4 className="text-sm font-bold text-ink">
            Confirm Property Handover
          </h4>
          <p className="mt-2 text-sm text-[#10284B8A]">
            Once you&apos;ve received the property and verified that everything
            is in the agreed condition, confirm the handover to continue to the
            final stage of your transaction.
          </p>
        </div>
        <button
          type="button"
          disabled={!allTicked}
          onClick={handleConfirmClick}
          className="w-full shrink-0 rounded-lg bg-brand px-6 py-2.5 text-sm text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90 disabled:bg-brand/40 sm:w-64"
        >
          Confirm Property Handover
        </button>
      </div>

      <Modal
        open={confirmOpen}
        onClose={handleModalClose}
        labelledBy="handover-confirmed-title"
        className="max-w-125 rounded-2xl"
      >
        <button
          type="button"
          onClick={handleModalClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-ink hover:text-brand"
        >
          <CloseIcon className="size-4" />
        </button>

        <div className="flex flex-col items-center px-8 pt-10 pb-8 text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-[#edf1fa]">
            <img src="/icons/success.svg" alt="" className="size-10" />
          </span>
          <h2
            id="handover-confirmed-title"
            className="mt-6 text-2xl font-extrabold text-black"
          >
            {HANDOVER_CONFIRMATION.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-500">
            {HANDOVER_CONFIRMATION.body}
          </p>
          <button
            type="button"
            onClick={handleDoneClick}
            className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-brand text-[15.5px] leading-6 font-medium text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90"
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
}
