export default function SearchInput({
  id,
  label,
  value,
  onChange,
  placeholder = "Search photos…",
}) {
  return (
    <div className="w-full max-w-md">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500"
      >
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/15 bg-[#0a0908]/80 px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-[#c8b08a]/50 focus:outline-none focus:ring-2 focus:ring-[#c8b08a]/20"
      />
    </div>
  );
}
