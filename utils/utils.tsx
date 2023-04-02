import { useLayoutEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

/**
 * Ensures that the given value is of type `T` and not `T[]` (or [][], [][][], ... depending of depth)
 */
export function ensureSingle<T, D extends number>(
  value: T | T[],
  depth?: D
): FlatArray<T, D>[][0] {
  return ([value].flat(depth) as FlatArray<T[], D>)[0];
}

/** Returns the uppercase and lowercase versions of a string */
export function getCaseInsensitive(str: string): [string, string] {
  return [str.toUpperCase(), str.toLowerCase()];
}

/** Renders a markdown string */
export function Markdown({ md }: { md: string }) {
  return (
    <div
      className="markdown shadow-underline-slate-800"
      dangerouslySetInnerHTML={{
        __html: remark().use(html).use(gfm).processSync(md).toString(),
      }}
    />
  );
}

/** Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffleArray<T>(array: T[]) {
  const res = [...array];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
