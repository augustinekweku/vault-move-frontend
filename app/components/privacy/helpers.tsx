import type { ReactNode } from "react";

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 inline-block border-b-2 border-accent pb-1 text-2xl font-bold text-brand-dark">
      {children}
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
