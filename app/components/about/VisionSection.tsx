import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { LOREM } from "~/data/about";

export function VisionSection() {
  return (
    <Container className="pt-16 lg:pt-20">
      <SectionHeading align="left" underline title="Our Vision" />
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/60">
        <p>{LOREM}</p>
        <p>{LOREM}</p>
      </div>
    </Container>
  );
}
