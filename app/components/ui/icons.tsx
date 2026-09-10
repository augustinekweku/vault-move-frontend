import type { SVGProps } from "react";
import { cn } from "~/lib/utils";

type IconProps = SVGProps<SVGSVGElement>;

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5 12h14m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="m20 20-3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M14 3v4a1 1 0 0 0 1 1h4M8 3h6l6 6v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m4 7 8 5 8-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 20s-7-4.5-9.5-9A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartFilledIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 20s-7-4.5-9.5-9A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.8 5.4 21l1.4-7L1.6 9.3l7-.8L12 2Z" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7.5V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 16.5h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 14h18M7 10V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M4 18v2M20 18v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BathIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M3 12h18v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2ZM6 18l-1 2M18 18l1 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VerifiedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 22 21" fill="currentColor" aria-hidden {...props}>
      <path d="M9.625 10.9364L8.175 9.51137C7.99167 9.32803 7.76267 9.23637 7.488 9.23637C7.21333 9.23637 6.97567 9.33637 6.775 9.53637C6.59167 9.7197 6.5 9.95303 6.5 10.2364C6.5 10.5197 6.59167 10.753 6.775 10.9364L8.925 13.0864C9.125 13.2864 9.35833 13.3864 9.625 13.3864C9.89167 13.3864 10.125 13.2864 10.325 13.0864L14.575 8.83637C14.775 8.63637 14.8707 8.40303 14.862 8.13637C14.8533 7.8697 14.7577 7.63637 14.575 7.43637C14.375 7.23637 14.1377 7.13237 13.863 7.12437C13.5883 7.11637 13.3507 7.21203 13.15 7.41137L9.625 10.9364ZM6.825 19.9864L5.375 17.5364L2.625 16.9364C2.375 16.8864 2.175 16.7574 2.025 16.5494C1.875 16.3414 1.81667 16.112 1.85 15.8614L2.125 13.0364L0.25 10.8864C0.0833333 10.703 0 10.4864 0 10.2364C0 9.98637 0.0833333 9.7697 0.25 9.58637L2.125 7.43637L1.85 4.61137C1.81667 4.36137 1.875 4.13203 2.025 3.92337C2.175 3.7147 2.375 3.5857 2.625 3.53637L5.375 2.93637L6.825 0.486367C6.95833 0.269701 7.14167 0.123701 7.375 0.0483674C7.60833 -0.0269659 7.84167 -0.0142993 8.075 0.0863674L10.675 1.18637L13.275 0.0863674C13.5083 -0.0136326 13.7417 -0.0262992 13.975 0.0483674C14.2083 0.123034 14.3917 0.269034 14.525 0.486367L15.975 2.93637L18.725 3.53637C18.975 3.58637 19.175 3.7157 19.325 3.92437C19.475 4.13303 19.5333 4.36203 19.5 4.61137L19.225 7.43637L21.1 9.58637C21.2667 9.7697 21.35 9.98637 21.35 10.2364C21.35 10.4864 21.2667 10.703 21.1 10.8864L19.225 13.0364L19.5 15.8614C19.5333 16.1114 19.475 16.3407 19.325 16.5494C19.175 16.758 18.975 16.887 18.725 16.9364L15.975 17.5364L14.525 19.9864C14.3917 20.203 14.2083 20.349 13.975 20.4244C13.7417 20.4997 13.5083 20.487 13.275 20.3864L10.675 19.2864L8.075 20.3864C7.84167 20.4864 7.60833 20.499 7.375 20.4244C7.14167 20.3497 6.95833 20.2037 6.825 19.9864Z" fill="currentColor" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 5a2 2 0 0 1 2-2h1.5a1 1 0 0 1 1 .8l.7 3a1 1 0 0 1-.3 1L7.6 9.6a12 12 0 0 0 5.8 5.8l1.8-1.3a1 1 0 0 1 1-.2l3 .7a1 1 0 0 1 .8 1V17a2 2 0 0 1-2 2A15 15 0 0 1 4 5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m8.6 10.7 6.8-3.9M8.6 13.3l6.8 3.9"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2V10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SofaIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M3 18v-3a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h3a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4ZM8 2v16M16 6v16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M6 6 18 18M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3 10h18M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M9.9 4.9A9.4 9.4 0 0 1 12 4.5c6.5 0 10 7.5 10 7.5a16 16 0 0 1-2.2 3.4M6 6.2A15 15 0 0 0 2 12s3.5 7.5 10 7.5c1.4 0 2.7-.3 3.8-.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 9.9a3 3 0 0 0 4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="m4 4 16 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SidebarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M9 3v18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IdIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="9" cy="10" r="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15 8h2M15 12h2M7 16h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FlagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12Zm0 0v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 3v12m0-12 4 4m-4-4-4 4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DeleteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Feather edit-3 pencil for the portal Listings row actions. */
