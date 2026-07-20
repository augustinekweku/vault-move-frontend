import { useState } from "react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { MAIN_NAV } from "~/data/navigation";
import { Button } from "~/components/ui/Button";
import { ChevronDownIcon, CloseIcon } from "~/components/ui/icons";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white shadow-xl transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="font-semibold text-brand">Menu</span>
          <button type="button" aria-label="Close menu" onClick={onClose}>
            <CloseIcon className="size-6 text-ink" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-4">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-line/60">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-left text-[15px] text-ink"
                  onClick={() =>
                    setExpanded((e) => (e === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <ChevronDownIcon
                    className={cn(
                      "size-4 transition-transform",
                      expanded === item.label && "rotate-180",
                    )}
                  />
                </button>
                {expanded === item.label && (
                  <div className="pb-2 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={onClose}
                        className="block py-2 text-sm text-ink/70"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className="block border-b border-line/60 py-3 text-[15px] text-ink"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex flex-col gap-3 border-t border-line px-5 py-4">
          <Button to="/login" variant="outline" onClick={onClose}>
            Login
          </Button>
          <Button to="/signup" onClick={onClose}>
            Sign Up
          </Button>
        </div>
      </aside>
    </div>
  );
}
