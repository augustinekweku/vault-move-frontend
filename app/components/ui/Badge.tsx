import { cn } from "~/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-surface-alt px-2 py-1 text-[10px] font-medium text-brand-navy",
        className,
      )}
    >
      {children}
    </span>
  );
}
