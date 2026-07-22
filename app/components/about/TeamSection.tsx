import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { TEAM, LOREM } from "~/data/about";

export function TeamSection() {
  return (
    <Container className="mt-20 pb-16 lg:pb-20">
      <SectionHeading align="left" underline title="Our Team" />
      <p className="mt-6 text-[15px] leading-7 text-ink/60">{LOREM}</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {TEAM.map((member, i) => (
          <div key={i}>
            <div className="h-72 w-full rounded-lg bg-surface-alt" />
            <p className="mt-4 font-bold text-brand-dark">{member.name}</p>
            <p className="text-sm text-ink/60">{member.role}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
