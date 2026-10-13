export default function Rating({ value, onChange, labelId }) {
  return (
    <div
      className="mt-3 flex items-center gap-1"
      role="group"
      aria-labelledby={labelId}
    >
      <span id={labelId} className="sr-only">
        Rate this photo from 1 to 5
      </span>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;
        return (
          <button
            key={star}
            type="button"
            className={`rounded p-0.5 text-lg leading-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
              filled ? "text-[#ddc9a8]" : "text-stone-600 hover:text-stone-400"
            }`}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            aria-pressed={filled}
            onClick={() => onChange(star === value ? 0 : star)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
