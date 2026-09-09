import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { CheckIcon, ChevronDownIcon } from "~/components/ui/icons";
import { LANDLORD_PHONE_CODES } from "~/data/auth";

/** Country-code picker for the phone fields: a dropdown-menu trigger in the
 *  input group (button + chevron + floating menu with a check on the active
 *  code), matching the project's custom Select pattern. */
export function PhoneCodeMenu({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open ]);

  function toggleMenu() {
    setOpen((current) => !current);
  }

  function handleOptionClick(event: React.MouseEvent<HTMLButtonElement>) {
    const code = event.currentTarget.dataset.code;
    if (code) onChange(code);
    setOpen(false);
  }

  function renderOption(code: string) {
    const active = code === value;
    return (
      <li key={code} role="option" aria-selected={active}>
        <button
          type="button"
          data-code={code}
          onClick={handleOptionClick}
          className={cn(
            "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-surface-alt",
            active ? "font-medium text-brand" : "text-ink",
          )}
        >
          {code}
          {active && <CheckIcon className="size-4 shrink-0" />}
        </button>
      </li>
    );
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={toggleMenu}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Country code"
        className="flex h-full items-center gap-1 rounded-l-lg py-0 pr-1 pl-3.5 text-[13px] font-medium text-muted-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        {value.split(" ")[0]}
        <ChevronDownIcon
          className={cn(
            "size-4 text-muted-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 z-30 mt-1 min-w-36 rounded-lg border border-line bg-white py-1 shadow-lg"
        >
          {LANDLORD_PHONE_CODES.map(renderOption)}
        </ul>
      )}
    </div>
  );
}
