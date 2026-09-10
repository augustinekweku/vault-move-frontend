import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/Button";
import { PORTAL_USER_TYPES } from "~/data/portals";
import { cn } from "~/lib/utils";
import type { PortalUserType } from "~/types";

const RINGS = "/images/cta-ornament.png";
const DOTS = "/icons/ornament-11-brand.svg";
const VAULT_ICON = "/icons/vault-icon-brand.svg";

type SelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

/** One audience tile: the icon card and its caption. Selection is owned by
 *  the page, which hands every tile the same data-* click handler. */
function TypeCard({
  userType,
  active,
  onSelect,
}: {
  userType: PortalUserType;
  active: boolean;
  onSelect: SelectHandler;
}) {
  return (
    <button
      type="button"
      data-value={userType.id}
      onClick={onSelect}
      aria-pressed={active}
      className="group flex w-51 flex-col items-center gap-3"
    >
      <span
        className={cn(
          "flex h-41 w-50 items-start justify-center rounded-xl border bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)] transition-colors",
          active ? "border-brand-deep" : "border-line group-hover:border-muted-400",
        )}
      >
        <userType.Icon
          className={cn(
            "mt-11 size-28 transition-colors",
            active ? "text-brand" : "text-black/24",
          )}
        />
      </span>
      <span
        className={cn(
          "text-lg leading-8 transition-colors",
          userType.labelAlign === "left" ? "self-start" : "text-center",
          active ? "font-semibold text-brand" : "text-ink-soft/54",
        )}
      >
        {userType.label}
      </span>
    </button>
  );
}

/** Maps the audience options to tiles — module-level; the page threads its
 *  selection state and handler in so the body stays a pure composition. */
function renderTypeCards(
  selected: PortalUserType["id"] | null,
  onSelect: SelectHandler,
) {
  return PORTAL_USER_TYPES.map((userType) => (
    <TypeCard
      key={userType.id}
      userType={userType}
      active={userType.id === selected}
      onSelect={onSelect}
    />
  ));
}

/** Portal onboarding: pick an audience (developer / landlord / agent) before
 *  continuing to sign-up. Standalone white page, no site navbar/footer. */
export function SelectUserType() {
  const [selected, setSelected] = useState<PortalUserType["id"] | null>(null);
  const navigate = useNavigate();

  // The tiles hand their id to this single handler via data-* (the
  // DealsSection pattern); it needs the setter, so it lives with the state.
  function handleTypeClick(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.dataset
      .value as PortalUserType["id"] | undefined;
    if (id) setSelected(id);
  }

  function handleContinue() {
    // Wire the chosen audience into the auth flow when the backend is live;
    // portal users continue to sign-up for now.
    navigate("/signup");
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-white">
      {/* Design canvas, centred on wider screens */}
      <div className="relative mx-auto min-h-svh w-360 max-w-full pb-12 lg:pb-0">
        {/* Rings flush with the top-left corner; the logo sits on them */}
        <img
          src={RINGS}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 size-78 select-none"
        />
        {/* The footer's dots ornament, tilted upright under the Continue
            button and clipped by the bottom edge. Placed unrotated so the
            90° spin around its centre lands the visual box in place. */}
        <img
          src={DOTS}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-192.5 left-53.5 hidden h-44.25 w-95.25 -rotate-90 select-none lg:block"
        />

        <header className="relative flex items-start justify-between pr-5 pl-5 pt-22 sm:pr-20 sm:pl-21">
          <Link to="/" className="flex items-center gap-3">
            <img src={VAULT_ICON} alt="" aria-hidden className="h-18 w-19" />
            <span className="text-[20px] leading-6.75 font-semibold text-brand">
              vault move
              <br />
              africa
            </span>
          </Link>
          <Link
            to="/portals"
            className="mt-5 text-sm text-ink transition-colors hover:text-brand"
          >
            {"< Back"}
          </Link>
        </header>

        {/* Tiles: three across with even gaps on the canvas, stacked below md */}
        <div className="relative mx-auto mt-35 flex w-199.5 max-w-full flex-col items-center gap-10 px-5 md:flex-row md:justify-center md:gap-12 lg:justify-between lg:gap-23.25 lg:px-0">
          {renderTypeCards(selected, handleTypeClick)}
        </div>

        {/* Continue stays disabled until a tile is picked */}
        <div className="relative mt-17 flex justify-center px-5 lg:px-0">
          <Button
            type="button"
            onClick={handleContinue}
            disabled={!selected}
            className="h-11 w-125 max-w-full rounded-2xl"
          >
            Continue
          </Button>
        </div>
      </div>
    </main>
  );
}
