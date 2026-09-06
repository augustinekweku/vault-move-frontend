import { useState } from "react";
import type { AccountTab } from "~/types";
import { ACCOUNT_TABS } from "~/data/account";
import { cn } from "~/lib/utils";

/** My Account tab bar (My Profile / Payments and Escrow / Property History /
 *  Settings) — the panels land later, so only the active indicator switches
 *  for now. */
export function AccountSection({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");

  function handleTabClick(event: React.MouseEvent<HTMLButtonElement>) {
    const value = event.currentTarget.dataset.value as AccountTab | undefined;
    if (value) setActiveTab(value);
  }

  function renderTab(tab: (typeof ACCOUNT_TABS)[number]) {
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
          {ACCOUNT_TABS.map(renderTab)}
        </div>
      </div>
    </section>
  );
}
