import type { Route } from "./+types/faq";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/common/PageHero";
import { ContactForm } from "~/components/common/ContactForm";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { Accordion, type AccordionItem } from "~/components/ui/Accordion";
import { PhoneIcon, MailIcon, LocationIcon } from "~/components/ui/icons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FAQ — Vault Move Africa" },
    {
      name: "description",
      content: "Frequently asked questions about Vault Move Africa.",
    },
  ];
}

const GROUPS: { id: string; title: string; items: AccordionItem[] }[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        question: "What is Vault Move?",
        answer:
          "Vault Move is a secure property marketplace that helps people rent, buy, and sell real estate with confidence. From discovering verified properties to managing offers, legal documents, escrow, and payments, everything happens in one place.",
      },
      {
        question: "Who can use Vault Move?",
        answer:
          "Vault Move is designed for renters, buyers, landlords, property owners, real estate agents, developers, and legal professionals.",
      },
      {
        question: "Do I need an account?",
        answer:
          "Yes. Creating an account allows you to browse available properties, communicate with verified users, manage transactions, and access the Deal Room.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Verification",
    items: [
      {
        question: "Are all users verified?",
        answer:
          "Vault Move verifies users through identity and account verification processes to help create a safer and more trustworthy marketplace.",
      },
      {
        question: "How do I know a listing is genuine?",
        answer:
          "Properties that have completed our verification process display a verification badge, giving you greater confidence before making enquiries or offers.",
      },
      {
        question: "Why do I need to verify my identity?",
        answer:
          "Identity verification protects all users, reduces fraud, and ensures secure property transactions.",
      },
    ],
  },
  {
    id: "escrow",
    title: "Offers, Escrow & Deal Room",
    items: [
      {
        question: "What happens after my offer is accepted?",
        answer:
          "Once an offer is accepted, a Deal Room is created where everyone involved can securely communicate, upload documents, track milestones, and complete the transaction.",
      },
      {
        question: "What is escrow?",
        answer:
          "Escrow is a secure payment process where funds are held safely until all agreed conditions have been met before being released.",
      },
      {
        question: "Why should I use escrow?",
        answer:
          "Escrow protects both parties by reducing fraud, preventing payment disputes, and ensuring funds are only released when contractual obligations have been fulfilled.",
      },
    ],
  },
];

const CONTACTS = [
  { Icon: PhoneIcon, value: "+233 559705912" },
  { Icon: MailIcon, value: "info@vaultmove.com" },
  { Icon: LocationIcon, value: "location here" },
];

export default function Faq() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ's" }]}
        title={
          <>
            Frequently asked <span className="text-accent">questions.</span>
          </>
        }
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."
      />

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

      <WaitlistSection />
    </>
  );
}
