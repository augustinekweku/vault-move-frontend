import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { ArrowRightIcon } from "~/components/ui/icons";
import { IMAGES } from "~/data/listings";

export function CtaSection() {
  return (
    <section className="bg-surface">
      <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-0">
        <div className="lg:py-24">
          <h2 className="text-4xl font-semibold leading-tight text-brand sm:text-5xl">
            List, rent or sell your property{" "}
            <span className="text-accent">with confidence.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-ink-muted">
            Manage enquiries, secure payments through escrow, and track every
            step of the rental process, all in one place.
          </p>
          <div className="mt-8">
            <Button to="/signup">
              Get Started
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
        <div className="lg:h-120">
          <img
            src={IMAGES.ctaHouse}
            alt="List your property"
            className="h-64 w-full object-cover sm:h-80 lg:h-full"
          />
        </div>
      </Container>
    </section>
  );
}
