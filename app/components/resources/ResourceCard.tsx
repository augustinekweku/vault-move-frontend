import type { ResourceArticle } from "~/types";

/** Article card for the Resources page: image, category label, title and
 *  date/read-time meta. Flow-based spacing follows the Figma card rhythm
 *  (240px image → 32px → label → 16px → title → 2px → meta). */
export function ResourceCard({ article }: { article: ResourceArticle }) {
  return (
    <article>
      <img
        src={article.image}
        alt={article.title}
        className="aspect-[447/240] w-full rounded-lg object-cover"
      />
      <p className="mt-8 text-xs leading-4 tracking-[0.2px] text-brand-navy/54">
        {article.category}
      </p>
      <h3 className="mt-4 text-2xl leading-9 font-semibold">
        {article.title}
      </h3>
      <p className="mt-0.5 text-xs leading-4 tracking-[0.2px] text-brand-navy/54">
        {article.date} • {article.readTime}
      </p>
    </article>
  );
}
