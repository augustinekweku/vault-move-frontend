import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import { Logo } from "~/components/layout/Logo";
import { FOOTER_NAV } from "~/data/navigation";
import { TwitterIcon, LinkedInIcon, FacebookIcon } from "~/components/ui/icons";
import type { NavLink } from "~/types";

const RINGS = "/images/footer-ornament.png";
const DOTS = "/icons/ornament-11.svg";
const LINES = "/icons/ornament-79.svg";
const VAULT_ICON = "/icons/vault-icon.svg";

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: NavLink[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-xs leading-4 font-semibold text-white">{title}</h3>
      <ul className="mt-8">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="block text-xs leading-6 text-muted-300 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-6 text-muted-400">
      <a href="#" aria-label="Twitter" className="hover:text-white">
        <TwitterIcon className="size-6" />
      </a>
      <a href="#" aria-label="LinkedIn" className="hover:text-white">
        <LinkedInIcon className="size-6" />
      </a>
      <a href="#" aria-label="Facebook" className="hover:text-white">
        <FacebookIcon className="size-6" />
      </a>
    </div>
  );
}

export function Footer() {
  const [findProperty, portals, company, resources, support, legal] =
    FOOTER_NAV;

  return (
    <footer className="relative overflow-hidden bg-brand text-white">
      {/* ——— Pixel-exact desktop canvas (1440x481) at 1440px+ ——— */}
      <div className="hidden min-[1440px]:block">
        <div className="relative mx-auto h-120.25 w-360">
          {/* Ornament 12: white rings, (1141,0) 300x300 */}
          <img
            src={RINGS}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-0 left-285.25 size-75 select-none"
          />
          {/* Ornament 11: dotted arcs above the copyright row, (614,300)
              381x177, white at 10% */}
          <img
            src={DOTS}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-75 left-153.5 h-44.25 w-95.25 select-none"
          />
          {/* Ornament 79: dashed-line wedge at (0,176), 155x191.
              The SVG natively points its apex to the right — no rotation. */}
          <img
            src={LINES}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-44 left-0 h-47.75 w-38.75 select-none"
          />

          {/* Logo: icon (81,80) 76x72 + wordmark at x=189 */}
          <Link
            to="/"
            className="absolute top-20 left-20.25 flex items-center gap-8"
          >
            <img src={VAULT_ICON} alt="" aria-hidden className="h-18 w-19" />
            <span className="text-[30px] leading-9 font-semibold text-white">
              vault move
              <br />
              africa
            </span>
          </Link>

          {/* Tagline: (189,176) 263 wide, 12/24 */}
          <p className="absolute top-44 left-47.25 w-65.75 text-xs leading-6 text-muted-300">
            A hybrid property marketplace built to make every transaction safer
            and easier to complete.
          </p>

          <FooterColumn
            {...findProperty}
            className="absolute top-20 left-132.5 w-30.5"
          />
          <FooterColumn
            {...portals}
            className="absolute top-20 left-171 w-39.25"
          />
          <FooterColumn
            {...company}
            className="absolute top-20 left-222.75 w-26"
          />
          <FooterColumn
            {...resources}
            className="absolute top-20 left-261.25 w-32.25"
          />
          <FooterColumn
            {...support}
            className="absolute top-20 left-306 w-34.25"
          />
          <FooterColumn
            {...legal}
            className="absolute top-56 left-306 w-34.25"
          />

          {/* Divider: y=400, spanning the content width */}
          <div className="absolute top-100 right-20 left-20.25 h-px bg-line-soft" />

          <p className="absolute top-108.25 left-20.25 text-base leading-6 text-muted-400">
            © 2026 VaultMove Africa . All rights reserved.
          </p>
          <div className="absolute top-108.25 left-310.25">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* ——— Responsive fallback below 1440px ——— */}
      <div className="relative min-[1440px]:hidden">
        <img
          src={RINGS}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 size-75 select-none"
        />
        <img
          src={LINES}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-44 left-0 h-47.75 w-38.75 select-none"
        />
        <img
          src={DOTS}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-44.25 w-95.25 -translate-x-1/2 select-none"
        />

        <Container className="relative py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
            <div className="lg:pr-8">
              <Logo variant="white" />
              <p className="mt-5 max-w-65.75 text-xs leading-6 text-muted-300">
                A hybrid property marketplace built to make every transaction
                safer and easier to complete.
              </p>
            </div>

            {FOOTER_NAV.map((col) => (
              <FooterColumn key={col.title} {...col} />
            ))}
          </div>

          <div className="mt-12 h-px w-full bg-line-soft" />

          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-base leading-6 text-muted-400">
              © 2026 VaultMove Africa . All rights reserved.
            </p>
            <SocialLinks />
          </div>
        </Container>
      </div>
    </footer>
  );
}
