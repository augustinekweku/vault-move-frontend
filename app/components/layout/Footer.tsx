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
      {/* ——— Pixel-exact Figma canvas (Group 11672, 1440x481) at 1440px+ ——— */}
      <div className="hidden min-[1440px]:block">
        <div className="relative mx-auto h-[481px] w-[1440px]">
          {/* Ornament 12: white rings, (1141,0) 300x300 */}
          <img
            src={RINGS}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-0 left-[1141px] size-[300px] select-none"
          />
          {/* Ornament 11: dotted arcs above the copyright row, (614,300)
              381x177, white at 10% */}
          <img
            src={DOTS}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-[300px] left-[614px] h-[177px] w-[381px] select-none"
          />
          {/* Ornament 79: dashed-line wedge at (0,176), 155x191.
              The SVG natively points its apex to the right — no rotation. */}
          <img
            src={LINES}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-[176px] left-0 h-[191px] w-[155px] select-none"
          />

          {/* Logo: icon (81,80) 76x72 + wordmark at x=189 */}
          <Link
            to="/"
            className="absolute top-[80px] left-[81px] flex items-center gap-8"
          >
            <img
              src={VAULT_ICON}
              alt=""
              aria-hidden
              className="h-[72px] w-[76px]"
            />
            <span className="text-[30px] leading-[36px] font-semibold text-white">
              vault move
              <br />
              africa
            </span>
          </Link>

          {/* Tagline: (189,176) 263 wide, 12/24 */}
          <p className="absolute top-[176px] left-[189px] w-[263px] text-xs leading-6 text-muted-300">
            A hybrid property marketplace built to make every transaction safer
            and easier to complete.
          </p>

          <FooterColumn
            {...findProperty}
            className="absolute top-[80px] left-[530px] w-[122px]"
          />
          <FooterColumn
            {...portals}
            className="absolute top-[80px] left-[684px] w-[157px]"
          />
          <FooterColumn
            {...company}
            className="absolute top-[80px] left-[891px] w-[104px]"
          />
          <FooterColumn
            {...resources}
            className="absolute top-[80px] left-[1045px] w-[129px]"
          />
          <FooterColumn
            {...support}
            className="absolute top-[80px] left-[1224px] w-[137px]"
          />
          <FooterColumn
            {...legal}
            className="absolute top-[224px] left-[1224px] w-[137px]"
          />

          {/* Divider: y=400, spanning the content width */}
          <div className="absolute top-[400px] right-[80px] left-[81px] h-px bg-[#e4e7ec]" />

          <p className="absolute top-[433px] left-[81px] text-base leading-6 text-muted-400">
            © 2026 VaultMove Africa . All rights reserved.
          </p>
          <div className="absolute top-[433px] left-[1241px]">
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
          className="pointer-events-none absolute top-0 right-0 size-[300px] select-none"
        />
        <img
          src={LINES}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-[176px] left-0 h-[191px] w-[155px] select-none"
        />
        <img
          src={DOTS}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-[177px] w-[381px] -translate-x-1/2 select-none"
        />

        <Container className="relative py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
            <div className="lg:pr-8">
              <Logo variant="white" />
              <p className="mt-5 max-w-[263px] text-xs leading-6 text-muted-300">
                A hybrid property marketplace built to make every transaction
                safer and easier to complete.
              </p>
            </div>

            {FOOTER_NAV.map((col) => (
              <FooterColumn key={col.title} {...col} />
            ))}
          </div>

          <div className="mt-12 h-px w-full bg-[#e4e7ec]" />

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
