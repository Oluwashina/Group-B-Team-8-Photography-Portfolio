import { aboutSection } from "../data/siteContent";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-16 md:py-24"
      aria-labelledby="about-heading"
    >
      <div className="flex flex-col gap-8 rounded-3xl border border-line bg-surface p-8 shadow-sm shadow-stone-900/5 md:flex-row md:p-12">
        <SectionHeader
          eyebrow={aboutSection.eyebrow}
          title={aboutSection.title}
          titleId="about-heading"
          align="left"
        />
        <div className="max-w-xl flex-1 md:pt-10">
          <p className="m-0 font-serif text-2xl leading-snug text-ink sm:text-3xl">
            {aboutSection.lead}
          </p>
          <p className="mt-5 m-0 font-light leading-relaxed text-muted">
            {aboutSection.body}
          </p>
        </div>
      </div>
    </section>
  );
}
