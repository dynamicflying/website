import { Disciplines } from './types';

import * as fs from 'fs';
import * as path from 'path';
import YAML from 'yaml';

export function parseDisciplines(): Disciplines {
  return YAML.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/disciplines.yml'), 'utf8')
  );
}
