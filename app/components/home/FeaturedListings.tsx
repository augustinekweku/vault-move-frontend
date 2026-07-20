import { useRef } from "react";
import { Link } from "react-router";
import type { Property } from "~/types";
import { Container } from "~/components/ui/Container";
import { PropertyCard } from "~/components/property/PropertyCard";
import { IconButton } from "~/components/ui/IconButton";
import { ArrowRightIcon, ChevronDownIcon } from "~/components/ui/icons";

interface FeaturedListingsProps {
  properties: Property[];
}

export function FeaturedListings({ properties }: FeaturedListingsProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-brand-dark">
            Featured listings
          </h2>
          <Link
            to="/buy"
            className="flex items-center gap-4 text-[15px] font-medium text-brand-dark"
          >
            <span className="hidden sm:inline">View all properties</span>
            <IconButton to="/buy" aria-label="View all properties">
              <ArrowRightIcon className="size-5" />
            </IconButton>
          </Link>
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md lg:flex"
          >
            <ChevronDownIcon className="size-5 rotate-90" />
          </button>

          <div
            ref={trackRef}
            className="grid snap-x snap-mandatory grid-flow-col auto-cols-[85%] gap-6 overflow-x-auto scroll-smooth pb-2 sm:auto-cols-[45%] lg:auto-cols-[calc(33.333%-1rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                className="snap-start"
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll(1)}
            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md lg:flex"
          >
            <ChevronDownIcon className="size-5 -rotate-90" />
          </button>
        </div>
      </Container>
    </section>
  );
}
