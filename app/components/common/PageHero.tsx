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
 *  Pixel-exact to Figma Group 11675: 1440×434, dots bottom-left, rings top-right. */
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
        {/* Pixel-exact 1440px canvas (Figma coordinates) */}
        <div className="relative mx-auto hidden h-108.5 w-360 min-[1440px]:block">
          {/* Ornament 11 — dot grid, bottom-left */}
          <img
            src="/icons/ornament-11.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-0 top-64 h-44.25 w-95.25 select-none"
          />
          {/* Ornament 12 — concentric rings, top-right (white at 12%) */}
          <img
            src="/images/footer-ornament.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-284.5 top-0 size-75 select-none"
          />

          <h1 className="absolute left-97.5 top-23 w-165 text-center text-[48px] font-bold leading-18 tracking-[-0.02em]">
            {title}
          </h1>
          {subtitle && (
            <p className="absolute left-91.25 top-72.5 w-177.5 text-center text-[18px] leading-8 text-white/80">
              {subtitle}
            </p>
          )}
        </div>

        {/* Responsive fallback below 1440px */}
        <Container className="py-16 text-center min-[1440px]:hidden lg:py-20">
          <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-[-0.02em] sm:text-4xl lg:text-[42px] lg:leading-normal">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 lg:text-base">
              {subtitle}
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
