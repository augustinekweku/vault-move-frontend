import { useState } from "react";
import type { HandoverGroup } from "~/types";
import { cn } from "~/lib/utils";
import { CheckIcon } from "~/components/ui/icons";

interface HandoverPanelProps {
  /** Checklist groups (2×2 grid). */
  groups: HandoverGroup[];
  className?: string;
}

/** The "Handing Over" step panel of the deal detail page: the handover
 *  checklist — ticking items is local state until the flow is wired — and
 *  the "Confirm Property Handover" section, whose action unlocks once every
 *  item is ticked (the confirm itself is a visual mock). */
export function HandoverPanel({ groups, className }: HandoverPanelProps) {
  /* Tick state per item, keyed "group:label" — labels repeat across groups. */
  const [ticked, setTicked] = useState<Record<string, boolean>>({});

  const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);
  const tickedCount = Object.values(ticked).filter(Boolean).length;
  const allTicked = totalItems > 0 && tickedCount === totalItems;

  function handleToggle(event: React.MouseEvent<HTMLButtonElement>) {
    const { item } = event.currentTarget.dataset;
    if (!item) return;
    setTicked((current) => ({ ...current, [item]: !current[item] }));
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
                on ? "border-brand bg-brand" : "border-line bg-white",
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
          className="w-full shrink-0 rounded-lg bg-brand px-6 py-2.5 text-sm text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-brand/90 disabled:bg-brand/40 sm:w-64"
        >
          Confirm Property Handover
        </button>
      </div>
    </div>
  );
}
