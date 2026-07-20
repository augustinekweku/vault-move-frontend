import type { Route } from "./+types/about";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { PageHero } from "~/components/common/PageHero";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { IMAGES } from "~/data/listings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About us — Vault Move Africa" },
    {
      name: "description",
      content:
        "Everything you need to market properties, manage enquiries, track offers, and close deals—all from one platform.",
    },
  ];
}

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const TEAM = [
  { name: "Lorem ipsum", role: "Duis aute irure" },
  { name: "Lorem ipsum", role: "Duis aute irure" },
  { name: "Lorem ipsum", role: "Duis aute irure" },
];

export default function About() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
        title={
          <>
            Property transactions,{" "}
            <span className="text-accent">made simple and secure.</span>
          </>
        }
        subtitle="Everything you need to market properties, manage enquiries, track offers, and close deals—all from one platform."
      />

      <Container className="py-16 lg:py-20">
        <SectionHeading align="left" underline title="Our Vision" />
        <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/60">
          <p>{LOREM}</p>
          <p>{LOREM}</p>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <img
            src={IMAGES.ctaHouse}
            alt="Our mission"
            className="h-80 w-full rounded-3xl object-cover lg:h-[420px]"
          />
          <div>
            <SectionHeading align="left" underline title="Our Mission" />
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/60">
              <p>{LOREM}</p>
              <p>{LOREM}</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading align="left" underline title="Our Team" />
          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-ink/60">
            {LOREM}
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {TEAM.map((member, i) => (
              <div key={i}>
                <div className="h-72 w-full rounded-lg bg-surface-alt" />
                <p className="mt-4 font-bold text-brand-dark">{member.name}</p>
                <p className="text-sm text-ink/60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <WaitlistSection />
    </>
  );
}
