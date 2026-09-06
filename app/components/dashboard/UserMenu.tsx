import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { NavLink } from "~/types";
import { cn } from "~/lib/utils";
import { ChevronDownIcon, CloseIcon } from "~/components/ui/icons";
import { USER_MENU_PRIMARY, USER_MENU_SECONDARY } from "~/data/navigation";

/** Account chip of the signed-in navbar: the name button toggles a dropdown
 *  card — avatar header with a close icon, then the account links separated
 *  by divider rules. Closes on Escape, an outside click, the close icon or
 *  following a link. */
export function UserMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  function toggleMenu() {
    setOpen((current) => !current);
  }

  function closeMenu() {
    setOpen(false);
  }

  function renderItem(item: NavLink) {
    return (
      <li key={item.label} className="border-b border-line-soft pb-3">
        <Link
          to={item.href}
          onClick={closeMenu}
          className="block text-xs leading-4 text-ink transition-colors hover:text-brand"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <div ref={rootRef} className="relative flex items-center gap-3">
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={open}
        aria-haspopup="menu"
        className="hidden items-center gap-1 sm:flex"
      >
        <span className="text-base font-medium text-ink">Jane Doe</span>
        <ChevronDownIcon
          className={cn(
            "size-5 text-ink transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <span className="size-8 rounded-full bg-brand sm:size-10" aria-hidden />

      {open && (
        <div className="absolute top-full right-4 z-50 mt-6 w-86.25 rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="absolute top-2.5 right-4 text-ink transition-colors hover:text-brand"
          >
            <CloseIcon className="size-3" />
          </button>

          <div className="mt-3 flex items-center gap-3.5">
            <span
              className="size-10 shrink-0 rounded-full bg-brand"
              aria-hidden
            />
            <p className="text-base leading-6 font-medium text-ink">Jane Doe</p>
          </div>

          <nav
            aria-label="Account"
            className="mt-3 border-t border-line-soft pt-3"
          >
            <ul className="flex flex-col gap-3">
              {USER_MENU_PRIMARY.map(renderItem)}
              {/* Empty band the design leaves between the two entry groups,
                  closed off by the same divider rule as the link rows. */}
              <li aria-hidden className="h-20 border-b border-line-soft" />
              {USER_MENU_SECONDARY.map(renderItem)}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
