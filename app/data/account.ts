import type { AccountTab } from "~/types";

/** Tab bar of the My Account page — only the active indicator switches for
 *  now; the tab panels land later. */
export const ACCOUNT_TABS: { value: AccountTab; label: string }[] = [
  { value: "profile", label: "My Profile" },
  { value: "payments", label: "Payments and Escrow" },
  { value: "history", label: "Property History" },
  { value: "settings", label: "Settings" },
];
