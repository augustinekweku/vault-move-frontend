import { Fragment, useState } from "react";
import type { Property, PropertyDetails, PropertyFactIcon } from "~/types";
import type { ComponentType, SVGProps } from "react";
import { cn } from "~/lib/utils";
import { PropertyReviews } from "~/components/property/PropertyReviews";
import {
  BathIcon,
  BedIcon,
  BuildingIcon,
  HeartIcon,
  HomeIcon,
  LocationIcon,
  ShareIcon,
  SofaIcon,
  StarIcon,
} from "~/components/ui/icons";

const FACT_ICONS: Record<
  PropertyFactIcon,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  home: HomeIcon,
  bed: BedIcon,
  bath: BathIcon,
  sofa: SofaIcon,
  building: BuildingIcon,
};

/** "Property Description" / "Property Location" / "Building features" —
 *  24px extrabold black. */
const sectionHeadingClass = "text-2xl font-extrabold leading-6 text-black";

/** Outlined pill chips used for features and amenities. */
function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg border border-line bg-white px-5 py-2.5 text-sm text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

interface PropertyOverviewProps {
  property: Property;
  details: PropertyDetails;
  className?: string;
}

const TABS = [
  { value: "details", label: "Property Details" },
  { value: "reviews", label: "Reviews" },
];

/** Everything under the gallery: title/save/share, location, rating, the
 *  facts bar and the Property Details / Reviews tabbed content. */
export function PropertyOverview({
  property,
  details,
  className,
}: PropertyOverviewProps) {
  const [tab, setTab] = useState("details");

  return (
    <section className={className}>
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">
          {property.title}
        </h1>
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            aria-label="Save property"
            className="text-ink hover:text-brand"
          >
            <HeartIcon className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Share property"
            className="text-ink hover:text-brand"
          >
            <ShareIcon className="size-5" />
          </button>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-2 text-sm text-ink/60">
        <LocationIcon className="size-5 text-brand" />
        {details.address}
      </p>

      <p className="mt-3 flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={cn(
              "size-5",
              i < Math.round(property.rating) ? "text-star" : "text-line",
            )}
          />
        ))}
        <span className="ml-2 text-sm text-ink/60">
          {property.rating.toFixed(1)}/5.0
        </span>
      </p>

      <div className="mt-6 rounded-xl border border-line bg-white px-4 py-5 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
        <dl className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {details.facts.map(({ label, value, icon }, i) => {
            const Icon = FACT_ICONS[icon];
            return (
              <Fragment key={label}>
                {i > 0 && (
                  <div
                    aria-hidden
                    className="h-px w-full shrink-0 bg-muted-700 lg:h-13.5 lg:w-px"
                  />
                )}
                <div className="flex shrink-0 flex-col gap-1">
                  <dt className="whitespace-nowrap text-base font-bold leading-6 text-ink">
                    {label}
                  </dt>
                  <dd className="flex items-center gap-1.5">
                    <Icon className="size-6 shrink-0 text-brand-blue" />
                    <span className="whitespace-nowrap text-sm font-medium leading-5 text-muted-700">
                      {value}
                    </span>
                  </dd>
                </div>
              </Fragment>
            );
          })}
        </dl>
      </div>

      <div className="mt-8 border-b border-line">
        <div className="flex gap-8">
          {TABS.map(({ value, label }) => {
            const active = tab === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                aria-selected={active}
                className={cn(
                  "-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors",
                  active
                    ? "border-brand text-brand"
                    : "border-transparent text-ink/50 hover:text-ink",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {tab === "details" ? (
        <div className="mt-6">
          <h2 className={sectionHeadingClass}>Property Description</h2>
          {details.description.map((paragraph, i) => (
            <p key={i} className="mt-4 text-base leading-6 text-ink/80">
              {paragraph}
            </p>
          ))}

          <h2 className={cn("mt-12", sectionHeadingClass)}>
            Property Location
          </h2>
          <div className="mt-4 rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
            <div className="overflow-hidden rounded-xl border border-line">
              <iframe
                title={`Map of ${details.address}`}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.26%2C5.59%2C-0.19%2C5.64&layer=mapnik&marker=5.6145%2C-0.2269"
                loading="lazy"
                className="h-102 w-full border-0"
              />
            </div>
          </div>

          <h2 className={cn("mt-12", sectionHeadingClass)}>
            Building features
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            {details.featureGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-base font-semibold text-ink">
                  {group.title}
                </h3>
                <ChipList items={group.items} />
              </div>
            ))}
          </div>

          <h2 className={cn("mt-12", sectionHeadingClass)}>
            Amenities and Utilities
          </h2>
          <ChipList items={details.amenities} />

          <h2 className={cn("mt-12", sectionHeadingClass)}>House Rules</h2>
          <ul className="mt-4 list-disc space-y-2.5 pl-5 text-ink/80">
            {details.houseRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      ) : details.reviews.items.length > 0 ? (
        <PropertyReviews
          summary={details.reviews.summary}
          reviews={details.reviews.items}
          className="mt-8"
        />
      ) : (
        <p className="mt-6 text-sm text-ink/60">
          No reviews yet for this property.
        </p>
      )}
    </section>
  );
}
