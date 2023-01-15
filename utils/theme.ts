import type { Config } from 'tailwindcss';

export const customColors: Config['theme']['extend']['colors'] &
  Record<string, string> = require('../tailwind.config.js').theme.extend.colors;
