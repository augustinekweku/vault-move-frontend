import { Fragment } from "react";
import type { Stat } from "~/types";
import { cn } from "~/lib/utils";

interface DashboardStatsProps {
  stats: Stat[];
  className?: string;
}

/** The four-figure account summary strip (Listed Properties, Property Views,
 *  Properties rented, Properties sold): white card with full-height vertical
 *  dividers between the centred figures on desktop, a 2x2 grid on mobile. */
export function DashboardStats({ stats, className }: DashboardStatsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 overflow-hidden rounded-lg border border-line bg-white lg:flex lg:items-stretch",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <Fragment key={stat.label}>
          {i > 0 && (
            <div
              aria-hidden
              className="hidden w-px shrink-0 bg-line lg:block"
            />
          )}
          <div className="flex-1 px-2 py-5 md:py-7 text-center">
            <p className="text-[32px] font-semibold leading-[1.03] tracking-[-0.02em] text-gray-900">
              {stat.value}
            </p>
            <p className="mt-1 text-sm leading-[1.3] text-brand-navy/54">
              {stat.label}
            </p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
