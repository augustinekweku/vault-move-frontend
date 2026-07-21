import { useState } from "react";
import { Container } from "~/components/ui/Container";
import { ArrowRightIcon } from "~/components/ui/icons";

const ORNAMENT = "/images/cta-ornament.png";
const BLUE_VAULT = "/images/iPhone Shape.png";
const IPHONE = "/images/iPhone.png";

/** "Your next Property... is just a tap away" waitlist block, reused sitewide. */
export function WaitlistSection() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire to waitlist API when available.
    setEmail("");
  }

  const emailForm = (
    <form
      onSubmit={handleSubmit}
      className="flex items-end"
      aria-label="Join the waitlist"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="h-10 w-137 max-w-full border-b border-[#c2c2cc] bg-transparent text-base text-ink placeholder:text-ink/40 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Submit email"
        className="ml-6 inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white transition-colors hover:bg-brand-dark/90"
      >
        <ArrowRightIcon className="size-5" />
      </button>
    </form>
  );

  return (
    <section className="relative overflow-hidden bg-surface">
      {/* ——— Pixel-exact Figma canvas (Frame 3872, 1440x700) at 1440px+ ——— */}
      <div className="hidden min-[1440px]:block">
        <div className="relative mx-auto h-175 w-360">
          {/* Ornament 12: (0,0) 700x700 — composition sits centered on it */}
          <img
            src={ORNAMENT}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 size-175 select-none"
          />
          {/* Ornament 13: (1070,0) 388x388 */}
          <img
            src={ORNAMENT}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-0 left-267.5 size-97 select-none"
          />

          {/* iPhone Shape (blue vault card): (143,37) 243x510, radius 40 */}
          <img
            src={BLUE_VAULT}
            alt=""
            aria-hidden
            className="absolute top-9.25 left-35.75 h-127.5 w-60.75 rounded-[40px] select-none"
          />
          {/* Dark iPhone w/ Shadow: (319,110) 263x530. The opaque phone body
              sits at (134,37) inside this PNG canvas, so the canvas is offset
              to land the body exactly on (319,110). */}
          <img
            src={IPHONE}
            alt="Vault Move Africa mobile app preview"
            className="absolute top-18.25 left-46.25 h-156.75 w-132.75 select-none"
          />

          {/* Heading: (737,154) 628x144, Poppins 600 54/72 */}
          <h2 className="absolute top-38.5 left-184.25 w-157 text-[54px] leading-18 font-semibold text-brand">
            Your next Property...
            <br />
            <span className="text-accent">is Just a tap away.</span>
          </h2>

          {/* Subtext: (737,321) 548x135, 18/32 */}
          <p className="absolute top-80.25 left-184.25 w-137 text-lg leading-8 text-ink-soft">
            Our mobile app is almost here. Browse listings, connect with agents,
            manage offers, and track every step of your property journey.
            <br />
            Join the Waitlist!
          </p>

          {/* Form group: (737,498) 628x56 — underline 548 wide, 56px circle
              button 24px to its right */}
          <div className="absolute top-124.5 left-184.25 w-157">
            {emailForm}
          </div>
        </div>
      </div>

      {/* ——— Responsive fallback below 1440px ——— */}
      <div className="relative min-[1440px]:hidden">
        <img
          src={ORNAMENT}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 size-175 select-none"
        />
        <img
          src={ORNAMENT}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 -right-4.5 size-97 select-none"
        />

        <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-8 lg:py-0">
          {/* Visual: blue vault card behind the iPhone mockup (content-relative
              Figma coords, scaled down on smaller screens). */}
          <div className="relative">
            <div className="relative h-105 sm:h-140 lg:h-175">
              <div className="absolute top-0 left-2 h-175 w-160 origin-top-left scale-[0.6] sm:left-6 sm:scale-[0.8] lg:left-0 lg:scale-100">
                <img
                  src={BLUE_VAULT}
                  alt=""
                  aria-hidden
                  className="absolute top-9.25 left-15.75 h-127.5 w-60.75 rounded-[40px] select-none"
                />
                <img
                  src={IPHONE}
                  alt="Vault Move Africa mobile app preview"
                  className="absolute top-18.25 left-26.25 h-156.75 w-132.75 select-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-semibold leading-tight text-brand sm:text-5xl lg:text-[54px] lg:leading-18">
              Your next Property...{" "}
              <span className="text-accent">is Just a tap away.</span>
            </h2>
            <p className="mt-6 max-w-137 text-lg leading-8 text-ink-soft">
              Our mobile app is almost here. Browse listings, connect with
              agents, manage offers, and track every step of your property
              journey.
              <br />
              Join the Waitlist!
            </p>
            <div className="mt-10 max-w-157">{emailForm}</div>
          </div>
        </Container>
      </div>
    </section>
  );
}
