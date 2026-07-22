import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { Container } from "~/components/ui/Container";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

/** Blue banner used on About, Contact, FAQ, Privacy and Portals pages.
 *  Content is vertically centred in flow (no absolute text positioning) so
 *  the title/subtitle spacing stays consistent no matter how many lines the
 *  title wraps to. ~434px tall on desktop, dots bottom-left, rings top-right. */
export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Container className="py-4">
          <nav className="flex items-center gap-2 text-sm text-ink/70">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-brand">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span>›</span>}
              </span>
            ))}
          </nav>
        </Container>
      )}

      <section
        className={cn(
          "relative overflow-hidden bg-brand text-white",
          className,
        )}
      >
        {/* Ornament 11 — dot grid, bottom-left */}
        <img
          src="/icons/ornament-11.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 hidden h-44.25 w-95.25 select-none lg:block"
        />
        {/* Ornament 12 — concentric rings, top-right (white at 12%) */}
        <img
          src="/images/footer-ornament.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 hidden size-75 select-none lg:block"
        />

        <Container className="relative flex flex-col items-center justify-center py-16 text-center lg:min-h-108.5 lg:py-20">
          <h1 className="max-w-4xl text-3xl font-bold leading-[1.2] tracking-[-0.02em] sm:text-4xl lg:text-[48px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-12 max-w-2xl text-sm leading-7 text-white/80 lg:text-lg lg:leading-8">
              {subtitle}
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