export function EditIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 20h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PendingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 18.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13ZM4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8 4a4 4 0 0 1-4-4h4V8a4 4 0 0 1 0 8Z"
      />
    </svg>
  );
}

/** Amber ring with three dots for the listing-published confirmation. */
export function PendingReviewIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle cx="15" cy="24" r="2.6" fill="currentColor" />
      <circle cx="24" cy="24" r="2.6" fill="currentColor" />
      <circle cx="33" cy="24" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 2V1M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MessageCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2c-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.9 4.8a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5a4 4 0 0 0 3.2 3.9c-.5.2-1.1.2-1.7.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.5-1.3 2-2.1Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.9 8.5H3.7V20h3.2V8.5ZM5.3 3.5A1.9 1.9 0 1 0 5.3 7.3a1.9 1.9 0 0 0 0-3.8ZM20.3 20v-6.3c0-3.2-1.7-4.7-4-4.7a3.5 3.5 0 0 0-3.1 1.7V8.5H9.9V20H13v-6c0-1.6.3-3.1 2.3-3.1s2 1.8 2 3.2V20h3Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8.2V13h2.8v8h2.5Z" />
    </svg>
  );
}

/** Recolourable icon rendered from a /icons/*.svg asset through a CSS mask —
 *  the glyph takes `currentColor`, which an <img> embed can't do (several
 *  dashboard icons ship as fixed white fills). Size it via className. */
export function MaskIcon({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("block shrink-0 bg-current", className)}
      style={{
        mask: `url(${src}) center / contain no-repeat`,
        WebkitMask: `url(${src}) center / contain no-repeat`,
      }}
    />
  );
}

export function DevelopersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 112 112" fill="none" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M98 27.9999H88.6667V18.6666C88.6667 13.5333 84.4667 9.33325 79.3333 9.33325H32.6667C27.5333 9.33325 23.3333 13.5333 23.3333 18.6666V46.6666H14C8.86666 46.6666 4.66666 50.8666 4.66666 55.9999V97.9999C4.66666 100.567 6.76666 102.667 9.33332 102.667H102.667C105.233 102.667 107.333 100.567 107.333 97.9999V37.3333C107.333 32.1999 103.133 27.9999 98 27.9999ZM98 93.3333H65.3333V69.9999H46.6667V93.3333H14V55.9999H28C30.5667 55.9999 32.6667 53.8999 32.6667 51.3333V18.6666H79.3333V32.6666C79.3333 35.2333 81.4333 37.3333 84 37.3333H98V93.3333Z"
      />
      <path
        fill="currentColor"
        d="M42 46.6667H51.3333V56H42V46.6667ZM42 28H51.3333V37.3333H42V28ZM23.3333 65.3333H32.6667V74.6667H23.3333V65.3333ZM79.3333 65.3333H88.6667V74.6667H79.3333V65.3333ZM79.3333 46.6667H88.6667V56H79.3333V46.6667ZM60.6667 28H70V37.3333H60.6667V28ZM60.6667 46.6667H70V56H60.6667V46.6667Z"
      />
    </svg>
  );
}

