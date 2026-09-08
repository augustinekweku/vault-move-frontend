import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { ArrowRightIcon } from "~/components/ui/icons";
import { IMAGES } from "~/data/listings";

export function CtaSection() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-0">
        <div className="lg:py-24">
          <h2 className="text-4xl font-semibold leading-tight text-brand sm:text-5xl lg:text-[54px] lg:leading-[1.33]">
            Property transactions,{" "}
            <span className="text-accent">made simple and secure.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-ink-muted">
            Finding property should be simple. Completing the transaction should
            feel secure.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/signup">
              Get Started
              <ArrowRightIcon className="size-4" />
            </Button>
            <Button to="/about" variant="outline">
              Learn More
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>

        <div className="lg:min-h-140 lg:self-stretch">
          <img
            src={IMAGES.ctaHouse}
            alt="Secure property transactions"
            className="h-64 w-full object-cover sm:h-80 lg:h-full"
          />
        </div>
      </Container>
    </section>
  );
}
