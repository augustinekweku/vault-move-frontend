import { useState } from "react";
import { cn } from "~/lib/utils";
import { SearchIcon } from "~/components/ui/icons";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number | null;
}

/** FAQ-style expandable list. Single-open behaviour. */
export function Accordion({
  items,
  className,
  defaultOpen = null,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="flex gap-4">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <SearchIcon className="size-4" />
            </span>
            <div className="flex-1">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full text-left text-lg font-bold text-brand-dark"
              >
                {item.question}
              </button>
              {open && (
                <p className="mt-2 max-w-2xl text-[15px] leading-7 text-brand-navy/70">
                  {item.answer}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
