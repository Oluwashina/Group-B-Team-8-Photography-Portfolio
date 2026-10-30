import Footer from "./Footer.jsx";
import ShopPageAside from "./ShopPageAside.jsx";

export default function ShopPageLayout({ children, narrow = false }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main
        id="main-content"
        className={`mx-auto flex w-full flex-1 flex-col px-4 pb-6 pt-28 sm:px-6 sm:pt-32 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}
      >
        {children}
      </main>
      <ShopPageAside />
      <Footer className="mt-0 shrink-0" />
    </div>
  );
}
