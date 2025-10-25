import Spline from '@splinetool/react-spline';
import SearchBar from './SearchBar';

export default function Hero({ query, setQuery, inputRef }) {
  return (
    <section className="relative w-full" aria-label="Hero">
      <div className="relative h-[64vh] md:h-[72vh] w-full overflow-hidden">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-white dark:to-neutral-950" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="w-full max-w-3xl text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.35)]">
              Koogle
            </h1>
            <p className="mx-auto max-w-2xl text-white/90 text-sm md:text-base">
              Explore the cosmos of information. A minimal, fast, and aesthetic search experience.
            </p>
            <div className="pointer-events-auto">
              <SearchBar query={query} setQuery={setQuery} inputRef={inputRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
