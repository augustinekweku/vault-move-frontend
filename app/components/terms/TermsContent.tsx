import { TERMS_SECTIONS } from "~/data/terms";

export function TermsContent() {
  return (
    <div className="mx-auto w-full max-w-[976px] px-5 py-16 sm:px-8 lg:py-20">
      <h2 className="text-2xl font-bold text-brand-dark">
        Terms & Conditions
        {/* Short rounded brand bar, per Figma (Rectangle 896) */}
        <span aria-hidden className="mt-1 block h-1 w-8 rounded-full bg-brand" />
      </h2>

      <div className="mt-6 space-y-8">
        {TERMS_SECTIONS.map((section, i) => (
          <section key={section.heading ?? i}>
            {section.heading && (
              <h3 className="font-semibold text-brand-dark">
                {section.heading}
              </h3>
            )}
            <div className="mt-3 space-y-4 text-[15px] leading-7 text-ink/70">
              {section.paragraphs.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
