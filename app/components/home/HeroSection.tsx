import { Container } from "~/components/ui/Container";
import { PropertySearchBar } from "~/components/property/PropertySearchBar";
import { IMAGES } from "~/data/listings";

export function HeroSection() {
  return (
    <section className="bg-surface">
      <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-8 lg:py-0">
        <div className="order-2 lg:order-1 lg:py-24">
          <h1 className="max-w-xl text-4xl font-bold leading-tight text-brand sm:text-5xl lg:text-[54px] lg:leading-[1.33]">
            Find, Offer, and Secure Your Next Property,{" "}
            <span className="text-accent">All in One Place!</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-ink-muted">
            Browse verified listings, schedule viewings, submit offers, and
            manage every step of your property journey through a secure deal
            room.
          </p>

          <div className="mt-10 lg:mt-14">
            <PropertySearchBar />
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:py-12">
          <img
            src={IMAGES.heroPrimary}
            alt="Modern property"
            className="h-64 w-full rounded-3xl object-cover sm:h-80 lg:h-[560px] lg:rounded-l-[60px] lg:rounded-r-none"
          />
        </div>
      </Container>
    </section>
  );
}
