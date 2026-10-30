import { footerContent } from "../data/siteContent";

export default function Footer({ className = "" }) {
  return (
    <footer
      className={`border-t border-line bg-sand px-4 py-8 text-center text-sm font-light text-muted ${className}`}
    >
      <p className="m-0">
        <small>
          &copy; {footerContent.year} {footerContent.text}
        </small>
      </p>
    </footer>
  );
}
