import { Button } from "~/components/ui/Button";
import { Sheet } from "~/components/ui/Sheet";
import { VERIFICATION_QUERY } from "~/data/dashboard";

const DOCUMENT_ICON = "/icons/document-icon.svg";

function renderIntro(paragraph: string) {
  return (
    <p key={paragraph} className="text-[15px] leading-relaxed text-muted-500">
      {paragraph}
    </p>
  );
}

function renderIssue(issue: { document: string; reason: string }) {
  return (
    <li key={issue.document} className="rounded-lg bg-surface-alt p-4">
      <p className="flex items-center gap-2 text-[15px] text-muted-500">
        <img src={DOCUMENT_ICON} alt="" aria-hidden className="size-6" />
        {issue.document}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-danger">
        {issue.reason}
      </p>
    </li>
  );
}

/** Reviewer query sheet behind the failed-verification card's "View query"
 *  action: which submitted documents were rejected and why, with the path
 *  back into the onboarding wizard to fix and resubmit them. */
export function VerificationQuerySheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      labelledBy="verification-query-title"
      className="px-6 py-8 sm:max-w-lg sm:px-10 sm:py-12"
    >
      {/* Full-height column so the actions rest at the foot of tall
          viewports with ample air between them and the issue list. */}
      <div className="flex min-h-full flex-col">
        <h2
          id="verification-query-title"
          className="text-xl font-bold text-ink"
        >
          {VERIFICATION_QUERY.title}
        </h2>

        <div className="mt-5 space-y-4">
          {VERIFICATION_QUERY.intro.map(renderIntro)}
        </div>

        <ul className="mt-6 space-y-3">
          {VERIFICATION_QUERY.issues.map(renderIssue)}
        </ul>

        <div className="mt-auto space-y-3 pt-10">
          <Button to="/landlord-onboarding" className="h-11 w-full text-[15px]">
            {VERIFICATION_QUERY.updateLabel}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="h-11 w-full border-line text-[15px] font-normal text-muted-700 hover:bg-surface"
          >
            {VERIFICATION_QUERY.cancelLabel}
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
