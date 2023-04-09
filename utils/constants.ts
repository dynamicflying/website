/** The default discipline to show in the videos page */
export const DEFAULT_DISCIPLINE = 'D2W';

export const EMAIL = 'isc-dynamic@fai.org';

export const LINKS = {
  brackets_archive:
    'https://docs.google.com/spreadsheets/d/17sChW39F3AmgYnHcqQkNYwE0mz73zr2U9WZt0rqkylM/',
  current_official_rules:
    'https://www.fai.org/sites/default/files/isc/documents/2022/2022-dynamic_cr.pdf', // TODO: replace with the local version
  draw_generator: 'https://dynamicflying.com/generator/index.html', // TODO: replace with the local version
  email: `mailto:${EMAIL}`,
  facebook: 'https://www.facebook.com/DynamicFlyingDF',
  isc_fai: 'https://www.fai.org/commission/isc',
  non_official_rules: 'https://dynamicflying.com/content/2023-Solo-Speed.pdf', // TODO: replace with the local version
  official_brackets:
    'https://docs.google.com/spreadsheets/d/1igIXiztlDwjdk-e53Ko0GZyyvrvjG1HunIQ3iWbrM2w',
  rule_changes:
    'https://dynamicflying.com/content/DY-Committee-2022-Rules-Synthesis.pdf',
} as const;
