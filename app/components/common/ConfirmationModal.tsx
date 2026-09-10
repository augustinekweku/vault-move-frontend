import { Button } from "~/components/ui/Button";
import { Modal } from "~/components/ui/Modal";
import { CloseIcon } from "~/components/ui/icons";

/** Shared centred status dialog: icon, title, body paragraphs, a primary
 *  action and a Dismiss button. Backs the onboarding pending-verification
 *  and listing publish confirmations. */
export function ConfirmationModal({
  open,
  onClose,
  labelledBy,
  icon,
  title,
  body,
  primaryLabel,
  onPrimary,
}: {
  open: boolean;
  onClose: () => void;
  /** id applied to the title for aria-labelledby. */
  labelledBy: string;
  icon: React.ReactNode;
  title: string;
  body: string[];
  primaryLabel: string;
  onPrimary: () => void;
}) {
  function renderParagraph(paragraph: string, index: number) {
    return (
      <p
        key={index}
        className={
          index === 0
            ? "mt-6 text-lg leading-8 text-ink-soft"
            : "mt-4 text-lg leading-8 text-ink-soft"
        }
      >
        {paragraph}
      </p>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={labelledBy}
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

      {icon}

      <h2
        id={labelledBy}
        className="mt-9.5 text-xl font-bold tracking-tight text-ink"
      >
        {title}
      </h2>

      {body.map(renderParagraph)}

      <div className="mx-auto mt-11 max-w-87.5 space-y-5">
        <Button onClick={onPrimary} className="h-10.5 w-full">
          {primaryLabel}
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
