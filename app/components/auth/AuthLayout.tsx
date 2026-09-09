import { Link } from "react-router";
import { Logo } from "~/components/layout/Logo";

const VAULT_ICON = "/icons/vault-icon.svg";

/** Full-screen auth shell (no site navbar/footer): blue brand panel on the
 *  left with the white wordmark + ornaments, form content centred on the
 *  right. Shared by every step of the sign-up flow (and later, login).
 *  Pass `aside` to render extra panel content (e.g. the onboarding step
 *  list) under the wordmark — same panel, same styles. */
export function AuthLayout({
  children,
  aside,
  topRight,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
  /** Optional action pinned to the panel's top-right corner (e.g. Go Back)
   *  — outside the centred form column. */
  topRight?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh bg-white">
      {/* Brand panel (desktop only) */}
      {/* Sticky so the panel (and any slotted step list) stays anchored
          while long forms scroll beside it. */}
      <aside className="sticky top-0 hidden h-svh w-123.75 shrink-0 overflow-hidden bg-brand lg:block">
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
            <span className="text-[20px] leading-6.75 font-semibold text-white">
              vault move
              <br />
              africa
            </span>
          </Link>
        </div>
        {aside && (
          <div className="absolute top-70 right-10 left-21">{aside}</div>
        )}
        {/* Dot grid, pinned to the panel's bottom-end corner */}
        <img
          src="/icons/ornament-11.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 w-95.25 select-none"
        />
      </aside>

      <main className="relative flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
        {topRight && (
          <div className="absolute top-12 right-6 sm:right-16">{topRight}</div>
        )}
        <div className="w-full max-w-87.75">
          <Logo className="mb-10 lg:hidden" />
          {children}
        </div>
      </main>
    </div>
  );
}
