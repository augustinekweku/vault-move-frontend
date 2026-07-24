import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/layout/SiteLayout.tsx", [
    index("routes/home.tsx"),
    route("buy", "routes/buy.tsx"),
    route("rent", "routes/rent.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("portals", "routes/portals.tsx"),
    route("faq", "routes/faq.tsx"),
    route("resources", "routes/resources.tsx"),
    route("resources/:articleId", "routes/resource-detail.tsx"),
    route("privacy", "routes/privacy.tsx"),
    route("terms", "routes/terms.tsx"),
    route("escrow-terms", "routes/escrow-terms.tsx"),
  ]),
  // Auth pages render without the site navbar/footer.
  route("signup", "routes/signup.tsx"),
  route("login", "routes/login.tsx"),
  route("setup-profile", "routes/setup-profile.tsx"),
  // Signed-in buyer/renter area with its own navbar.
  layout("components/dashboard/DashboardLayout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
