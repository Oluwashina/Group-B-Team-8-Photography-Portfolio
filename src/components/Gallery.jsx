import { useMemo, useState } from "react";
import { galleryCategories, galleryItems } from "../data/galleryItems";
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

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;
      return categoryMatch && matchesSearch(item, searchQuery);
    });
  }, [activeCategory, searchQuery]);

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
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-stone-400">
          No photos match your search. Try another word or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 auto-rows-[0.5rem] grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
