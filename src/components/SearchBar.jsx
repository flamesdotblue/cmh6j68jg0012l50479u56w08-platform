import { useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ query, setQuery, inputRef }) {
  useEffect(() => {
    if (!inputRef.current) return;
    // Keep value in sync if props change
    inputRef.current.value = query;
  }, [query, inputRef]);

  return (
    <div className="w-full">
      <div className="group relative mx-auto flex w-full items-center rounded-2xl border border-white/20 bg-white/70 backdrop-blur-lg pr-2 pl-3 py-2 shadow-2xl ring-1 ring-black/5 transition dark:border-white/10 dark:bg-white/10">
        <Search className="h-5 w-5 text-neutral-600/80 dark:text-neutral-200/80" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search the galaxy..."
          className="ml-2 w-full bg-transparent placeholder-neutral-500/80 focus:outline-none text-neutral-900 dark:text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            aria-label="Clear query"
            onClick={() => setQuery('')}
            className="rounded-lg p-1 text-neutral-600/70 hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-neutral-200/70 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <kbd className="ml-2 hidden md:inline rounded-md border border-neutral-300 bg-white px-1.5 py-0.5 text-[10px] text-neutral-600 shadow-sm dark:border-white/20 dark:bg-white/10 dark:text-neutral-200">/
        </kbd>
      </div>
    </div>
  );
}
