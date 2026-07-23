import type { ResourceSection } from "~/types";

/** Mock resource articles — grouped into sections separated by dividers,
 *  mirroring the Figma "Resources" page (duplicate cards are intentional,
 *  matching the deterministic mock-data approach used elsewhere). */
export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: "escrow",
    articles: [
      {
        id: "escrow-1",
        category: "Escrow",
        title: "What is Escrow and how does it work?",
        date: "2nd July 2026",
        readTime: "3 mins read",
        image: "/images/resource-1-2.png",
      },
      {
        id: "escrow-2",
        category: "Escrow",
        title: "What is Escrow and how does it work?",
        date: "2nd July 2026",
        readTime: "3 mins read",
        image: "/images/resource-1-2.png",
      },
    ],
  },
  {
    id: "deal-room",
    articles: [
      {
        id: "deal-room-1",
        category: "Deal room",
        title: "What is Escrow and how does it work?",
        date: "2nd July 2026",
        readTime: "3 mins read",
        image: "/images/deal.png",
      },
    ],
  },
  {
    id: "rental-laws",
    articles: [
      {
        id: "rental-laws-1",
        category: "Rental laws",
        title: "What Are Rent Control Laws in Ghana?",
        date: "2nd July 2026",
        readTime: "3 mins read",
        image: "/images/rental-laws.png",
      },
      {
        id: "rental-laws-2",
        category: "Rental laws",
        title: "What Are Rent Control Laws in Ghana?",
        date: "2nd July 2026",
        readTime: "3 mins read",
        image: "/images/rental-laws.png",
      },
      {
        id: "rental-laws-3",
        category: "Rental laws",
        title: "What Are Rent Control Laws in Ghana?",
        date: "2nd July 2026",
        readTime: "3 mins read",
        image: "/images/rental-laws.png",
      },
    ],
  },
];
