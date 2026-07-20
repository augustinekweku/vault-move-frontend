import type { Route } from "./+types/portals";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/common/PageHero";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { Button } from "~/components/ui/Button";
import { SectionHeading } from "~/components/ui/SectionHeading";
import {
  SearchIcon,
  DocumentIcon,
  ShieldIcon,
  ArrowRightIcon,
} from "~/components/ui/icons";
import { IMAGES } from "~/data/listings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portals — Vault Move Africa" },
    {
      name: "description",
      content:
        "Everything you need to market properties, manage enquiries, track offers, and close deals.",
    },
  ];
}

const STEPS = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up, complete your profile, and verify your identity to start using Vault Move.",
    Icon: SearchIcon,
  },
  {
    number: "02",
    title: "List & Connect",
    description:
      "Publish your properties, receive enquiries, schedule viewings, and negotiate offers with verified users.",
    Icon: DocumentIcon,
  },
  {
    number: "03",
    title: "Transact Securely",
    description:
      "Manage every step in the Deal Room, sign agreements, and complete payments securely through escrow.",
    Icon: ShieldIcon,
  },
];

interface FeatureBlock {
  id: string;
  titleTop: string;
  titleBottom: string;
  features: { title: string; description: string }[];
}

const BLOCKS: FeatureBlock[] = [
  {
    id: "agents",
    titleTop: "Features Built for Modern",
    titleBottom: "Real Estate Agents",
    features: [
      {
        title: "Grow Your Property Portfolio",
        description:
          "Create a professional profile, showcase your listings, and reach more qualified buyers, renters, and property owners.",
      },
      {
        title: "Manage Leads Efficiently",
        description:
          "Track enquiries, schedule viewings, communicate with clients, and manage offers from one central dashboard.",
      },
      {
        title: "Close Deals with Confidence",
        description:
          "Use the Deal Room to manage documents, monitor transaction progress, and complete secure payments through escrow.",
      },
    ],
  },
  {
    id: "landlords",
    titleTop: "Features Built for Modern",
    titleBottom: "Landlords",
    features: [
      {
        title: "List & Market Your Property",
        description:
          "Create professional property listings with photos, descriptions, and pricing to reach serious, verified tenants.",
      },
      {
        title: "Manage Tenants with Ease",
        description:
          "Receive enquiries, schedule viewings, review applications, and communicate with prospective tenants—all from one dashboard.",
      },
      {
        title: "Secure Every Transaction",
        description:
          "Handle agreements, track progress in the Deal Room, and receive payments securely through Vault Move's escrow process.",
      },
    ],
  },
  {
    id: "developers",
    titleTop: "Features Built for Modern",
    titleBottom: "Real Estate Developers",
    features: [
      {
        title: "Showcase Your Developments",
        description:
          "Promote your residential and commercial projects with rich property listings, project updates, floor plans, and media that attract qualified buyers.",
      },
      {
        title: "Generate & Manage Sales Leads",
        description:
          "Receive enquiries, schedule site visits, manage buyer interactions, and track sales opportunities from a single dashboard.",
      },
      {
        title: "Complete Sales with Confidence",
        description:
          "Manage offers, contracts, Deal Rooms, and escrow-supported payments to deliver a seamless and secure buying experience.",
      },
    ],
  },
];

function FeatureSection({ block, alt }: { block: FeatureBlock; alt: boolean }) {
  return (
    <section id={block.id} className={alt ? "bg-surface-alt py-16" : "py-16"}>
      <Container>
        <h2 className="text-center text-2xl font-semibold text-brand sm:text-3xl">
          {block.titleTop}
          <br />
          <span className="text-accent">{block.titleBottom}</span>
        </h2>

        <div className="mx-auto mt-12 max-w-2xl space-y-8">
          {block.features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <SearchIcon className="size-3.5" />
              </span>
              <div>
                <h3 className="font-bold text-brand-dark">{f.title}</h3>
                <p className="mt-1 text-[15px] leading-6 text-ink/60">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function Portals() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portals" },
          { label: "For Agents" },
        ]}
        title={
          <>
            Rent or Sell Your Development{" "}
            <span className="text-accent">with Confidence.</span>
          </>
        }
        subtitle="Everything you need to market properties, manage enquiries, track offers, and close deals—all from one platform."
      />

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="How it works for Agents, Landlords and Real estate Developers."
            title="Three Simple steps to listing your property."
          />
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step) => (
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

      {BLOCKS.map((block, i) => (
        <FeatureSection key={block.id} block={block} alt={i % 2 === 0} />
      ))}

      <section className="bg-brand py-16 text-center text-white">
        <Container>
          <h2 className="text-3xl font-bold">PRICING</h2>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-0">
          <div className="lg:py-24">
            <h2 className="text-4xl font-semibold leading-tight text-brand sm:text-5xl">
              List, rent or sell your property{" "}
              <span className="text-accent">with confidence.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-ink-muted">
              Manage enquiries, secure payments through escrow, and track every
              step of the rental process, all in one place.
            </p>
            <div className="mt-8">
              <Button to="/signup">
                Get Started
                <ArrowRightIcon className="size-4" />
              </Button>
            </div>
          </div>
          <div className="lg:h-[480px]">
            <img
              src={IMAGES.ctaHouse}
              alt="List your property"
              className="h-64 w-full object-cover sm:h-80 lg:h-full"
            />
          </div>
        </Container>
      </section>

      <WaitlistSection />
    </>
  );
}
