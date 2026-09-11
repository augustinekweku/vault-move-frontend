import { useState } from "react";
import { Outlet, useMatches } from "react-router";
import {
  PortalMobileSideMenu,
  PortalSideMenu,
} from "~/components/dashboard/PortalSideMenu";
import { PortalHeader } from "~/components/dashboard/PortalHeader";
import { PORTAL_MAIN_MENU, PORTAL_OTHER_MENU } from "~/data/navigation";

/** Finds the side-menu icon for a portal page title, so the header glyph
 *  always matches the side-menu entry. */
function getPortalIcon(title: string): string | undefined {
  const menus = [...PORTAL_MAIN_MENU, ...PORTAL_OTHER_MENU];
  for (const item of menus) {
    if (item.label === title) {
      return item.icon;
    }
  }
  return undefined;
}

/** Chrome for the landlord/agent/developer portal: brand side menu, page
 *  header and content well. The heading comes from the active route's
 *  `handle.title` (see routes.ts). */
export default function PortalLayout() {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const title =
    (current.handle as { title?: string } | undefined)?.title ?? "Dashboard";
  const [mobileOpen, setMobileOpen] = useState(false);

  function openMobileMenu() {
    setMobileOpen(true);
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <div className="flex min-h-dvh bg-white">
      <PortalSideMenu />
      <PortalMobileSideMenu open={mobileOpen} onClose={closeMobileMenu} />
      <div className="flex min-w-0 flex-1 flex-col">
        <PortalHeader
          title={title}
          icon={getPortalIcon(title)}
          onMenuClick={openMobileMenu}
        />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
