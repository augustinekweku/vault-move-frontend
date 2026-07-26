import { Fragment } from "react";
import type { Stat } from "~/types";
import { cn } from "~/lib/utils";

interface LandlordStatsProps {
  stats: Stat[];
  className?: string;
}

/** The four-figure stats card under the landlord header — white card with
 *  vertical dividers between the centred figures (listed, views, sold,
 *  rented). Dividers only show on large screens; on mobile it's a 2x2 grid. */
export function LandlordStats({ stats, className }: LandlordStatsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-8 rounded-xl border border-line bg-white px-4 py-8 shadow-[0_4px_4px_rgba(0,0,0,0.05)] lg:flex lg:items-center lg:py-6",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <Fragment key={stat.label}>
          {i > 0 && (
            <div
              aria-hidden
              className="hidden h-29 w-px shrink-0 bg-line lg:block"
            />
          )}
          <div className="flex-1 text-center">
            <p className="text-3xl font-semibold tracking-tight text-gray-900">
              {stat.value}
            </p>
            <p className="mt-2 text-xl text-brand-navy/54 sm:text-2xl">
              {stat.label}
            </p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
