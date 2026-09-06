import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { ChevronDownIcon } from "~/components/ui/icons";
import { Field } from "~/components/ui/Input";

interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options: string[];
  onChange?: (value: string) => void;
  className?: string;
  wrapperClassName?: string;
  suffix?: React.ReactNode;
}

/** Accessible-ish custom dropdown built on plain state (no external deps). */
export function Select({
  label,
  placeholder = "Select",
  value,
  options,
  onChange,
  className,
  wrapperClassName,
  suffix,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const control = (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-line bg-white px-3.5 text-left text-[15px] shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:border-brand focus:outline-none"
      >
        <span className={cn("truncate", value ? "text-ink" : "text-muted-500")}>
          {value || placeholder}
        </span>
        {suffix && <span className="shrink-0 text-muted-500">{suffix}</span>}
        <ChevronDownIcon
          className={cn(
            "size-5 shrink-0 text-muted-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-line bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange?.(opt);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-3.5 py-2 text-left text-sm hover:bg-surface-alt",
                  value === opt ? "text-brand font-medium" : "text-ink",
                )}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (!label) return control;
  return (
    <Field label={label} className={wrapperClassName}>
      {control}
    </Field>
  );
}
