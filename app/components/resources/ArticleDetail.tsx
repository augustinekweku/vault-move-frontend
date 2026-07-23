import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import type { ResourceArticle } from "~/types";

/** Article detail body: breadcrumbs (Home › Resources), category/title/meta
 *  header, hero image and body paragraphs, in the Figma's ~984px column.
 *  No blue PageHero on this page — the header sits on white. */
export function ArticleDetail({ article }: { article: ResourceArticle }) {
  return (
    <>
      <Container className="py-4">
        <nav className="flex items-center gap-2 text-sm text-ink/70">
          <Link to="/" className="hover:text-brand">
            Home
          </Link>
          <span>›</span>
          <Link to="/resources" className="hover:text-brand">
            Resources
          </Link>
        </nav>
      </Container>

      <Container>
        <article className="mx-auto max-w-[984px]">
          <header className="mt-8 flex flex-col gap-2.25 lg:mt-12">
            <p className="text-xs leading-4 tracking-[0.2px] text-brand-navy/54">
              {article.category}
            </p>
            <h1 className="text-3xl leading-[1.2] font-semibold sm:text-4xl lg:text-5xl lg:leading-[1.5]">
              {article.title}
            </h1>
            <p className="text-xs leading-4 tracking-[0.2px] text-brand-navy/54">
              {article.date} • {article.readTime}
            </p>
          </header>

          <img
            src={article.image}
            alt={article.title}
            className="mt-10 aspect-[987/422] w-full rounded-lg object-cover"
          />

          <div className="mt-10 space-y-6 text-lg leading-7 font-light tracking-[0.2px] text-muted-500">
            {article.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>
      </Container>
    </>
  );
}
