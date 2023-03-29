import { useLayoutEffect, useState } from 'react';
import { Member } from './types';

/**
 * Ensures that the given value is of type `T` and not `T[]` (or [][], [][][], ... depending of depth)
 */
export function ensureSingle<T, D extends number>(
  value: T | T[],
  depth?: D
): FlatArray<T, D>[][0] {
  return ([value].flat(depth) as FlatArray<T[], D>)[0];
}

/** Gets a human-readable version of the member role */
export function getDisplayMemberRole(member: Member): string | undefined {
  const map: Record<Member['role'], string> = {
    'deputy-chair': 'Deputy Chair',
    chair: 'Chair',
  };

  return map[member.role];
}

/** Returns the uppercase and lowercase versions of a string */
export function getCaseInsensitive(str: string): [string, string] {
  return [str.toUpperCase(), str.toLowerCase()];
}

/** Returns whether the provided url is absolute */
export function isAbsoluteURL(url: string): boolean {
  return new RegExp('^(?:[a-z+]+:)?//', 'i').test(url);
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
