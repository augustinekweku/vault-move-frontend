import type { PortalFeatureBlock } from "~/types";
import { Container } from "~/components/ui/Container";
import { SearchIcon } from "~/components/ui/icons";

interface FeatureSectionProps {
  block: PortalFeatureBlock;
  /** Alternating background for consecutive blocks. */
  alt?: boolean;
}

export function FeatureSection({ block, alt }: FeatureSectionProps) {
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
                <h3 className="text-lg font-bold text-brand-dark">{f.title}</h3>
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
