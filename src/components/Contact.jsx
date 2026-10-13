import { contactSection } from "../data/siteContent";
import SectionHeader from "./SectionHeader";

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-16 md:py-20"
      aria-labelledby="contact-heading"
    >
      <SectionHeader
        eyebrow={contactSection.eyebrow}
        title={contactSection.title}
        lede={contactSection.lede}
        titleId="contact-heading"
      />
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#161412] p-6 shadow-xl shadow-black/30 sm:p-8">
        <p className="m-0 mb-6 font-light text-stone-400">{contactSection.intro}</p>
        <form
          action={`mailto:${contactSection.email}`}
          method="post"
          encType="text/plain"
          className="space-y-5"
        >
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full rounded-md border border-white/10 bg-[#0a0908] px-3 py-2.5 text-stone-100 focus:border-[#c8b08a]/50 focus:outline-none focus:ring-2 focus:ring-[#c8b08a]/20"
              />
            </div>
            <div className="min-w-0 flex-1">
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border border-white/10 bg-[#0a0908] px-3 py-2.5 text-stone-100 focus:border-[#c8b08a]/50 focus:outline-none focus:ring-2 focus:ring-[#c8b08a]/20"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="min-h-36 w-full resize-y rounded-md border border-white/10 bg-[#0a0908] px-3 py-2.5 text-stone-100 focus:border-[#c8b08a]/50 focus:outline-none focus:ring-2 focus:ring-[#c8b08a]/20"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-[#ddc9a8] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0a0908] transition hover:bg-[#ebe3d4] sm:w-auto"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
