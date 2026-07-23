import { Container } from "~/components/ui/Container";
import { ResourceCard } from "~/components/resources/ResourceCard";
import type { ResourceArticle } from "~/types";

/** "Read More" related-articles strip at the foot of the detail page —
 *  same 2-col card grid as the Resources listing. */
export function ReadMoreSection({ articles }: { articles: ResourceArticle[] }) {
  if (articles.length === 0) return null;

  return (
    <Container className="mt-16 pb-16 lg:mt-20 lg:pb-20">
      <section className="mx-auto max-w-[984px]">
        <h2 className="text-2xl font-semibold">Read More</h2>
        <div className="mt-8 grid gap-20 sm:grid-cols-2 lg:mt-10">
          {articles.map((article) => (
            <ResourceCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </Container>
  );
}
