import { useState } from "react";
import { MOCK_CONVERSATIONS } from "~/data/messages";
import { cn } from "~/lib/utils";
import { SearchIcon, VerifiedIcon } from "~/components/ui/icons";

/** "Recent Messages" sidebar of the enquiry page: search box + conversation
 *  rows. The search filters the rows client-side; the chat itself is a mock. */
export function ConversationList({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const conversations = MOCK_CONVERSATIONS.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className={className}>
      <h2 className="text-2xl font-extrabold text-black">Recent Messages</h2>

      <div className="relative mt-6">
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 size-4.25 -translate-y-1/2 text-ink"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chat"
          aria-label="Search chat"
          className="h-10 w-full rounded-md bg-[rgba(1,4,29,0.02)] pr-3 pl-11 text-base text-ink placeholder:text-ink/40 focus:outline-none"
        />
      </div>

      <ul className="mt-6 divide-y divide-line-soft border-y border-line-soft">
        {conversations.map((c) => (
          <li key={c.id} className="flex items-start gap-4 py-4">
            <div className="relative size-9 shrink-0">
              <img
                src={c.avatar}
                alt=""
                loading="lazy"
                className="size-full rounded-full object-cover"
              />
              {c.verified && (
                <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-white">
                  <VerifiedIcon className="size-3.5 text-black" />
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-brand-navy">{c.name}</p>
              <p className="mt-0.5 text-sm text-brand-navy/54">{c.role}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 pt-1">
              {c.online && (
                <span className="size-2.5 rounded-full bg-success" />
              )}
              <span className="text-xs text-brand-navy/54">{c.time}</span>
            </div>
          </li>
        ))}
        {conversations.length === 0 && (
          <li className="py-4 text-sm text-ink/60">
            No chats match your search.
          </li>
        )}
      </ul>
    </div>
  );
}
