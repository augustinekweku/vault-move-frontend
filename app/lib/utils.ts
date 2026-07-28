export type ClassValue =
  string | number | null | false | undefined | ClassValue[];

/**
 * Lightweight className joiner. Filters out falsy values and flattens arrays.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }

  return out.join(" ");
}

/**
 * Smooth-scroll the window back to the top — used when swapping panels of
 * very different heights so the shorter one isn't left scrolled out of
 * view. Browser-only: callers must stay on the client side of the SSR
 * boundary.
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
