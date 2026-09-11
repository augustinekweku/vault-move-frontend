import { cn } from "~/lib/utils";

export interface EnquiryTab {
  value: string;
  label: string;
}

interface EnquiryTabsProps {
  tabs: EnquiryTab[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

/** Underline tab row shared by the renter enquiry page and the portal
 *  Enquiries page. The active tab takes the brand underline; selection
 *  travels on `data-value` through one handler. */
export function EnquiryTabs({
  tabs,
  active,
  onChange,
  className,
}: EnquiryTabsProps) {
  function handleTabClick(event: React.MouseEvent<HTMLButtonElement>) {
    onChange(event.currentTarget.dataset.value ?? "");
  }

  function renderTab(tab: EnquiryTab) {
    const selected = tab.value === active;
    return (
      <button
        key={tab.value}
        type="button"
        data-value={tab.value}
        onClick={handleTabClick}
        aria-selected={selected}
        className={cn(
          "-mb-px border-b-4 pb-3 text-base whitespace-nowrap transition-colors",
          selected
            ? "border-brand font-semibold text-brand"
            : "border-transparent font-normal text-ink/50 hover:text-ink",
        )}
      >
        {tab.label}
      </button>
    );
  }

  return (
    <div className={cn("flex gap-8 overflow-x-auto no-scrollbar", className)}>
      {tabs.map(renderTab)}
    </div>
  );
}
