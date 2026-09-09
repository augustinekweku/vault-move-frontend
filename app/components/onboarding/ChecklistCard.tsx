import { CheckIcon } from "~/components/ui/icons";

/** One checklist row — module-level; the lists are static. */
function renderChecklistItem(item: string) {
  return (
    <li key={item} className="flex items-center gap-2.5 text-sm text-ink">
      <span
        aria-hidden
        className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white"
      >
        <CheckIcon className="size-3" />
      </span>
      {item}
    </li>
  );
}

/** Tinted card pairing a heading with a checked document list — used for the
 *  acceptable company certificates and the ID verification steps. */
export function ChecklistCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl bg-surface-alt p-4">
      <p className="text-[15px] text-ink">{title}</p>
      <ul className="mt-4 space-y-3">{items.map(renderChecklistItem)}</ul>
    </div>
  );
}
