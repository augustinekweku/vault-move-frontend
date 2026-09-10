import { ConfirmationModal } from "~/components/common/ConfirmationModal";

const PENDING_ICON = "/icons/material-symbols.svg";

/** Shown after the onboarding ID step is submitted: the account is queued
 *  for review. */
export function PendingVerificationModal({
  open,
  onClose,
  onGoToDashboard,
}: {
  open: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
}) {
  return (
    <ConfirmationModal
      open={open}
      onClose={onClose}
      labelledBy="pending-verification-title"
      icon={
        <img src={PENDING_ICON} alt="" aria-hidden className="mx-auto size-20" />
      }
      title="Your Profile Is Pending Verification"
      body={[
        "Thank you for submitting your documents. Our team is reviewing your information to verify your account. We\u2019ll notify you as soon as your verification is complete.",
      ]}
      primaryLabel="Go to Dashboard"
      onPrimary={onGoToDashboard}
    />
  );
}
