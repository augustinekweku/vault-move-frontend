import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { PORTAL_STEPS } from "~/data/portals";

export function StepsSection() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="How it works for Agents, Landlords and Real estate Developers."
          title="Three Simple steps to listing your property."
        />
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {PORTAL_STEPS.map((step) => (
            <div key={step.number} className="flex flex-col">
              <span className="flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent">
                <step.Icon className="size-6" />
              </span>
              <span className="mt-6 text-base font-light text-brand-dark">
                {step.number}
              </span>
              <h3 className="mt-1 text-xl font-bold text-brand-dark">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-6 text-ink/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
