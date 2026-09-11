import type { DealRequirement } from "~/types";
import { IdIcon } from "~/components/ui/icons";

/** Leading glyph of a requirement row — the ID card by default, the
 *  document asset for agreement/reference rows (same asset as the
 *  contract rows so every document glyph matches). */
export function RequirementGlyph({
  icon,
  className,
}: {
  icon: DealRequirement["icon"];
  className?: string;
}) {
  return icon === "document" ? (
    <img src="/icons/document.svg" alt="" className={className} />
  ) : (
    <IdIcon aria-hidden className={className} />
  );
}
