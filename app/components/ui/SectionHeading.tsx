import { cn } from "~/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  align?: "left" | "center";
  underline?: boolean;
  className?: string;
}

/** Reusable heading used by "How it works", section titles and page blocks. */
export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  underline = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-base font-light text-brand-dark">{eyebrow}</span>
      )}
      <h2 className="text-2xl font-semibold text-brand-dark sm:text-[26px]">
        {title}
      </h2>
      {underline && <span className="h-0.5 w-14 rounded-full bg-accent" />}
    </div>
  );
}
