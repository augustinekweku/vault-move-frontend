import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { HOW_IT_WORKS_STEPS } from "~/data/home";

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Three Simple steps to secure your next property"
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.number} className="flex flex-col">
              <span className="flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent">
                <step.Icon className="size-6" />
              </span>
              <span className="mt-6 text-base font-light text-brand-dark">
                {step.number}
              </span>
              <h3 className="mt-1 text-2xl font-semibold text-brand-dark">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm text-base leading-6 text-brand-dark/80">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
