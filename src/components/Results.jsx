import { ExternalLink, Rocket } from 'lucide-react';

function highlight(text, query) {
  if (!query) return text;
  const q = query.trim();
  if (!q) return text;
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="rounded bg-amber-200/70 px-0.5 py-0 dark:bg-amber-400/30">{part}</mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Results({ query, results }) {
  if (!query.trim()) {
    return (
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
          <Rocket className="h-5 w-5 text-fuchsia-500" />
          <p>Start typing to search curated cosmic knowledge.</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="p-8 md:p-10">
        <p className="text-neutral-700 dark:text-neutral-300">No results for "{query}". Try different keywords.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-200/70 dark:divide-white/10">
      {results.map((item) => (
        <article key={item.url} className="p-6 md:p-8 hover:bg-neutral-50/70 dark:hover:bg-white/5 transition">
          <a href={item.url} target="_blank" rel="noreferrer" className="group block">
            <h3 className="text-xl font-semibold text-blue-700 group-hover:underline dark:text-sky-400">
              {highlight(item.title, query)}
            </h3>
            <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400/90">{item.url}</p>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              {highlight(item.snippet, query)}
            </p>
            {item.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span key={t} className="text-[11px] rounded-full border border-neutral-300/70 bg-neutral-100/60 px-2 py-0.5 text-neutral-700 dark:border-white/15 dark:bg-white/5 dark:text-neutral-200">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-3 inline-flex items-center gap-1 text-sm text-blue-700 dark:text-sky-400">
              <span>Open</span>
              <ExternalLink className="h-4 w-4" />
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}
