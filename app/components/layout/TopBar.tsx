import { ChevronDownIcon } from "~/components/ui/icons";

/** Thin top utility bar with the country / currency selector. */
export function TopBar() {
  return (
    <div className="h-12 w-full bg-brand-dark">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-end px-5 sm:px-8">
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-white/90"
        >
          <span
            aria-hidden
            className="flex h-4 w-6 overflow-hidden rounded-[3px]"
          >
            <span className="h-full flex-1 bg-[#ce1126]" />
            <span className="h-full flex-1 bg-[#fcd116]" />
            <span className="h-full flex-1 bg-[#006b3f]" />
          </span>
          <span>Ghana</span>
          <ChevronDownIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
