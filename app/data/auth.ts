import type { PasswordRule } from "~/types";

/** Content for the auth flows: sign-up and the profile-setup wizard. */

export const PROFILE_SETUP_AREAS = [
  "Achimota",
  "Adjiringanor",
  "Airport Residential",
  "Cantonments",
  "East Legon",
  "Osu",
  "Tema",
  "Tesano",
];

export const PROFILE_SETUP_STEPS = [1, 2, 3] as const;
export type ProfileSetupStep = (typeof PROFILE_SETUP_STEPS)[number];

export const PROFILE_SETUP_GUIDANCE: Record<ProfileSetupStep, string> = {
  1: "Tell us the areas you would like to find properties from. You can change this anytime.",
  2: "Great! Now tell us your budget and your typical household size.",
  3: "Almost done! Tell us how soon you plan to move in.",
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "length",
    label: "At least 8 characters long",
    test: (p) => p.length >= 8,
  },
  {
    id: "uppercase",
    label: "At least one uppercase letter",
    test: (p) => /[A-Z]/.test(p),
  },
  {
    id: "lowercase",
    label: "At least one lowercase letter",
    test: (p) => /[a-z]/.test(p),
  },
  { id: "number", label: "At least one number", test: (p) => /\d/.test(p) },
  {
    id: "special",
    label: "At least one special character",
    test: (p) => /[^A-Za-z0-9]/.test(p),
  },
];
