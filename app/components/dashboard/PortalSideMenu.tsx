import { useEffect } from "react";
import { Link, NavLink } from "react-router";
import type { SideMenuLink } from "~/types";
import { cn } from "~/lib/utils";
import { CloseIcon, MaskIcon } from "~/components/ui/icons";
import { PORTAL_MAIN_MENU, PORTAL_OTHER_MENU } from "~/data/navigation";

const RINGS = "/images/footer-ornament.png";
const DOTS = "/icons/ornament-11.svg";
const VAULT_ICON = "/icons/vault-icon.svg";
const CROWN = "/icons/crown.svg";

/** Renders one side-menu entry — module-level so the menu `.map()`s take a
 *  named function, not an inline callback. The active entry is a full-bleed
 *  lighter band with a white marker on the rail's left edge (icon and label
 *  stay white); placeholder entries never take it, since they all link at
 *  the dashboard. MaskIcon recolours the fixed-white icon assets to the
 *  row's text colour. */
function renderMenuItem(item: SideMenuLink) {
  return (
    <NavLink
      key={item.label}
      to={item.href}
      end={item.href === "/dashboard"}
      className={({ isActive }) =>
        cn(
          "relative flex items-center gap-6 py-4 pr-4 pl-7.5 text-sm text-white transition-colors hover:bg-white/10",
          isActive && !item.placeholder && "bg-white/10 font-medium",
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && !item.placeholder && (
            <span
              aria-hidden
              className="absolute top-0 left-0 h-full w-1 bg-white"
            />
          )}
          <MaskIcon src={item.icon} className="size-5" />
          {item.label}
        </>
      )}
    </NavLink>
  );
}

/** The rail body shared by the desktop rail and the mobile drawer: vault
 *  mark, the main-menu and other groups, and the premium upsell card. */
function PortalSideMenuContent() {
  return (
    <>
      {/* Concentric rings centred behind the vault mark, and the dot grid
          pinned to the rail's right edge — both clipped by the rail. */}
      <img
        src={RINGS}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 size-40 max-w-none select-none"
      />
      <img
        src={DOTS}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[70.51%] -right-17 w-32 max-w-none select-none"
      />

      <div className="no-scrollbar relative flex h-full flex-col overflow-y-auto pt-8 pb-5">
        <Link to="/" className="flex items-center gap-4 pl-10">
          <img
            src={VAULT_ICON}
            alt=""
            aria-hidden
            className="h-8 w-auto shrink-0"
          />
          <span className="text-[22px] leading-6.75 font-semibold text-white">
            vault move
            <br />
            africa
          </span>
        </Link>

        <p className="mt-16 pl-7.5 text-[10px] font-medium tracking-wider text-white/60 uppercase">
          Main menu
        </p>
        <nav aria-label="Main menu" className="mt-3.5 flex flex-col">
          {PORTAL_MAIN_MENU.map(renderMenuItem)}
        </nav>

        <p className="mt-7 pl-7.5 text-[10px] font-medium tracking-wider text-white/60 uppercase">
          Other
        </p>
        <nav aria-label="Other" className="mt-3.5 flex flex-col">
          {PORTAL_OTHER_MENU.map(renderMenuItem)}
        </nav>

        <div className="mx-7 mt-8 shrink-0 rounded-2xl border border-white/90 p-4 text-center">
          <img src={CROWN} alt="" aria-hidden className="mx-auto size-6" />
          <p className="mt-2 text-base font-semibold text-white">
            Upgrade to Premium.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-white/90">
            Unlock more features and close deals faster.
          </p>
          {/* The plans page doesn't exist yet, so the button stays inert. */}
          <button
            type="button"
            className="mt-4 h-10 w-full rounded-xl bg-white text-sm font-medium text-brand transition-colors hover:bg-white/90"
          >
            View Plans
          </button>
        </div>
      </div>
    </>
  );
}

/** Fixed brand rail of the portal: vault mark, the main-menu and other
 *  groups, and the premium upsell card pinned to the bottom. Desktop only —
 *  small screens use the drawer below, opened from the header. */
export function PortalSideMenu() {
  return (
    <aside className="sticky top-0 z-40 hidden h-dvh w-60.5 shrink-0 overflow-hidden bg-brand lg:block">
      <PortalSideMenuContent />
    </aside>
  );
}

/** Slide-in drawer with the same rail body for small screens. Any tap on
 *  the panel follows its link and closes the drawer. */
export function PortalMobileSideMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        onClick={onClose}
        className={cn(
          "absolute top-0 left-0 h-full w-60.5 max-w-[85%] overflow-hidden bg-brand shadow-xl transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white transition-colors hover:text-white/70"
        >
          <CloseIcon className="size-5" />
        </button>
        <PortalSideMenuContent />
      </aside>
    </div>
  );
}
