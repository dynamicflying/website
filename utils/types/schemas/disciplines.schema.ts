/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Disciplines = Discipline[];

export interface Discipline {
  /**
   * The id of the discipline
   */
  id: string;
  /**
   * The name of the discipline
   */
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
/**
 * Info about the rules of the discipline
 */
export interface Rule {
  /**
   * The date that the file was last updated
   */
  date: string;
  /**
   * A path relative to the public folder (like files/rules/abc.pdf)
   */
  file: string;
}
/**
 * Info about the pattern types of the discipline (like snakes, verticals, ...)
 */
export interface PatternType {
  /**
   * The name of the pattern type
   */
  name: string;
  /**
   * The icon associated with the pattern type. By default, the first letter of the name will be used.
   */
  icon?: string | null;
  /**
   * @minItems 1
   */
  patterns: [Pattern, ...Pattern[]];
}
/**
 * Info about the actual pattern, move, or transition
 */
export interface Pattern {
  /**
   * The official id of the pattern (like S-1). Transitions don't have an official ID: use something like T0, T1, ...
   */
  id: string;
  /**
   * The name of the pattern, move, or transition
   */
  name: string;
  /**
   * Either a string, or an array of sections to be rendered as a table.
   */
  description:
    | string
    | [
        {
          /**
           * The title of the section
           */
          title: string;
          /**
           * The text of the section
           */
          text: string;
        },
        ...{
          /**
           * The title of the section
           */
          title: string;
          /**
           * The text of the section
           */
          text: string;
        }[]
      ];
  /**
   * Whether this is a transition
   */
  transition?: boolean;
  /**
   * A list of videos associated with the pattern
   *
   * @minItems 1
   */
  videos?: [Video, ...Video[]];
}
export interface Video {
  /**
   * An external URL (usually to YouTube). Supported medias are listed here: https://github.com/CookPete/react-player#supported-media
   */
  url: string;
  /**
   * If there are multiple ways of performing a pattern, specify which one this video is about (e.g. "From HU Snakes")
   */
  variant?: string;
  /**
   * If the video is outdated, specify the date since when it is outdated.
   */
  outdated_since?: string;
}
