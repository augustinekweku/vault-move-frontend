import type { PropertyReview, PropertyReviewSummary } from "~/types";
import { cn } from "~/lib/utils";
import { StarIcon } from "~/components/ui/icons";

/** Donut gauge for the average rating — yellow arc over a light track
 *  with "4.0 /5.0" centred. */
function RatingGauge({ average }: { average: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (average / 5);

  return (
    <div className="relative size-30">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="9"
          className="stroke-line"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference - filled}`}
          className="stroke-star-yellow"
        />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center gap-0.5 text-xs text-ink/55">
        <span className="font-semibold">{average.toFixed(1)}</span>
        <span>/5.0</span>
      </p>
    </div>
  );
}

/** One row of the ratings breakdown: "5 ★ [bar] 182". Bar width is
 *  proportional to the largest band so the rows stay comparable. */
function BreakdownRow({
  stars,
  count,
  max,
}: {
  stars: number;
  count: number;
  max: number;
}) {
  return (
    <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2.5 py-2">
      <span className="text-xs font-semibold text-ink">{stars}</span>
      <StarIcon className="size-4 text-star-yellow" />
      <div className="h-2 rounded-[5px] bg-surface-gray">
        <div
          className="h-full rounded-[5px] bg-star-yellow"
          style={{ width: `${Math.max((count / max) * 100, 1.5)}%` }}
        />
      </div>
      <span className="w-7 text-right text-xs text-ink">{count}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: PropertyReview }) {
  return (
    <article className="rounded-xl bg-surface-gray p-6 sm:p-7">
      <div className="flex items-center gap-4">
        <img
          src={review.avatar}
          alt={review.author}
          loading="lazy"
          className="size-14 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="flex items-center gap-1">
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={cn(
                    "size-4.5",
                    i < Math.round(review.rating)
                      ? "text-star-yellow"
                      : "text-line",
                  )}
                />
              ))}
            </span>
            <span className="text-xs font-semibold text-ink/55">
              {review.rating.toFixed(1)}
            </span>
          </p>
          <p className="mt-1 text-sm font-bold text-ink">{review.author}</p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-6 text-ink-gray">{review.text}</p>
    </article>
  );
}

interface PropertyReviewsProps {
  summary: PropertyReviewSummary;
  reviews: PropertyReview[];
  /** Defaults to "Property Reviews" (property details page); the landlord
   *  profile passes "Landlord Reviews". */
  heading?: string;
  className?: string;
}

/** The "Reviews" tab of the property details page: overall-ratings summary
 *  (donut gauge + per-star breakdown bars) and the grid of review cards. */
export function PropertyReviews({
  summary,
  reviews,
  heading = "Property Reviews",
  className,
}: PropertyReviewsProps) {
  const maxCount = Math.max(...summary.breakdown.map((row) => row.count));

  return (
    <div className={className}>
      <h2 className="text-xl font-bold text-ink">{heading}</h2>
      <h3 className="mt-4 text-xs font-semibold text-ink">Overall Ratings</h3>

      <div className="mt-3 flex flex-col gap-8 rounded-xl border border-line-soft p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex shrink-0 flex-col items-center gap-3">
          <RatingGauge average={summary.average} />
          <p className="text-xs text-ink/55">{summary.total} ratings</p>
          <button
            type="button"
            className="flex h-8.5 w-32.5 items-center justify-center rounded bg-brand text-xs text-white hover:bg-brand/90"
          >
            Write a Review
          </button>
        </div>
        <div className="flex-1 divide-y divide-line-soft border-y border-line-soft">
          {summary.breakdown.map((row) => (
            <BreakdownRow key={row.stars} {...row} max={maxCount} />
          ))}
        </div>
      </div>

      <h3 className="mt-8 text-sm font-semibold text-ink">Reviews</h3>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
