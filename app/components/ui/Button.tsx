import { Link } from "react-router";
import { cn } from "~/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand/90",
  outline: "border border-black/25 text-ink hover:bg-black/5",
  ghost: "text-ink hover:bg-black/5",
  dark: "bg-brand-dark text-white hover:bg-brand-dark/90",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-12 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };

type ButtonAsLink = CommonProps & {
  to: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("to" in props && props.to) {
    const { to, ...rest } = props as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    ...rest
  } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
