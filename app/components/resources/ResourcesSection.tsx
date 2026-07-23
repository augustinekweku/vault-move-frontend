import { Fragment } from "react";
import { Container } from "~/components/ui/Container";
import { RESOURCE_SECTIONS } from "~/data/resources";
import { ResourceCard } from "~/components/resources/ResourceCard";

/** Article groups (2-col grid, 80px gaps) separated by full-width dividers,
 *  in the 974px content column from the Figma frame. */
export function ResourcesSection() {
  return (
    <Container className="py-16 lg:py-20">
      <div className="mx-auto flex max-w-243.5 flex-col gap-13.75">
        {RESOURCE_SECTIONS.map((section, i) => (
          <Fragment key={section.id}>
            {i > 0 && <div aria-hidden className="border-t border-muted-400" />}
            <div id={section.id} className="grid gap-20 sm:grid-cols-2">
              {section.articles.map((article) => (
                <ResourceCard key={article.id} article={article} />
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </Container>
  );
}
