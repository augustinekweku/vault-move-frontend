import type { PortalFeatureBlock, NumberedStep, PortalUserType } from "~/types";
import {
  SearchIcon,
  DocumentIcon,
  ShieldIcon,
  DevelopersIcon,
  LandlordIcon,
  AgentIcon,
} from "~/components/ui/icons";

/** "Three simple steps" shown under the Portals hero. */
export const PORTAL_STEPS: NumberedStep[] = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up, complete your profile, and verify your identity to start using Vault Move.",
    Icon: SearchIcon,
  },
  {
    number: "02",
    title: "List & Connect",
    description:
      "Publish your properties, receive enquiries, schedule viewings, and negotiate offers with verified users.",
    Icon: DocumentIcon,
  },
  {
    number: "03",
    title: "Transact Securely",
    description:
      "Manage every step in the Deal Room, sign agreements, and complete payments securely through escrow.",
    Icon: ShieldIcon,
  },
];

/** Audience options on the "Select user type" onboarding page. */
export const PORTAL_USER_TYPES: PortalUserType[] = [
  {
    id: "developers",
    label: "Real Estate Developers",
    labelAlign: "left",
    Icon: DevelopersIcon,
  },
  {
    id: "landlords",
    label: "Landlord",
    labelAlign: "center",
    Icon: LandlordIcon,
  },
  {
    id: "agents",
    label: "Agent",
    labelAlign: "center",
    Icon: AgentIcon,
  },
];

/** Per-audience feature blocks (agents, landlords, developers). */
export const PORTAL_BLOCKS: PortalFeatureBlock[] = [
  {
    id: "agents",
    titleTop: "Features Built for Modern",
    titleBottom: "Real Estate Agents",
    features: [
      {
        title: "Grow Your Property Portfolio",
        description:
          "Create a professional profile, showcase your listings, and reach more qualified buyers, renters, and property owners.",
      },
      {
        title: "Manage Leads Efficiently",
        description:
          "Track enquiries, schedule viewings, communicate with clients, and manage offers from one central dashboard.",
      },
      {
        title: "Close Deals with Confidence",
        description:
          "Use the Deal Room to manage documents, monitor transaction progress, and complete secure payments through escrow.",
      },
    ],
  },
  {
    id: "landlords",
    titleTop: "Features Built for Modern",
    titleBottom: "Landlords",
    features: [
      {
        title: "List & Market Your Property",
        description:
          "Create professional property listings with photos, descriptions, and pricing to reach serious, verified tenants.",
      },
      {
        title: "Manage Tenants with Ease",
        description:
          "Receive enquiries, schedule viewings, review applications, and communicate with prospective tenants—all from one dashboard.",
      },
      {
        title: "Secure Every Transaction",
        description:
          "Handle agreements, track progress in the Deal Room, and receive payments securely through Vault Move's escrow process.",
      },
    ],
  },
  {
    id: "developers",
    titleTop: "Features Built for Modern",
    titleBottom: "Real Estate Developers",
    features: [
      {
        title: "Showcase Your Developments",
        description:
          "Promote your residential and commercial projects with rich property listings, project updates, floor plans, and media that attract qualified buyers.",
      },
      {
        title: "Generate & Manage Sales Leads",
        description:
          "Receive enquiries, schedule site visits, manage buyer interactions, and track sales opportunities from a single dashboard.",
      },
      {
        title: "Complete Sales with Confidence",
        description:
          "Manage offers, contracts, Deal Rooms, and escrow-supported payments to deliver a seamless and secure buying experience.",
      },
    ],
  },
];
