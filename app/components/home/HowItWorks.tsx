import type { ComponentType, SVGProps } from "react";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { SearchIcon, DocumentIcon, ShieldIcon } from "~/components/ui/icons";

interface Step {
  number: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discover and Connect",
    description:
      "Use searches, verified listings, apply filters, save properties and communicate directly with agents or landlords.",
    Icon: SearchIcon,
  },
  {
    number: "02",
    title: "Offer and Progress the deal",
    description:
      "Submit offers on rental applications and track milestones, approvals and next steps.",
    Icon: DocumentIcon,
  },
  {
    number: "03",
    title: "Rent or Buy your property",
    description:
      "Deposits are managed through escrow workflows with transparent tracking, dispute handling and transaction updates.",
    Icon: ShieldIcon,
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Three Simple steps to secure your next property"
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
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
