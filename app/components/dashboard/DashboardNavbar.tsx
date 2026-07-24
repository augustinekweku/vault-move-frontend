import { NavLink as RouterNavLink } from "react-router";
import { cn } from "~/lib/utils";
import { Logo } from "~/components/layout/Logo";
import {
  BellIcon,
  ChevronDownIcon,
  MessageCircleIcon,
} from "~/components/ui/icons";
import { APP_NAV } from "~/data/navigation";

/** Header for the signed-in buyer/renter area: logo, centred Home/Buy/Rent
 *  nav (active item gets the small brand underline bar), notification and
 *  message shortcuts, and the user chip. Mock user until auth is wired up. */
export function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#aaaaaa]/40 bg-white">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex">
          {APP_NAV.map((item) => (
            <RouterNavLink
              key={item.label}
              to={item.href}
              end={item.href === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "relative py-1 text-sm text-black transition-colors hover:text-brand",
                  isActive && "text-brand",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-9.5 -translate-x-1/2 rounded-full bg-brand" />
                  )}
                </>
              )}
            </RouterNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-7">
          <div className="flex items-center gap-6">
            <button
              type="button"
              aria-label="Notifications"
              className="relative text-ink hover:text-brand"
            >
              <BellIcon className="size-6" />
              <span className="absolute top-0.5 right-0.5 size-3 rounded-full border border-white bg-[#ff5151]" />
            </button>
            <button
              type="button"
              aria-label="Messages"
              className="text-ink hover:text-brand"
            >
              <MessageCircleIcon className="size-6" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" className="hidden items-center gap-1 sm:flex">
              <span className="text-base font-medium text-ink">Jane Doe</span>
              <ChevronDownIcon className="size-5 text-ink" />
            </button>
            <span className="size-10 rounded-full bg-brand" aria-hidden />
          </div>
        </div>
      </div>
    </header>
  );
}
