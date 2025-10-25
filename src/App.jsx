import { useEffect, useMemo, useRef, useState } from 'react';
import Hero from './components/Hero';
import Results from './components/Results';
import ThemeToggle from './components/ThemeToggle';
import data from './data/searchData';

function scoreItem(item, q) {
  const query = q.trim().toLowerCase();
  if (!query) return 0;
  let score = 0;
  const title = item.title.toLowerCase();
  const snippet = item.snippet.toLowerCase();
  const url = item.url.toLowerCase();
  const tags = (item.tags || []).join(' ').toLowerCase();

  if (title === query) score += 30;
  if (title.includes(query)) score += 20;
  if (snippet.includes(query)) score += 10;
  if (url.includes(query)) score += 8;
  if (tags.includes(query)) score += 6;

  const qParts = query.split(/\s+/);
  qParts.forEach((p) => {
    if (!p) return;
    if (title.includes(p)) score += 3;
    if (snippet.includes(p)) score += 2;
    if (tags.includes(p)) score += 1;
  });

  return score;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('system');
  const inputRef = useRef(null);

  // Initialize theme from localStorage or system
  useEffect(() => {
    const stored = localStorage.getItem('koogle-theme') || 'system';
    setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveDark = theme === 'dark' || (theme === 'system' && systemDark);

    if (effectiveDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('koogle-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const withScore = data
      .map((item) => ({ ...item, _score: scoreItem(item, query) }))
      .filter((i) => i._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 12);
    return withScore;
  }, [query]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/30 border-b border-neutral-200/60 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-400 shadow-lg shadow-fuchsia-500/30" />
            <span className="text-lg font-semibold tracking-tight">Koogle</span>
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </header>

      <main className="pt-16">
        <Hero query={query} setQuery={setQuery} inputRef={inputRef} />

        <section className="mx-auto max-w-5xl px-4 pb-20 -mt-20">
          <div className="rounded-2xl border border-neutral-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-lg shadow-xl">
            <Results query={query} results={results} />
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200/70 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600 dark:text-neutral-400 flex flex-wrap items-center justify-between gap-3">
          <p>Made with cosmic vibes. Type / to focus search.</p>
          <p className="opacity-80">Day/Night is remembered on this device.</p>
        </div>
      </footer>
    </div>
  );
}
