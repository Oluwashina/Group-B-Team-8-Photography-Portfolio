function BookmarkIcon({ filled }) {
  if (filled) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M6.32 2.577A2.25 2.25 0 0 1 8.25 1.5h7.5A2.25 2.25 0 0 1 18 3.75v16.028a.75.75 0 0 1-1.177.614L12 17.682l-4.823 3.71A.75.75 0 0 1 6 20.778V3.75a.75.75 0 0 1 .32-.614Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
      />
    </svg>
  );
}

export default function FavoriteToggle({ isSaved, onChange, itemLabel }) {
  const label = itemLabel || "photo";

  return (
    <button
      type="button"
      aria-pressed={isSaved}
      aria-label={
        isSaved
          ? `Remove ${label} from favorites`
          : `Save ${label} to favorites`
      }
      onClick={(event) => {
        event.preventDefault();
        onChange(!isSaved);
      }}
      className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
        isSaved
          ? "border-[#c8b08a]/60 bg-[#0a0908]/80 text-[#ddc9a8] opacity-100 shadow-md"
          : "border-white/15 bg-black/45 text-stone-100 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 hover:border-[#c8b08a]/40 hover:bg-black/65 hover:text-[#ddc9a8]"
      }`}
    >
      <BookmarkIcon filled={isSaved} />
    </button>
  );
}
