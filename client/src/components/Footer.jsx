import { footerContent } from "../data/siteContent";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-white/10 bg-[#110f0d] px-4 py-8 text-center text-sm font-light text-stone-500">
      <p className="m-0">
        <small>
          &copy; {footerContent.year} {footerContent.text}
        </small>
      </p>
    </footer>
  );
}
