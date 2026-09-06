import { Container } from "~/components/ui/Container";
import { Accordion } from "~/components/ui/Accordion";
import { GROUPS } from "~/data/faq";

export function FaqSection() {
  return (
    <Container className="py-16 lg:py-20">
      <div className="space-y-14">
        {GROUPS.map((group) => (
          <div key={group.id} id={group.id}>
            <h2 className="mb-8 inline-block border-b-2 border-accent pb-1 text-2xl font-semibold text-brand-dark">
              {group.title}
            </h2>
            <Accordion items={group.items} />
          </div>
        ))}
      </div>
    </Container>
  );
}
