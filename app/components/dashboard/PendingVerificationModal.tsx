import { Button } from "~/components/ui/Button";
import { Modal } from "~/components/ui/Modal";
import { CloseIcon } from "~/components/ui/icons";

const PENDING_ICON = "/icons/material-symbols.svg";

/** Shown after the onboarding ID step is submitted: the account is queued
 *  for review. Mirrors the CompleteProfileModal structure. */
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
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="pending-verification-title"
      className="max-w-125 rounded-lg px-6 py-6 text-center"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 text-brand-dark hover:text-ink"
      >
        <CloseIcon className="size-4" />
      </button>

      <img src={PENDING_ICON} alt="" aria-hidden className="mx-auto size-20" />

      <h2
        id="pending-verification-title"
        className="mt-9.5 text-xl font-bold tracking-tight text-[#1c2224]"
      >
        Your Profile Is Pending Verification
      </h2>

      <p className="mt-6 text-lg leading-8 text-ink-soft">
        Thank you for submitting your documents. Our team is reviewing your
        information to verify your account. We&rsquo;ll notify you as soon as
        your verification is complete.
      </p>

      <div className="mx-auto mt-11 max-w-87.5 space-y-5">
        <Button onClick={onGoToDashboard} className="h-10.5 w-full">
          Go to Dashboard
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          className="h-10.5 w-full border-line font-normal text-muted-700 hover:bg-surface"
        >
          Dismiss
        </Button>
      </div>
    </Modal>
  );
}
