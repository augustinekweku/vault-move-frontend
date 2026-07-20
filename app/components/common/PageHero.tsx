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

/** Blue banner used on About, Contact, FAQ, Privacy and Portals pages. */
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
        <div
          aria-hidden
          className="absolute right-0 top-1/2 hidden size-72 -translate-y-1/2 rounded-full border border-white/10 lg:block"
        />
        <Container className="py-16 text-center lg:py-20">
          <h1 className="mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-[42px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80">
              {subtitle}
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
