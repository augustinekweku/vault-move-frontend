import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import { Logo } from "~/components/layout/Logo";
import { FOOTER_NAV } from "~/data/navigation";
import { TwitterIcon, LinkedInIcon, FacebookIcon } from "~/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
          <div className="lg:pr-8">
            <Logo variant="white" />
            <p className="mt-5 max-w-xs text-xs leading-6 text-muted-300">
              A hybrid property marketplace built to make every transaction
              safer and easier to complete.
            </p>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold">{col.title}</h3>
              <ul className="mt-6 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs text-muted-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 h-px w-full bg-white/15" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-400">
            © 2026 VaultMove Africa . All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-muted-400">
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <TwitterIcon className="size-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <LinkedInIcon className="size-5" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
