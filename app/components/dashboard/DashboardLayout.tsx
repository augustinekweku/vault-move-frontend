import { Outlet } from "react-router";
import { TopBar } from "~/components/layout/TopBar";
import { DashboardNavbar } from "~/components/dashboard/DashboardNavbar";
import { Footer } from "~/components/layout/Footer";

/** Chrome for the signed-in buyer/renter area: same top bar and footer as
 *  the marketing site, but the authenticated navbar. */
export default function DashboardLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar />
      <DashboardNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
