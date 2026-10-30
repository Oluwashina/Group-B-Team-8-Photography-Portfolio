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
        className="mb-2 block text-center text-xs font-medium uppercase tracking-wider text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-line bg-surface px-5 py-3 text-sm text-ink shadow-sm shadow-stone-900/5 placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
