import { PropertySearchBar } from "~/components/property/PropertySearchBar";
import { IMAGES } from "~/data/listings";

export function HeroSection() {
  return (
    <section className="relative overflow-x-clip bg-surface">
      {/* Desktop: exact Figma layout, centered 1440px canvas */}
      <div className="hidden lg:block">
        <div className="relative mx-auto h-193 max-w-360">
          <h1 className="absolute left-20 top-35 z-10 w-157 text-[54px] font-bold leading-18 text-brand">
            Find, Offer, and Secure Your Next Property,
            <br />
            <span className="text-accent">All in One Place!</span>
          </h1>

          <p className="absolute left-20 top-98 z-10 w-114.25 text-lg leading-8 text-ink-muted">
            Browse verified listings, schedule viewings, submit offers, and
            manage every step of your property journey through a secure deal
            room.
          </p>

          <div className="absolute left-20 top-132.5 z-20 w-[min(1277px,calc(100%-160px))]">
            <PropertySearchBar />
          </div>

          {/* Figma: left 732, top 128 (frame-relative, i.e. flush under nav),
              708x772, left corners rounded 60px, right edge bleeding */}
          <img
            src={IMAGES.heroPrimary}
            alt="Modern property"
            className="absolute left-183 top-0 z-0 h-193 w-[min(708px,calc(100%-732px))] rounded-l-[60px] object-cover"
          />
        </div>
      </div>

      {/* Tablet / mobile responsive fallback */}
      <div className="lg:hidden">
        <img
          src={IMAGES.heroPrimary}
          alt="Modern property"
          className="h-64 w-full object-cover sm:h-96"
        />
        <div className="px-6 py-12 sm:px-10">
          <h1 className="max-w-157 text-4xl font-bold leading-tight text-brand sm:text-5xl">
            Find, Offer, and Secure Your Next Property,{" "}
            <span className="text-accent">All in One Place!</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-ink-muted">
            Browse verified listings, schedule viewings, submit offers, and
            manage every step of your property journey through a secure deal
            room.
          </p>

          <div className="mt-8">
            <PropertySearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}
