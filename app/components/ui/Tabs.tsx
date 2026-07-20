import { cn } from "~/lib/utils";

interface TabsProps {
  tabs: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/** Segmented Rent / Buy style tabs sitting above the search card. */
export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex", className)}>
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={cn(
              "rounded-t-xl border border-b-0 px-6 py-2.5 text-sm font-bold transition-colors",
              active
                ? "border-line bg-white text-accent"
                : "border-transparent bg-transparent text-[#344054]/40",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
