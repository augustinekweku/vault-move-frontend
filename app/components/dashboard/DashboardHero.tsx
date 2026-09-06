import { Container } from "~/components/ui/Container";
import { PropertySearchBar } from "~/components/property/PropertySearchBar";

/** Signed-in landing hero: brand banner with a centred heading and the
 *  property search card overlapping its bottom edge. */
export function DashboardHero() {
  return (
    <section>
      <div className="relative overflow-hidden bg-brand">
        {/* Concentric rings, top-right */}
        <img
          src="/images/footer-ornament.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 size-78 -scale-x-100 select-none"
        />
        {/* Dot grid, bottom-left */}
        <img
          src="/icons/ornament-11.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 -left-24 w-95.25 select-none"
        />

        <Container className="relative py-16 text-center lg:py-20">
          <h1 className="text-4xl font-bold leading-tight text-white">
            Find Your Next Home
            <span className="block text-accent">With Confidence</span>
          </h1>
        </Container>
      </div>

      <Container className="relative z-10 -mt-14 max-w-3xl">
        <PropertySearchBar />
      </Container>
    </section>
  );
}
