import { Link } from "react-router";
import { cn } from "~/lib/utils";

/** Vault Move Africa wordmark + hexagon glyph. */
export function Logo({
  className,
  variant = "brand",
}: {
  className?: string;
  variant?: "brand" | "white";
}) {
  const color = variant === "white" ? "#ffffff" : "var(--color-brand-deep)";
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <svg
        width="34"
        height="32"
        viewBox="0 0 34 32"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M17 1 3 9v14l14 8 14-8V9L17 1Z"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="m10 12 7 8 7-8"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-[15px] font-semibold leading-tight"
        style={{ color }}
      >
        vault move
        <br />
        africa
      </span>
    </Link>
  );
}
