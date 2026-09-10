import { ConfirmationModal } from "~/components/common/ConfirmationModal";
import { PendingReviewIcon } from "~/components/ui/icons";
import { PUBLISH_CONFIRMATION } from "~/data/listing";

/** Shown after Publish Listing is pressed on the listing preview: the
 *  listing is queued for review before it goes live. */
export function PublishConfirmationModal({
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
      labelledBy="publish-confirmation-title"
      icon={
        <PendingReviewIcon
          aria-hidden
          className="mx-auto size-20 text-warning"
        />
      }
      title={PUBLISH_CONFIRMATION.title}
      body={[PUBLISH_CONFIRMATION.intro, PUBLISH_CONFIRMATION.body]}
      primaryLabel="Go to Dashboard"
      onPrimary={onGoToDashboard}
    />
  );
}
