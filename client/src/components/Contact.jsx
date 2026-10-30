import { contactSection } from "../data/siteContent";
import SectionHeader from "./SectionHeader";

const fieldClass =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink placeholder:text-muted/70 focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-muted";

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-16 md:py-24"
      aria-labelledby="contact-heading"
    >
      <SectionHeader
        eyebrow={contactSection.eyebrow}
        title={contactSection.title}
        lede={contactSection.lede}
        titleId="contact-heading"
      />
      <div className="mx-auto max-w-xl rounded-3xl border border-line bg-surface p-6 shadow-xl shadow-stone-900/5 sm:p-10">
        <p className="m-0 mb-6 font-light leading-relaxed text-muted">
          {contactSection.intro}
        </p>
        <form
          action={`mailto:${contactSection.email}`}
          method="post"
          encType="text/plain"
          className="space-y-5"
        >
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="min-w-0 flex-1">
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={fieldClass}
              />
            </div>
            <div className="min-w-0 flex-1">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={fieldClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className={labelClass}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className={`min-h-36 resize-y ${fieldClass}`}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-accent-strong sm:w-auto"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
