export default function ShopPageLayout({ children, narrow = false }) {
  return (
    <main
      id="main-content"
      className={`mx-auto px-4 pb-16 pt-28 sm:px-6 sm:pt-32 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}
    >
      {children}
    </main>
  );
}
