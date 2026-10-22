import { aboutSection } from "../data/siteContent";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-16 md:py-20"
      aria-labelledby="about-heading"
    >
      <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-linear-to-br from-[#161412] to-[#110f0d] p-6 md:flex-row md:p-10">
        <SectionHeader
          eyebrow={aboutSection.eyebrow}
          title={aboutSection.title}
          titleId="about-heading"
          align="left"
        />
        <div className="max-w-xl flex-1 md:pt-8">
          <p className="m-0 font-serif text-xl leading-snug text-stone-100 sm:text-2xl">
            {aboutSection.lead}
          </p>
          <p className="mt-4 m-0 font-light text-stone-400">{aboutSection.body}</p>
        </div>
      </div>
    </section>
  );
}
