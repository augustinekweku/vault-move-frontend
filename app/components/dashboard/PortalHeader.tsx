import {
  BellIcon,
  MenuIcon,
  MessageCircleIcon,
  MaskIcon,
} from "~/components/ui/icons";
import { UserMenu } from "~/components/dashboard/UserMenu";

/** Sticky header of the portal: the menu button (small screens) and the
 *  current page title with its icon on the left, the notification and
 *  message shortcuts plus the account menu on the right. */
export function PortalHeader({
  title,
  icon,
  onMenuClick,
}: {
  title: string;
  icon?: string;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-line-soft bg-white">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-7">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Open menu"
            onClick={onMenuClick}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-alt hover:text-brand lg:hidden"
          >
            <MenuIcon className="size-5" />
          </button>
          <h1 className="flex min-w-0 items-center gap-3 text-base font-medium text-ink sm:text-lg">
            {icon && <MaskIcon src={icon} className="hidden size-5 shrink-0 sm:block" />}
            <span className="truncate">{title}</span>
          </h1>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Notifications"
            className="relative text-ink transition-colors hover:text-brand"
          >
            <BellIcon className="size-5" />
            <span className="absolute top-0 right-0.5 size-2 rounded-full bg-[#ff5151]" />
          </button>
          <button
            type="button"
            aria-label="Messages"
            className="text-ink transition-colors hover:text-brand"
          >
            <MessageCircleIcon className="size-5" />
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
