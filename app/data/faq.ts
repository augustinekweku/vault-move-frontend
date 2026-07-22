import type { FaqGroup } from "~/types";

export const GROUPS: FaqGroup[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        question: "What is Vault Move?",
        answer:
          "Vault Move is a secure property marketplace that helps people rent, buy, and sell real estate with confidence. From discovering verified properties to managing offers, legal documents, escrow, and payments, everything happens in one place.",
      },
      {
        question: "Who can use Vault Move?",
        answer:
          "Vault Move is designed for renters, buyers, landlords, property owners, real estate agents, developers, and legal professionals.",
      },
      {
        question: "Do I need an account?",
        answer:
          "Yes. Creating an account allows you to browse available properties, communicate with verified users, manage transactions, and access the Deal Room.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Verification",
    items: [
      {
        question: "Are all users verified?",
        answer:
          "Vault Move verifies users through identity and account verification processes to help create a safer and more trustworthy marketplace.",
      },
      {
        question: "How do I know a listing is genuine?",
        answer:
          "Properties that have completed our verification process display a verification badge, giving you greater confidence before making enquiries or offers.",
      },
      {
        question: "Why do I need to verify my identity?",
        answer:
          "Identity verification protects all users, reduces fraud, and ensures secure property transactions.",
      },
    ],
  },
  {
    id: "escrow",
    title: "Offers, Escrow & Deal Room",
    items: [
      {
        question: "What happens after my offer is accepted?",
        answer:
          "Once an offer is accepted, a Deal Room is created where everyone involved can securely communicate, upload documents, track milestones, and complete the transaction.",
      },
      {
        question: "What is escrow?",
        answer:
          "Escrow is a secure payment process where funds are held safely until all agreed conditions have been met before being released.",
      },
      {
        question: "Why should I use escrow?",
        answer:
          "Escrow protects both parties by reducing fraud, preventing payment disputes, and ensuring funds are only released when contractual obligations have been fulfilled.",
      },
    ],
  },
];
