import { useState } from "react";
import { Container } from "~/components/ui/Container";
import { ArrowRightIcon } from "~/components/ui/icons";
import { IMAGES } from "~/data/listings";

/** "Your next Property... is just a tap away" waitlist block, reused sitewide. */
export function WaitlistSection() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire to waitlist API when available.
    setEmail("");
  }

  return (
    <section className="relative overflow-hidden bg-surface-alt py-16 lg:py-0">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
        <div className="relative flex justify-center lg:py-16">
          <div className="absolute left-4 top-4 hidden h-3/4 w-2/3 rounded-3xl bg-brand lg:block" />
          <img
            src={IMAGES.heroPrimary}
            alt="Vault Move mobile app"
            className="relative z-10 h-72 w-40 rounded-[2rem] object-cover shadow-2xl sm:h-96 sm:w-52"
          />
        </div>

        <div className="lg:py-24">
          <h2 className="text-4xl font-semibold leading-tight text-brand sm:text-5xl lg:text-[54px] lg:leading-[1.33]">
            Your next Property...{" "}
            <span className="text-accent">is Just a tap away.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-ink-soft">
            Our mobile app is almost here. Browse listings, connect with agents,
            manage offers, and track every step of your property journey.
          </p>
          <p className="mt-2 text-lg text-ink-soft">Join the Waitlist!</p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex max-w-lg items-center gap-4 border-b border-[#c2c2cc] pb-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-transparent py-2 text-base text-ink placeholder:text-ink/40 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Join the waitlist"
              className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white transition-colors hover:bg-brand-dark/90"
            >
              <ArrowRightIcon className="size-5" />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
