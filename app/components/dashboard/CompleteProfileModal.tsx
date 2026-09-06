import { Button } from "~/components/ui/Button";
import { Modal } from "~/components/ui/Modal";
import { CloseIcon } from "~/components/ui/icons";

const PENDING_ICON = "/icons/material-symbols.svg";

/** Shown when a buyer/renter lands on the dashboard without a completed
 *  profile: prompts them to finish setting up their account. */
export function CompleteProfileModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="complete-profile-title"
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
        id="complete-profile-title"
        className="mt-9.5 text-xl font-bold tracking-tight text-[#1c2224]"
      >
        Complete Your Profile
      </h2>

      <p className="mt-6 text-lg leading-8 text-ink-soft">
        Let&rsquo;s set up your account so you can save properties, schedule
        viewings, submit offers, and track transactions with confidence.
        Complete your profile to get started.
      </p>

      <div className="mx-auto mt-11 max-w-87.5 space-y-5">
        <Button to="/setup-profile" className="h-10.5 w-full">
          Set up my account
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          className="h-10.5 w-full border-line font-normal text-muted-700 hover:bg-surface"
        >
          Do this later
        </Button>
      </div>
    </Modal>
  );
}
