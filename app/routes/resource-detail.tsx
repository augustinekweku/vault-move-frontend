import type { Route } from "./+types/resource-detail";
import { RESOURCE_ARTICLES } from "~/data/resources";
import { ArticleDetail } from "~/components/resources/ArticleDetail";
import { ReadMoreSection } from "~/components/resources/ReadMoreSection";
import { WaitlistSection } from "~/components/common/WaitlistSection";

export function meta({ loaderData }: Route.MetaArgs) {
  const title = loaderData?.article.title ?? "Resources";
  return [
    { title: `${title} — Vault Move Africa` },
    {
      name: "description",
      content: `${title} — insights from Vault Move Africa.`,
    },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const article = RESOURCE_ARTICLES.find((a) => a.id === params.articleId);
  if (!article) throw new Response(null, { status: 404 });

  const readMore = RESOURCE_ARTICLES.filter((a) => a.id !== article.id).slice(
    0,
    2,
  );
  return { article, readMore };
}

export default function ResourceDetail({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <ArticleDetail article={loaderData.article} />
      <ReadMoreSection articles={loaderData.readMore} />
      <WaitlistSection />
    </>
  );
}
