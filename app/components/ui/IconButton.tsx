import { Link } from "react-router";
import { cn } from "~/lib/utils";

interface IconButtonProps {
  to?: string;
  onClick?: () => void;
  "aria-label": string;
  className?: string;
  variant?: "dark" | "light" | "brand";
  children: React.ReactNode;
}

const variants = {
  dark: "bg-brand-dark text-white hover:bg-brand-dark/90",
  brand: "bg-brand text-white hover:bg-brand/90",
  light: "bg-white text-ink hover:bg-black/5",
};

/** Round icon button, e.g. arrow / mail / favourite circles. */
export function IconButton({
  to,
  onClick,
  className,
  variant = "dark",
  children,
  ...rest
}: IconButtonProps) {
  const classes = cn(
    "inline-flex size-14 items-center justify-center rounded-full transition-colors",
    variants[variant],
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
