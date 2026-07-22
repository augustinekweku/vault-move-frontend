import type { ContactMethod } from "~/types";
import { PhoneIcon, MailIcon, LocationIcon } from "~/components/ui/icons";

export const CONTACTS: ContactMethod[] = [
  { Icon: PhoneIcon, value: "+233 559705912" },
  { Icon: MailIcon, value: "info@vaultmove.com" },
  { Icon: LocationIcon, value: "location here" },
];