export function LandlordIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 112 112" fill="none" aria-hidden {...props}>
      <path
        d="M66.5327 27.8881C62.566 19.9548 53.3167 15.5774 44.1233 17.8688C33.53 20.5101 27.0293 31.0054 29.6007 41.3094C30.3333 44.2634 31.738 46.8814 33.614 49.0514L20.972 69.4448C20.4796 70.24 20.1516 71.1259 20.0073 72.0501C19.863 72.9742 19.9054 73.9179 20.132 74.8254L21.812 81.5454C21.886 81.8454 22.0759 82.1037 22.3401 82.2638C22.6043 82.4239 22.9212 82.4727 23.2213 82.3994L30.352 80.6214C32.1214 80.1794 33.6484 79.0643 34.608 77.5134L48.0667 55.7901"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M51.6562 38.5719C54.3045 37.9116 55.9307 35.2882 55.2885 32.7124C54.6463 30.1366 51.9788 28.5838 49.3305 29.2441C46.6822 29.9044 45.0559 32.5278 45.6981 35.1036C46.3403 37.6794 49.0078 39.2322 51.6562 38.5719Z"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M83.1133 72.8466C93.7067 70.2053 100.212 59.71 97.6407 49.406C95.074 39.0973 84.4013 32.886 73.8127 35.5273C63.2193 38.1687 56.7187 48.664 59.2853 58.968C60.0227 61.922 61.4227 64.54 63.2987 66.71L50.6613 87.1033C50.1689 87.8986 49.8409 88.7845 49.6966 89.7086C49.5524 90.6328 49.5948 91.5765 49.8213 92.484L51.4967 99.204C51.5333 99.353 51.5989 99.4933 51.6898 99.6169C51.7807 99.7405 51.8952 99.845 52.0265 99.9243C52.1578 100.004 52.3035 100.056 52.4553 100.079C52.607 100.102 52.7617 100.095 52.9107 100.058L60.0367 98.28C61.806 97.838 63.333 96.7228 64.2927 95.172L77.756 73.4487C79.5262 73.4922 81.3136 73.2915 83.118 72.8466H83.1133Z"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M81.4435 55.9227C84.0918 55.2624 85.7181 52.6391 85.0759 50.0633C84.4337 47.4875 81.7661 45.9346 79.1178 46.5949C76.4695 47.2552 74.8433 49.8786 75.4855 52.4544C76.1277 55.0302 78.7952 56.583 81.4435 55.9227Z"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  );
}

