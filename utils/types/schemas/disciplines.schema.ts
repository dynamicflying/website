/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Disciplines = Discipline[];

export interface Discipline {
  id: string;
  name: string;
  /**
   * @minItems 1
   */
  rules: [Rule, ...Rule[]];
  /**
   * @minItems 1
   */
  pattern_types: [PatternType, ...PatternType[]];
}
export interface Rule {
  date: string;
  file: string;
}
export interface PatternType {
  name: string;
  icon?: string | null;
  /**
   * @minItems 1
   */
  patterns: [Pattern, ...Pattern[]];
}
export interface Pattern {
  id: string;
  name: string;
  description: string;
  transition?: boolean;
  /**
   * @minItems 1
   */
  videos?: [Video, ...Video[]];
}
export interface Video {
  url: string;
  variant?: string;
  outdated_since?: string;
}
