import { Link } from "react-router";
import { Logo } from "~/components/layout/Logo";

const VAULT_ICON = "/icons/vault-icon.svg";

/** Full-screen auth shell (no site navbar/footer): blue brand panel on the
 *  left with the white wordmark + ornaments, form content centred on the
 *  right. Shared by every step of the sign-up flow (and later, login). */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh bg-white">
      {/* Brand panel (desktop only) */}
      <aside className="relative hidden w-[495px] shrink-0 overflow-hidden bg-brand lg:block">
        <img
          src="/images/footer-ornament.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 size-78 select-none"
        />
        <div className="absolute left-21 top-22">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={VAULT_ICON}
              alt=""
              aria-hidden
              className="h-13.5 w-14.25"
            />
            <span className="text-[20px] leading-[27px] font-semibold text-white">
              vault move
              <br />
              africa
            </span>
          </Link>
        </div>
        {/* Dot grid, pinned to the panel's bottom-end corner */}
        <img
          src="/icons/ornament-11.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 w-95.25 select-none"
        />
      </aside>

      <main className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-[351px]">
          <Logo className="mb-10 lg:hidden" />
          {children}
        </div>
      </main>
    </div>
  );
}
