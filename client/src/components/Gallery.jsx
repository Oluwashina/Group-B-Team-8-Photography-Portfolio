import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchGalleryItems } from "../api/gallery";
import { gallerySection } from "../data/siteContent";
import GalleryCard from "./GalleryCard";
import SearchInput from "./SearchInput";
import SectionHeader from "./SectionHeader";

function matchesSearch(item, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  const haystack = [
    item.category,
    item.captionLabel,
    item.captionText,
    item.alt,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(normalized);
}

function categoriesFromItems(items) {
  return ["All", ...new Set(items.map((item) => item.category))];
}

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadState, setLoadState] = useState("loading");
  const [loadError, setLoadError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState({});

  const loadGallery = useCallback(async () => {
    setLoadState("loading");
    setLoadError("");
    try {
      const items = await fetchGalleryItems();
      setGalleryItems(items);
      setLoadState("ready");
    } catch (err) {
      setGalleryItems([]);
      setLoadState("error");
      setLoadError(
        err instanceof Error ? err.message : "Could not load gallery",
      );
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const items = await fetchGalleryItems();
        if (cancelled) return;
        setGalleryItems(items);
        setLoadState("ready");
      } catch (err) {
        if (cancelled) return;
        setGalleryItems([]);
        setLoadState("error");
        setLoadError(
          err instanceof Error ? err.message : "Could not load gallery",
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const galleryCategories = useMemo(
    () => categoriesFromItems(galleryItems),
    [galleryItems],
  );

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;
      return categoryMatch && matchesSearch(item, searchQuery);
    });
  }, [activeCategory, searchQuery, galleryItems]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="gallery"
      className="scroll-mt-24 py-16 md:py-20"
      aria-labelledby="gallery-heading"
    >
      <SectionHeader
        eyebrow={gallerySection.eyebrow}
        title={gallerySection.title}
        lede={gallerySection.lede}
        titleId="gallery-heading"
      />

      <div className="mb-8 flex flex-col items-center gap-6">
        <SearchInput
          id="gallery-search"
          label="Search gallery"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by place, mood, or keyword…"
        />

        {loadState === "ready" && (
          <div
            className="flex flex-wrap justify-center gap-2"
            role="group"
            aria-label="Filter gallery by category"
          >
            {galleryCategories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                    isActive
                      ? "bg-[#ddc9a8] text-[#0a0908]"
                      : "border border-white/15 bg-black/30 text-stone-300 hover:border-[#c8b08a]/50 hover:text-stone-100"
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {loadState === "loading" && (
        <p className="text-center text-stone-400" role="status">
          Loading gallery…
        </p>
      )}

      {loadState === "error" && (
        <div className="mx-auto max-w-md text-center">
          <p className="text-stone-300" role="alert">
            We could not load the gallery. {loadError}
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Make sure the API is running (
            <code className="text-stone-400">npm run dev:server</code>
            ).
          </p>
          <button
            type="button"
            onClick={loadGallery}
            className="mt-4 rounded-full border border-[#c8b08a]/50 bg-black/30 px-5 py-2 text-sm font-medium text-stone-100 transition hover:border-[#ddc9a8] hover:bg-white/5"
          >
            Try again
          </button>
        </div>
      )}

      {loadState === "ready" && filteredItems.length === 0 && (
        <p className="text-center text-stone-400">
          No photos match your search. Try another word or category.
        </p>
      )}

      {loadState === "ready" && filteredItems.length > 0 && (
        <div className="grid grid-cols-1 auto-rows-[0.5rem] grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              isSaved={Boolean(favorites[item.id])}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
