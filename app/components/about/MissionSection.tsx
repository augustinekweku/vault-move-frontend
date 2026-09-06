import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { IMAGES } from "~/data/listings";
import { LOREM } from "~/data/about";

export function MissionSection() {
  return (
    <Container className="mt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <img
          src={IMAGES.ctaHouse}
          alt="Our mission"
          className="h-80 w-full rounded-3xl object-cover lg:h-105"
        />
        <div>
          <SectionHeading align="left" underline title="Our Mission" />
          <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/60">
            <p>{LOREM}</p>
            <p>{LOREM}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
