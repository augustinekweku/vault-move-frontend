import { Container } from "~/components/ui/Container";
import { ContactForm } from "~/components/common/ContactForm";
import { CONTACTS } from "~/data/contact";

export function ContactSection() {
  return (
    <section className="border-t border-line/60">
      <Container className="grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-brand sm:text-4xl">
            Have more <span className="text-accent">questions?</span>
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-ink/60">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
          <ul className="mt-8 space-y-4">
            {CONTACTS.map((c) => (
              <li
                key={c.value}
                className="flex items-center gap-3 text-ink/70"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-surface-alt text-brand">
                  <c.Icon className="size-4" />
                </span>
                {c.value}
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
