import { Container } from "~/components/ui/Container";
import { Heading, List } from "~/components/privacy/helpers";

export function PrivacyContent() {
  return (
    <Container className="max-w-4xl py-16 lg:py-20">
      <h2 className="inline-block border-b-2 border-accent pb-1 text-2xl font-bold text-brand-dark">
        Privacy Policy
      </h2>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/70">
        <p>Last Updated: July 2026</p>
        <p>
          At Vault Move, your privacy matters. This Privacy Policy explains how
          we collect, use, store, and protect your personal information when you
          use our website, mobile applications, and related services.
        </p>
        <p>
          By using Vault Move, you agree to the practices described in this
          Privacy Policy.
        </p>
      </div>

      <Heading>1. Information We Collect</Heading>
      <p className="mt-4 text-[15px] leading-7 text-ink/70">
        We collect information to provide a safe, secure, and efficient property
        marketplace.
      </p>

      <h3 className="mt-6 font-semibold text-brand-dark">Personal Information</h3>
      <p className="mt-2 text-[15px] text-ink/70">
        When you create an account, we may collect:
      </p>
      <List
        items={[
          "Full name",
          "Email address",
          "Phone number",
          "Date of birth (where required)",
          "Residential address",
          "Government-issued identification (for verification)",
          "Profile photo",
        ]}
      />

      <h3 className="mt-6 font-semibold text-brand-dark">Property Information</h3>
      <p className="mt-2 text-[15px] text-ink/70">
        If you list a property, we may collect:
      </p>
      <List
        items={[
          "Property details",
          "Photos and videos",
          "Property location",
          "Pricing information",
          "Ownership or authorization documents",
          "Property descriptions",
        ]}
      />

      <h3 className="mt-6 font-semibold text-brand-dark">
        Transaction Information
      </h3>
      <p className="mt-2 text-[15px] text-ink/70">
        When using our platform, we may collect:
      </p>
      <List
        items={[
          "Offers and applications",
          "Viewing requests",
          "Deal Room activity",
          "Escrow transaction details",
          "Payment confirmations",
          "Digital agreements and documents",
        ]}
      />

      <Heading>2. How We Use Your Information</Heading>
      <p className="mt-4 text-[15px] text-ink/70">We use your information to:</p>
      <List
        items={[
          "Create and manage your account",
          "Verify your identity",
          "Facilitate property transactions",
          "Process memberships and payments",
          "Manage escrow transactions",
          "Connect buyers, renters, landlords, and agents",
          "Prevent fraud and unauthorized activity",
          "Improve our platform",
          "Respond to customer support requests",
          "Send important account and transaction updates",
          "Comply with legal obligations",
        ]}
      />

      <Heading>3. Identity Verification</Heading>
      <p className="mt-4 text-[15px] text-ink/70">
        To maintain a trusted marketplace, Vault Move may request identity
        verification.
      </p>
      <p className="mt-3 text-[15px] text-ink/70">Verification may include:</p>
      <List
        items={[
          "Government-issued ID",
          "Selfie verification",
          "Phone verification",
          "Email verification",
          "Professional licence verification (where applicable)",
        ]}
      />
      <p className="mt-4 text-[15px] leading-7 text-ink/70">
        Verification information is used solely to confirm identity and reduce
        fraudulent activity.
      </p>
    </Container>
  );
}
