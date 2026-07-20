import { useState } from "react";
import { Link, NavLink as RouterNavLink } from "react-router";
import { cn } from "~/lib/utils";
import { MAIN_NAV } from "~/data/navigation";
import { Button } from "~/components/ui/Button";
import { Logo } from "~/components/layout/Logo";
import { MobileMenu } from "~/components/layout/MobileMenu";
import { ChevronDownIcon, MenuIcon } from "~/components/ui/icons";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#aaaaaa]/40 bg-white">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setPortalsOpen(true)}
                onMouseLeave={() => setPortalsOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-black"
                >
                  {item.label}
                  <ChevronDownIcon className="size-4" />
                </button>
                {portalsOpen && (
                  <div className="absolute left-0 top-full w-56 rounded-lg border border-line bg-white py-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-black hover:bg-surface-alt"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <RouterNavLink
                key={item.label}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-sm text-black transition-colors hover:text-brand",
                    isActive &&
                      "font-medium text-brand underline decoration-brand decoration-2 underline-offset-8",
                  )
                }
              >
                {item.label}
              </RouterNavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link to="/login" className="text-sm text-black">
            Login
          </Link>
          <Button to="/signup" size="sm">
            Sign Up
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon className="size-7 text-ink" />
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
