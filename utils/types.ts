export type Disciplines = Record<'D2W' | 'D4W' | 'SS', Discipline>;

export interface Discipline {
  name: string;
  patterns: Patterns;
}

export interface Patterns {
  entrances: Record<string, Pattern>;
  snakes: Record<string, Pattern>;
  verticals: Record<string, Pattern>;
  mixers: Record<string, Pattern>;
  exits: Record<string, Pattern>;
}

export interface Pattern {
  name: string;
  description: string;
  video: string;
}
