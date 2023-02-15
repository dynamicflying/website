export type Disciplines = Discipline[];

export interface Discipline {
  id: string;
  name: string;
  rules: Rules[];
  pattern_types: PatternType[];
}

export interface Rules {
  date: string;
  file: string;
}

export interface PatternType {
  name: string;
  icon: string;
  patterns: Pattern[];
}

export interface Pattern {
  id: string;
  name: string;
  description: string;
  videos: Video[];
}

export interface Video {
  url: string;
  variant?: string | null;
  outdated_since?: string | null;
}
