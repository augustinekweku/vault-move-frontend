import { useState } from "react";
import { ENQUIRY_TOPICS } from "~/data/messages";
import { cn } from "~/lib/utils";
import { Field, Input } from "~/components/ui/Input";

/** The structured "What would you like to know" enquiry card shown in the
 *  chat — topic radios plus move-in / budget / household fields. Selections
 *  are local mock state until the backend is live. */
export function EnquiryForm({ className }: { className?: string }) {
  const [topic, setTopic] = useState(ENQUIRY_TOPICS[0]);
  const [budget, setBudget] = useState("");

  return (
    <section className={cn("rounded-xl bg-surface-alt p-4 sm:p-5", className)}>
      <h3 className="text-base font-bold text-brand-dark">
        What would you like to know
      </h3>
      <p className="mt-2 text-sm leading-6 text-ink/80">
        Tell us the areas you would like to know and we would get back to you
        as soon as we can!
      </p>

      <div
        role="radiogroup"
        aria-label="Enquiry topic"
        className="mt-4 flex flex-col gap-4"
      >
        {ENQUIRY_TOPICS.map((option) => {
          const selected = topic === option;
          return (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-700"
            >
              <input
                type="radio"
                name="enquiry-topic"
                value={option}
                checked={selected}
                onChange={() => setTopic(option)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "flex size-4 items-center justify-center rounded-full border",
                  selected ? "border-accent" : "border-line bg-white",
                )}
              >
                {selected && <span className="size-2 rounded-full bg-accent" />}
              </span>
              {option}
            </label>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <Input label="Move in time frame" placeholder="eg in 3 months" />
        <Field label="Budget">
          <div className="relative">
            <input
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="eg 3500 ghc"
              inputMode="numeric"
              className="h-11 w-full rounded-lg border border-line bg-white pr-16 pl-3.5 text-[15px] text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)] placeholder:text-muted-500 focus:border-brand focus:outline-none"
            />
            <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-sm text-muted-500">
              /Month
            </span>
          </div>
        </Field>
        <Input label="Household size" placeholder="eg 5" inputMode="numeric" />
      </div>
    </section>
  );
}