export function AgentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 98 96" fill="none" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M60.4333 86.1001L88.2 77.4667C87.8111 76.7667 87.248 76.1647 86.5107 75.6607C85.7733 75.1567 84.9364 74.9032 84 74.9001H60.4333C58.3333 74.9001 56.6611 74.8223 55.4167 74.6667C54.1722 74.5112 52.8889 74.2001 51.5667 73.7334L44.9167 71.5167C43.6722 71.1278 42.7778 70.3501 42.2333 69.1834C41.6889 68.0167 41.6111 66.8112 42 65.5667C42.3889 64.3223 43.148 63.4076 44.2773 62.8227C45.4067 62.2378 46.592 62.1414 47.8333 62.5334L52.7333 64.1667C54.0556 64.5556 55.5536 64.8667 57.2273 65.1001C58.9011 65.3334 61.1753 65.4889 64.05 65.5667H65.3333C65.3333 64.7112 65.0813 63.8945 64.5773 63.1167C64.0733 62.3389 63.4698 61.8334 62.7667 61.6001L35.4667 51.5667H28V77.2334L60.4333 86.1001ZM57.9833 95.2001L28 86.8C27.3778 88.8223 26.152 90.4556 24.3227 91.7001C22.4933 92.9445 20.608 93.5667 18.6667 93.5667H9.33333C6.76667 93.5667 4.57022 92.6536 2.744 90.8274C0.917778 89.0012 0.00311111 86.8032 0 84.2334V51.5667C0 49.0001 0.914667 46.8036 2.744 44.9774C4.57333 43.1512 6.76978 42.2365 9.33333 42.2334H35.4667C36.0111 42.2334 36.5556 42.2925 37.1 42.4107C37.6444 42.5289 38.15 42.6643 38.6167 42.8167L66.0333 52.9667C68.6 53.9001 70.6813 55.5334 72.2773 57.8667C73.8733 60.2001 74.6698 62.7667 74.6667 65.5667H84C87.8889 65.5667 91.1944 66.8501 93.9167 69.4167C96.6389 71.9834 98 75.3667 98 79.5667C98 81.2778 97.552 82.6203 96.656 83.5941C95.76 84.5678 94.3802 85.3643 92.5167 85.9834L63.35 95.0834C62.4944 95.3945 61.6 95.5501 60.6667 95.5501C59.7333 95.5501 58.8389 95.4334 57.9833 95.2001ZM9.33333 84.2334H18.6667V51.5667H9.33333V84.2334ZM63.4107 0.410719C64.3036 0.681386 65.1778 1.12783 66.0333 1.75005L89.3667 18.4334C90.6111 19.2889 91.5833 20.3778 92.2833 21.7001C92.9833 23.0223 93.3333 24.4612 93.3333 26.0167V51.5667C93.3333 52.8889 92.8853 53.9981 91.9893 54.8941C91.0933 55.7901 89.9858 56.2365 88.6667 56.2334C87.3475 56.2303 86.24 55.7823 85.344 54.8894C84.448 53.9965 84 52.8889 84 51.5667V25.9001L60.6667 9.56672L37.3333 25.9001V28.2334C37.3333 29.5556 36.8853 30.6647 35.9893 31.5607C35.0933 32.4567 33.9858 32.9032 32.6667 32.9001C31.3476 32.8969 30.24 32.4489 29.344 31.5561C28.448 30.6632 28 29.5556 28 28.2334V26.0167C28 24.4612 28.35 23.0223 29.05 21.7001C29.75 20.3778 30.7222 19.2889 31.9667 18.4334L55.3 1.75005C56.1556 1.12783 57.0313 0.67983 57.9273 0.406052C58.8233 0.132274 59.7364 -0.00305868 60.6667 5.24346e-05C61.5969 0.00316355 62.5116 0.140053 63.4107 0.410719ZM57.6333 27.5334C58.1 27.0667 58.3333 26.5223 58.3333 25.9001C58.3333 25.2778 58.1 24.7334 57.6333 24.2667C57.1667 23.8001 56.6222 23.5667 56 23.5667C55.3778 23.5667 54.8333 23.8001 54.3667 24.2667C53.9 24.7334 53.6667 25.2778 53.6667 25.9001C53.6667 26.5223 53.9 27.0667 54.3667 27.5334C54.8333 28.0001 55.3778 28.2334 56 28.2334C56.6222 28.2334 57.1667 28.0001 57.6333 27.5334ZM66.9667 27.5334C67.4333 27.0667 67.6667 26.5223 67.6667 25.9001C67.6667 25.2778 67.4333 24.7334 66.9667 24.2667C66.5 23.8001 65.9556 23.5667 65.3333 23.5667C64.7111 23.5667 64.1667 23.8001 63.7 24.2667C63.2333 24.7334 63 25.2778 63 25.9001C63 26.5223 63.2333 27.0667 63.7 27.5334C64.1667 28.0001 64.7111 28.2334 65.3333 28.2334C65.9556 28.2334 66.5 28.0001 66.9667 27.5334ZM57.6333 36.8667C58.1 36.4001 58.3333 35.8556 58.3333 35.2334C58.3333 34.6112 58.1 34.0667 57.6333 33.6001C57.1667 33.1334 56.6222 32.9001 56 32.9001C55.3778 32.9001 54.8333 33.1334 54.3667 33.6001C53.9 34.0667 53.6667 34.6112 53.6667 35.2334C53.6667 35.8556 53.9 36.4001 54.3667 36.8667C54.8333 37.3334 55.3778 37.5667 56 37.5667C56.6222 37.5667 57.1667 37.3334 57.6333 36.8667ZM66.9667 36.8667C67.4333 36.4001 67.6667 35.8556 67.6667 35.2334C67.6667 34.6112 67.4333 34.0667 66.9667 33.6001C66.5 33.1334 65.9556 32.9001 65.3333 32.9001C64.7111 32.9001 64.1667 33.1334 63.7 33.6001C63.2333 34.0667 63 34.6112 63 35.2334C63 35.8556 63.2333 36.4001 63.7 36.8667C64.1667 37.3334 64.7111 37.5667 65.3333 37.5667C65.9556 37.5667 66.5 37.3334 66.9667 36.8667Z"
      />
    </svg>
  );
}
