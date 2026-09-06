import type { ResourceSection } from "~/types";

const LOREM_IPSUM_PARAGRAPH =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

/** Shared placeholder body for the mock articles. */
export const MOCK_ARTICLE_BODY: string[] = Array.from(
  { length: 8 },
  () => LOREM_IPSUM_PARAGRAPH,
);

/** Mock resource articles — grouped into sections separated by dividers
 *  (duplicate cards are intentional, matching the deterministic mock-data
 *  approach used elsewhere). */
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
        body: MOCK_ARTICLE_BODY,
      },
      {
        id: "escrow-2",
        category: "Escrow",
        title: "What is Escrow and how does it work?",
        date: "2nd July 2026",
        readTime: "3 mins read",
        image: "/images/resource-1-2.png",
        body: MOCK_ARTICLE_BODY,
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
        body: MOCK_ARTICLE_BODY,
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
        body: MOCK_ARTICLE_BODY,
      },
      {
        id: "rental-laws-2",
        category: "Rental laws",
        title: "What Are Rent Control Laws in Ghana?",
        date: "2nd July 2026",
        readTime: "3 mins read",
        image: "/images/rental-laws.png",
        body: MOCK_ARTICLE_BODY,
      },
      {
        id: "rental-laws-3",
        category: "Rental laws",
        title: "What Are Rent Control Laws in Ghana?",
        date: "2nd July 2026",
        readTime: "3 mins read",
        image: "/images/rental-laws.png",
        body: MOCK_ARTICLE_BODY,
      },
    ],
  },
];

/** Flat list of every resource article — detail pages key off `id`. */
export const RESOURCE_ARTICLES = RESOURCE_SECTIONS.flatMap(
  (section) => section.articles,
);
