import { useState } from "react";
import type { Deal, DealTab } from "~/types";
import { DEAL_TABS, getDealsForTab } from "~/data/deals";
import { cn } from "~/lib/utils";
import { DealCard } from "~/components/deal-room/DealCard";

/** Renders one deal card — module-level so the list `.map()` takes a named
 *  function, not an inline callback. */
function renderDeal(deal: Deal) {
  return <DealCard key={deal.id} deal={deal} />;
}

/** Deal-room content: the status tab bar (All / Pending / Rejected / Closed
 *  Deals + Reports), the active tab's heading and the filtered deal cards —
 *  or an empty state when the tab has nothing to show. */
export function DealsSection({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<DealTab>("all");
  const deals = getDealsForTab(activeTab);
  const activeLabel = DEAL_TABS.find(
    (tab) => tab.value === activeTab,
  )?.label;

  function handleTabClick(event: React.MouseEvent<HTMLButtonElement>) {
    const value = event.currentTarget.dataset.value as DealTab | undefined;
    if (value) setActiveTab(value);
  }

  function renderTab(tab: (typeof DEAL_TABS)[number]) {
    const active = tab.value === activeTab;
    return (
      <button
        key={tab.value}
        type="button"
        data-value={tab.value}
        onClick={handleTabClick}
        aria-selected={active}
        className={cn(
          "-mb-px border-b-2 pb-3 text-sm font-semibold whitespace-nowrap transition-colors",
          active
            ? "border-brand text-brand"
            : "border-transparent text-ink/50 hover:text-ink",
        )}
      >
        {tab.label}
      </button>
    );
  }

  return (
    <section className={className}>
      <div className="border-b border-line">
        <div className="no-scrollbar flex gap-8 overflow-x-auto">
          {DEAL_TABS.map(renderTab)}
        </div>
      </div>

      <h1 className="mt-6 text-xl font-bold text-ink">{activeLabel}</h1>

      <div className="mt-6 max-w-4xl space-y-6 pb-16">
        {deals.length > 0 ? (
          deals.map(renderDeal)
        ) : (
          <p className="text-sm text-ink/60">Nothing to show here yet.</p>
        )}
      </div>
    </section>
  );
}
