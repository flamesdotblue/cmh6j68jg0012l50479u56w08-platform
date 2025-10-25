import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
  const next = () => {
    const order = ['system', 'light', 'dark'];
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  };

  const label = theme === 'system' ? 'System' : theme === 'light' ? 'Light' : 'Dark';

  return (
    <button
      onClick={next}
      aria-label={`Toggle theme (current: ${label})`}
      className="inline-flex items-center gap-2 rounded-xl border border-neutral-200/70 bg-white/70 px-3 py-1.5 text-sm text-neutral-700 shadow-sm backdrop-blur hover:bg-white transition dark:border-white/10 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/15"
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4" />
      ) : theme === 'light' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <>
          <Sun className="h-4 w-4" />
          <Moon className="-ml-1 h-4 w-4 opacity-70" />
        </>
      )}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
