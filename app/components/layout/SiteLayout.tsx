import { Outlet } from "react-router";
import { TopBar } from "~/components/layout/TopBar";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";

/** Shared chrome around every page: top bar, navbar, content, footer. */
export default function SiteLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
