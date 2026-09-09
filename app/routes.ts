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
    route("map-view", "routes/map-view.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("portals", "routes/portals.tsx"),
    route("faq", "routes/faq.tsx"),
    route("resources", "routes/resources.tsx"),
    route("resources/:articleId", "routes/resource-detail.tsx"),
    route("properties/:propertyId", "routes/property-detail.tsx"),
    route("properties/:propertyId/contact", "routes/property-contact.tsx"),
    route("landlords/:landlordId", "routes/landlord-profile.tsx"),
    route("privacy", "routes/privacy.tsx"),
    route("terms", "routes/terms.tsx"),
    route("escrow-terms", "routes/escrow-terms.tsx"),
  ]),
  // Auth pages render without the site navbar/footer.
  route("signup", "routes/signup.tsx"),
  route("login", "routes/login.tsx"),
  route("setup-profile", "routes/setup-profile.tsx"),
  route("select-user-type", "routes/select-user-type.tsx"),
  route("landlord-onboarding", "routes/landlord-onboarding.tsx"),
  // Landlord/agent/developer portal with the fixed brand side menu.
  layout("components/dashboard/PortalLayout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
  ]),
  // Signed-in buyer/renter area with its own navbar.
  layout("components/dashboard/DashboardLayout.tsx", [
    route("deal-room", "routes/deal-room.tsx"),
    route("deal-room/:dealId", "routes/deal-detail.tsx"),
    route("saved-properties", "routes/saved-properties.tsx"),
    route("my-account", "routes/my-account.tsx"),
  ]),
] satisfies RouteConfig;
