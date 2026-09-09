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

export const LANDLORD_ONBOARDING_STEPS = [1, 2, 3, 4] as const;
export type LandlordOnboardingStep =
  (typeof LANDLORD_ONBOARDING_STEPS)[number];

export const LANDLORD_ONBOARDING_TITLES: Record<
  LandlordOnboardingStep,
  string
> = {
  1: "Personal Information",
  2: "Professional Information",
  3: "Company Information",
  4: "ID Verification",
};

export const LANDLORD_ONBOARDING_SUBTITLES: Record<
  LandlordOnboardingStep,
  string
> = {
  1: "Enter your details to set up your account.",
  2: "Enter your details to set up your account.",
  3: "Enter your details to set up your account.",
  4: "Verify your identity to complete your setup.",
};

export const LANDLORD_PHONE_CODES = ["GHA +233", "NGA +234", "USA +1"];

export const LANDLORD_SPECIALIZATIONS = [
  "Apartments",
  "Townhouses",
  "Single-family homes",
  "Commercial properties",
  "Land",
  "Luxury villas",
];

/** Acceptable company registration documents listed on the upload card. */
export const LANDLORD_COMPANY_DOCUMENTS = [
  "Certificate of Incorporation",
  "Company Registration Certificate",
  "TIN Certificate",
];

/** ID verification checklist shown above the step-4 uploader. */
export const LANDLORD_ID_CHECKLIST = [
  "Upload an image (Front of ID)",
  "Upload an image (Back of ID)",
  "Take a Selfie",
];

export const LANDLORD_ID_TYPES = [
  "Ghana Card",
  "Passport",
  "Driver's License",
  "Voter ID",
];

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
