import { cn } from "~/lib/utils";

interface PropertyGalleryProps {
  /** First image renders large on the left; the next four fill the 2x2 grid. */
  images: string[];
  title: string;
  className?: string;
}

/** Photo gallery at the top of the property details page: one large image
 *  plus a 2x2 thumbnail grid (thumbnails reflow to a row on small screens).
 *  On desktop the row stretches so the grid matches the large image's height. */
export function PropertyGallery({
  images,
  title,
  className,
}: PropertyGalleryProps) {
  const [primary, ...thumbnails] = images;

  return (
    <div className={cn("flex flex-col gap-4 lg:flex-row lg:gap-6", className)}>
      <div className="min-w-0 flex-1 overflow-hidden rounded-xl">
        <img
          src={primary}
          alt={title}
          className="aspect-519/324 w-full object-cover lg:h-full"
        />
      </div>
      <div className="grid shrink-0 grid-cols-2 gap-4 sm:grid-cols-4 lg:w-86 lg:grid-cols-2 lg:grid-rows-2">
        {thumbnails.slice(0, 4).map((src, i) => (
          <div key={src} className="overflow-hidden rounded-xl">
            <img
              src={src}
              alt={`${title} photo ${i + 2}`}
              loading="lazy"
              className="aspect-164/150 size-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
