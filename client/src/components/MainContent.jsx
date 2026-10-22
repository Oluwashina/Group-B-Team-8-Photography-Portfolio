import About from "./About";
import Contact from "./Contact";
import Gallery from "./Gallery";

export default function MainContent() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 sm:px-6">
      <Gallery />
      <About />
      <Contact />
    </main>
  );
}
