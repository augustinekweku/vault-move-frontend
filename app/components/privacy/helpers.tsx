import type { ReactNode } from "react";

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 text-2xl font-bold text-brand-dark">
      {children}
      {/* Short rounded brand bar, per Figma (Rectangle 896) */}
      <span aria-hidden className="mt-1 block h-1 w-8 rounded-full bg-brand" />
    </h2>
  );
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1 pl-6 text-[15px] leading-7 text-ink/70">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
