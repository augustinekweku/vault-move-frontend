import { Container } from "~/components/ui/Container";

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "110+", label: "Verified Property Listings" },
  { value: "60+", label: "Renters and Sellers" },
  { value: "80+", label: "Offers Managed" },
  { value: "100%", label: "Protected Deal Tracking" },
];

export function StatsSection() {
  return (
    <section className="border-y border-[#aaaaaa]/40 py-16 lg:py-20">
      <Container>
        <h2 className="text-center text-2xl font-semibold text-accent-strong">
          Built around trust.
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-5xl font-bold text-[#263238] lg:text-6xl">
                {stat.value}
              </span>
              <span className="mt-2 text-center text-sm text-brand-navy">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
